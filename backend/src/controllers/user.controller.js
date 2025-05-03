const asyncHandler = require("../utils/asyncHandler.js");
const ApiError = require("../utils/ApiError.js");
const Admin = require("../models/admin.model.js");
const Teacher = require("../models/teacher.models.js");
const Student = require("../models/student.models.js");
const ApiResponse = require("../utils/ApiResponse.js");
const { generateAdminTokens } = require('../utils/adminToken.js');
const { generateTeacherTokens } = require('../utils/teacherToken.js');
const { generateStudentTokens } = require('../utils/studentToken.js');

// It for register user
const registerUser = asyncHandler(async (req, res) => {
    
    res.status(200).json({
        message: "Good",
        
    });
});

// It for register admin
const registerAdmin = asyncHandler(async (req, res) => {
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
    const exitsUser = await Admin.findOne({
        $or : [ {username} , {email}]
    })
    if(exitsUser){
        throw new ApiError(409, "User with email or username already exists");
    }

    // create user object - create entry in db

    const admin = await Admin.create({
        username : username.toLowerCase(),
        Firstname,
        Lastname,
        email,
        password,
        mobilePhone,
        officePhone,
        address,
        bioNotes,
    });

    const createAdmin = await Admin.findById(admin._id).select("-password -refreshToken")

    if(!createAdmin){
        throw new ApiError(500,"Somthing went wrong while creating teacher account");
    }

    return res.status(201).json(
        new ApiResponse(200, createAdmin, "Admin register successfully")
    )
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

    // console.log("login user", req.body);

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

    // console.log("Model", Model);

    const user = await Model.findOne({
        $or: [{ username }, { email }]
    }).select("+password");

    if (!user) {
        throw new ApiError(404, "User does not exist");
    }

    // const isPasswordValid = await user.isPasswordCorrect(password);

    const isPasswordValid = await user.isPasswordCorrect(password);

    // console.log("isPasswordValid", isPasswordValid);
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials");
    }

    // const { accessToken, refreshToken } = await generateTokens(Model, user._id);

    let tokens;
    console.log("user Id" , user._id);
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
                { user: loggedInUser, accessToken: tokens.accessToken, refreshToken: tokens.refreshToken , userId: user._id },
                "User logged In Successfully"
            )
        );
});

// It for logout user
const logoutUser = asyncHandler(async (req, res) => {
    const { role } = req.body;

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


// It for refresh access token 
const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized request");
    }

    try {
        // Verify the refresh token
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );

        let Model;
        let generateTokens;
        
        if (decodedToken.role === 'admin') {
            Model = Admin;
            generateTokens = generateAdminTokens;
        } else if (decodedToken.role === 'teacher') {
            Model = Teacher;
            generateTokens = generateTeacherTokens;
        } else if (decodedToken.role === 'student') {
            Model = Student;
            generateTokens = generateStudentTokens;
        } else {
            throw new ApiError(401, "Invalid user role");
        }

        const user = await Model.findById(decodedToken?._id);

        if (!user) {
            throw new ApiError(401, "Invalid refresh token");
        }

        // Check if the refresh token matches
        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used");
        }

        // Generate new access and refresh tokens using the appropriate function
        const { accessToken, refreshToken } = await generateTokens(user._id);

        // Save the new refresh token in the user record
        user.refreshToken = refreshToken;
        await user.save();

        // Options for secure cookies
        const options = {
            httpOnly: true,
            secure: true, // only set to true in production (when using HTTPS)
        };

        // Send the new tokens as cookies in the response
        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json({
                success: true,
                accessToken,
                refreshToken,
                message: "Access token refreshed successfully"
            });
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token");
    }
});

// It for change current password
const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    // Dynamically choose the correct model based on the role
    let Model;
    if (req.user.role === 'admin') Model = Admin;
    else if (req.user.role === 'teacher') Model = Teacher;
    else if (req.user.role === 'student') Model = Student;
    else {
        throw new ApiError(400, "Invalid role");
    }

    const user = await Model.findById(req.user._id);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // Check if the old password is correct
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid old password");
    }

    // Set the new password
    user.password = newPassword;
    await user.save({ validateBeforeSave: false });

    // Return success response
    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Password changed successfully"));
});


// It for get current user
const getCurrentUser = asyncHandler(async (req, res) => {
    let Model;

    // Dynamically choose the correct model based on the role
    if (req.user.role === 'admin') {
        Model = Admin;
    } else if (req.user.role === 'teacher') {
        Model = Teacher;
    } else if (req.user.role === 'student') {
        Model = Student;
    } else {
        throw new ApiError(400, "Invalid role");
    }

    // Find the current user from the database based on their ID
    const user = await Model.findById(req.user._id).select('-password -refreshToken'); // Exclude password and refreshToken

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // Return the user data
    return res
        .status(200)
        .json(new ApiResponse(200, user, "User fetched successfully"));
});

// It for update account details
const updateAccountDetails = asyncHandler(async(req, res) => {
    const {fullName, email} = req.body

    if (!fullName || !email) {
        throw new ApiError(400, "All fields are required")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                fullName,
                email: email
            }
        },
        {new: true}
        
    ).select("-password")

    return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"))
});


module.exports = {
  registerUser,
  registerAdmin,
  registerTeacher,
  registerStudent,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails
};
