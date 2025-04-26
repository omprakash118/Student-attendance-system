const asyncHandler = require("../utils/asyncHandler.js");
const ApiError = require("../utils/ApiError.js");
const ApiResponse = require("../utils/ApiResponse.js");
const Attendance = require("../models/attendance.model.js");
const Class = require("../models/class.models.js");

const takeAttendance = asyncHandler(async (req, res) => {
  const { classId, teacherId, date, attendanceData } = req.body;

  // ✅ Validate input
  if (!classId || !teacherId || !date || !attendanceData || !Array.isArray(attendanceData)) {
    throw new ApiError(400, "All fields (classId, teacherId, date, attendanceData[]) are required");
  }

  // ✅ Optional: Prevent duplicate attendance for same class & date
//   const existing = await Attendance.findOne({ classId, date });
//   if (existing) {
//     throw new ApiError(409, "Attendance already taken for this class on this date");
//   }

  // ✅ Check if class exists
//   const classExists = await Class.findById(classId);
//   if (!classExists) {
//     throw new ApiError(404, "Class not found");
//   }  

     // ✅ Save attendance
     const newAttendance = new Attendance({
        classId,
        teacherId,
        date,
        attendanceData,
    });

    await newAttendance.save();

    return res.status(201).json(
        new ApiResponse(200, "Attendance taken successfully")
    )
});

module.exports = { takeAttendance };
