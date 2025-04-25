const asyncHandler = require("../utils/asyncHandler.js");
const ApiError = require("../utils/ApiError.js");
const Teacher = require("../models/teacher.models.js");
const Student = require("../models/student.models.js");
const ApiResponse = require("../utils/ApiResponse.js");



const registerUser = asyncHandler(async (req, res) => {
    
    res.status(200).json({
        message: "Good",
        
    });
});

const registerTeacher = asyncHandler(async (req, res) => {
    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res

    console.log(req.body);
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
    if (
        [username , Firstname , email , password , mobilePhone , subjects , address].some((field) => field?.trim() === "")
    ){
        throw new ApiError(400, "Please fill all the required fields");
    }

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
    if (
        [username , Firstname , email , password , mobilePhone , subjects , address, classAssigned].some((field) => field?.trim() === "")
    ){
        throw new ApiError(400, "Please fill all the required fields");
    }

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
        officePhone,
        subjects,
        customSubjects,
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

module.exports = {
  registerUser,
  registerTeacher,
  registerStudent,
};
