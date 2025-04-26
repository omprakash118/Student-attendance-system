const asyncHandler = require("../utils/asyncHandler.js");
const ApiError = require("../utils/ApiError.js");
const Teacher = require("../models/teacher.models.js");
const Student = require("../models/student.models.js");
const ApiResponse = require("../utils/ApiResponse.js");
const { generateAdminTokens } = require('../utils/adminTokens');
const { generateTeacherTokens } = require('../utils/teacherTokens');
const { generateStudentTokens } = require('../utils/studentTokens');

// It for register user
const registerUser = asyncHandler(async (req, res) => {
    
    res.status(200).json({
        message: "Good",
        
    });
});

// It for register teacher
const registerTeacher = asyncHandler(async (req, res) => {
    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res

    // get user details from frontend
    const {
        Firstname,
        Lastname,
        username,
        email,
        password,
        mobilePhone,
        officePhone,
        subjects,
        customSubjects,
        address,
        bioNotes,
    } = req.body;


    // validation - not empty
    // if (
    //     [username , Firstname , email , password , mobilePhone , subjects , address].some((field) => field?.trim() === "")
    // ){
    //     throw new ApiError(400, "Please fill all the required fields");
    // }

    // check if user already exists: username, email
    const exitsUser = await Teacher.findOne({
        $or : [ {username} , {email}]
    })
    if(exitsUser){
        throw new ApiError(409, "User with email or username already exists");
    }

    // create user object - create entry in db

    const teacher = await Teacher.create({
        username : username.toLowerCase(),
        Firstname,
        Lastname,
        email,
        password,
        mobilePhone,
        officePhone,
        subjects,
        customSubjects,
        address,
        bioNotes,
    });

    const createTeacher = await Teacher.findById(teacher._id).select("-password -refreshToken")

    if(!createTeacher){
        throw new ApiError(500,"Somthing went wrong while creating teacher account");
    }

    return res.status(201).json(
        new ApiResponse(200, createTeacher, "Teacher register successfully")
    )
});

// It for register student
const registerStudent = asyncHandler(async (req, res) => {
    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res


    // get user details from frontend
    const {
        username,
        Firstname,
        Lastname,
        email,
        password,
        mobilePhone,
        parentsPhone,
        classAssigned,
        address,
        bioNotes,
    } = req.body;

    
    // validation - not empty
    // if (
    //     [username , Firstname , email , password , mobilePhone , address, classAssigned].some((field) => field?.trim() === "")
    // ){
    //     throw new ApiError(400, "Please fill all the required fields");
    // }

    // check if user already exists: username, email
    const exitsUser = await Student.findOne({
        $or : [ {username} , {email}]
    })
    if(exitsUser){
        throw new ApiError(409, "User with email or username already exists");
    }

    // create user object - create entry in db

    const student = await Student.create({
        username : username.toLowerCase(),
        Firstname,
        Lastname,
        email,
        password,
        mobilePhone,
        parentsPhone,
        classAssigned,
        address,
        bioNotes,
    });

    const createStudent = await Student.findById(student._id).select("-password -refreshToken")

    if(!createStudent){
        throw new ApiError(500,"Somthing went wrong while creating student account");
    }

    return res.status(201).json(
        new ApiResponse(200, createStudent, "Student register successfully")
    )
});


// It for login user

const loginUser = asyncHandler(async (req, res) => {
    const { email, username, password, role } = req.body;

    if (!username && !email) {
        throw new ApiError(400, "username or email is required");
    }

    if (!role) {
        throw new ApiError(400, "User role is required");
    }

    let Model;

    if (role === "admin") Model = Admin;
    else if (role === "teacher") Model = Teacher;
    else if (role === "student") Model = Student;
    else throw new ApiError(400, "Invalid role provided");

    const user = await Model.findOne({
        $or: [{ username }, { email }]
    });

    if (!user) {
        throw new ApiError(404, "User does not exist");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials");
    }

    // const { accessToken, refreshToken } = await generateTokens(Model, user._id);

    let tokens;

    if (role === "admin") {
        tokens = await generateAdminTokens(user._id);
    } else if (role === "teacher") {
        tokens = await generateTeacherTokens(user._id);
    } else if (role === "student") {
        tokens = await generateStudentTokens(user._id);
    }
    

    const loggedInUser = await Model.findById(user._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: true
    };

    return res
        .status(200)
        .cookie("accessToken", tokens.accessToken, options)
        .cookie("refreshToken", tokens.refreshToken, options)
        .json(
            new ApiResponse(
                200,
                { user: loggedInUser, accessToken: tokens.accessToken, refreshToken: tokens.refreshToken },
                "User logged In Successfully"
            )
        );
});

// It for logout user
const logoutUser = asyncHandler(async (req, res) => {
    const { role } = req.user;

    let Model;
    if (role === "admin") Model = Admin;
    else if (role === "teacher") Model = Teacher;
    else if (role === "student") Model = Student;
    else throw new ApiError(400, "Invalid role provided");

    await Model.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // removes refreshToken field
            }
        },
        {
            new: true
        }
    );

    const options = {
        httpOnly: true,
        secure: true
    };

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged Out"));
});



module.exports = {
  registerUser,
  registerTeacher,
  registerStudent,
    loginUser,
    logoutUser,
};
