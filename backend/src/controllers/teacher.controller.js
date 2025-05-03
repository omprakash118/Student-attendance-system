const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const Teacher = require('../models/teacher.models');
const Classes = require('../models/class.models');

// Get all teachers
const getAllTeachers = asyncHandler(async (req, res) => {
    const teachers = await Teacher.find().select("-password -refreshToken");
    return res.status(200).json(new ApiResponse(200, teachers, "All teachers fetched successfully"));
});

// Get a single teacher by ID
const getTeacherById = asyncHandler(async (req, res) => {
    const { teacherId } = req.params;

    const teacher = await Teacher.findById(teacherId).select("-password -refreshToken");
    if (!teacher) {
        throw new ApiError(404, "Teacher not found");
    }

    // Get classes taught by this teacher
    const classes = await Classes.find({ "subjects.teacher": teacherId }).select("className subjects");

    return res.status(200).json(new ApiResponse(200, { teacher, classes }, "Teacher and classes fetched successfully"));
});

// Update Teacher
const updateTeacher = asyncHandler(async (req, res) => {
    const { teacherId } = req.params;
    const updateData = req.body;

    const updatedTeacher = await Teacher.findByIdAndUpdate(teacherId, updateData, { new: true }).select("-password -refreshToken");

    if (!updatedTeacher) {
        throw new ApiError(404, "Teacher not found or update failed");
    }

    return res.status(200).json(new ApiResponse(200, updatedTeacher, "Teacher updated successfully"));
});

// Delete Teacher
const deleteTeacher = asyncHandler(async (req, res) => {
    const { teacherId } = req.params;

    const deletedTeacher = await Teacher.findByIdAndDelete(teacherId);
    if (!deletedTeacher) {
        throw new ApiError(404, "Teacher not found");
    }

    // Remove this teacher from any class subjects
    await Classes.updateMany(
        { "subjects.teacher": teacherId },
        { $pull: { subjects: { teacher: teacherId } } }
    );

    return res.status(200).json(new ApiResponse(200, {}, "Teacher deleted and references cleaned up"));
});


module.exports = {
    getAllTeachers,
    getTeacherById,
    updateTeacher,
    deleteTeacher,
};
