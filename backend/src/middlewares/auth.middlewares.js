const ApiError = require('../utils/ApiError.js');
const asyncHandler = require("../utils/asyncHandler.js");
const jwt = require("jsonwebtoken");
const Admin = require('../models/admin.model.js');
const Teacher = require("../models/teacher.models.js");
const Student = require("../models/student.models.js");
 
const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            throw new ApiError(401, "Unauthorized request");
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        // console.log("decodedToken : ", decodedToken);
        // console.log("req.cookies : ", req.cookies);
        // console.log("req.header : ", req.header("Authorization"));
        // console.log('req.cookies.accessToken : ', decodedToken.role);
        let Model;
        if (decodedToken.role === "admin") Model = Admin;
        else if (decodedToken.role === "teacher") Model = Teacher;
        else if (decodedToken.role === "student") Model = Student;
        else throw new ApiError(401, "Invalid user role");

        const user = await Model.findById(decodedToken._id).select("-password -refreshToken");

        if (!user) {
            throw new ApiError(401, "Invalid Access Token");
        }

        req.user = {
            _id: user._id,
            role: decodedToken.role
        };

        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token");
    }
});


module.exports = verifyJWT;