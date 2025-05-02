const asyncHandler = require("../utils/asyncHandler.js");
const ApiError = require("../utils/ApiError.js");
const ApiResponse = require("../utils/ApiResponse.js");
const Attendance = require("../models/attendance.model.js");
const Class = require('../models/class.models.js');
const Teacher = require('../models/teacher.models.js');
const Student = require('../models/student.models.js');

// Controller to take attendance
const takeAttendance = asyncHandler(async (req, res) => {
  const { classId, teacherId, date, attendanceData } = req.body;

  // ✅ Validate input
  if (!classId || !teacherId || !date || !attendanceData || !Array.isArray(attendanceData)) {
    throw new ApiError(400, "All fields (classId, teacherId, date, attendanceData[]) are required");
  }

  // ✅ Optional: Prevent duplicate attendance for same class & date
  const existing = await Attendance.findOne({ classId, date });
  if (existing) {
    throw new ApiError(409, "Attendance already taken for this class on this date");
  }

  // ✅ Check if class exists
  const classExists = await Class.findById(classId);
  if (!classExists) {
    throw new ApiError(404, "Class not found");
  }

  // ✅ Check if teacher exists
  const teacherExists = await Teacher.findById(teacherId);
  if (!teacherExists) {
    throw new ApiError(404, "Teacher not found");
  }

  // ✅ Check if all students exist
  const studentIds = attendanceData.map(item => item.studentId);
  const studentsExist = await Student.find({ '_id': { $in: studentIds } });
  if (studentsExist.length !== studentIds.length) {
    throw new ApiError(404, "Some students not found");
  }

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
  );
});

// Controller to get all attendance records
const getAllClasses = asyncHandler(async (req, res) => {
  console.log("Fetching all attendance records...");
  
  const attendance = await Attendance.find()
    .populate('classId', 'className subject') // Populating class information
    .populate('teacherId', 'Firstname Lastname') // Populating teacher information
    .populate('attendanceData.studentId', 'Firstname Lastname'); // Populating student information
  
  console.log(attendance);
  return res.status(200).json(new ApiResponse(200, attendance, "Attendance fetched successfully"));
});


// Controller to get attendance by ID
const getAttendanceById = asyncHandler(async (req, res) => {
  const { attendanceId } = req.params;

  // ✅ Check if attendance exists by the provided ID
  const attendance = await Attendance.findById(attendanceId)
    .populate('classId', 'className subject') // Populating class information
    .populate('teacherId', 'Firstname Lastname') // Populating teacher information
    .populate('attendanceData.studentId', 'Firstname Lastname'); // Populating student information

  // If attendance not found
  if (!attendance) {
    throw new ApiError(404, "Attendance record not found");
  }

  return res.status(200).json(
    new ApiResponse(200, attendance, "Attendance record fetched successfully")
  );
});

const getAttendanceByClassAndDate = asyncHandler(async (req, res) => {
  const { classId, date } = req.query;

  if (!classId || !date) {
    throw new ApiError(400, "classId and date are required");
  }

  const attendance = await Attendance.findOne({
    classId,
    date: {
      $gte: new Date(date),
      $lt: new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000)
    }
  })
    .populate('classId', 'className subject')
    .populate('teacherId', 'Firstname Lastname')
    .populate('attendanceData.studentId', 'Firstname Lastname');

  if (!attendance) {
    return res.status(200).json(new ApiResponse(200, null, "No attendance found"));
  }

  return res.status(200).json(new ApiResponse(200, attendance, "Attendance found"));
});

// Exporting the controllers
module.exports = {
  takeAttendance,
  getAllClasses,
  getAttendanceById,
  getAttendanceByClassAndDate
};
