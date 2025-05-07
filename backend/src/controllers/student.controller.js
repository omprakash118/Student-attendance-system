const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const Student = require('../models/student.models');

// Get all students
const getAllStudents = asyncHandler(async (req, res) => {
    const students = await Student.find().select("-password -refreshToken");
    return res.status(200).json(new ApiResponse(200, students, "All students fetched successfully"));
});

// Get a single student by ID
const getStudentById = asyncHandler(async (req, res) => {
    const { studentId } = req.params;

    const student = await Student.findById(studentId).select("-password -refreshToken");

    if (!student) {
        throw new ApiError(404, "Student not found");
    }

    return res.status(200).json(new ApiResponse(200, student, "Student fetched successfully"));
});

// Update student
const updateStudent = asyncHandler(async (req, res) => {
    const { studentId } = req.params;
    const updateData = req.body;

    const updatedStudent = await Student.findByIdAndUpdate(studentId, updateData, { new: true }).select("-password -refreshToken");

    if (!updatedStudent) {
        throw new ApiError(404, "Student not found or update failed");
    }

    return res.status(200).json(new ApiResponse(200, updatedStudent, "Student updated successfully"));
});

// Delete student
const deleteStudent = asyncHandler(async (req, res) => {
    const { studentId } = req.params;

    const deletedStudent = await Student.findByIdAndDelete(studentId);

    if (!deletedStudent) {
        throw new ApiError(404, "Student not found");
    }

    return res.status(200).json(new ApiResponse(200, {}, "Student deleted successfully"));
});

const getUnassignedStudents = asyncHandler(async (req, res) => {
    try {
      const students = await Student.find({ classAssigned: null }); // empty string means unassigned
      res.json(students);
    } catch (error) {
        console.log("error :- ", error);
      res.status(500).json({ message: "Failed to fetch unassigned students" });
    }
});
  

module.exports = {
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent,
    getUnassignedStudents
};
