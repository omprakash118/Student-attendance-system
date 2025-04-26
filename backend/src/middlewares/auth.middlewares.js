import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { Admin } from "../models/admin.model.js";
import { Teacher } from "../models/teacher.model.js";
import { Student } from "../models/student.model.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            throw new ApiError(401, "Unauthorized request");
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

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
