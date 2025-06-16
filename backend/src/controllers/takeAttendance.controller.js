const asyncHandler = require("../utils/asyncHandler.js");
const ApiError = require("../utils/ApiError.js");
const ApiResponse = require("../utils/ApiResponse.js");
const Attendance = require("../models/attendance.model.js");

// POST /api/attendance/take-attendance
const takeAttendance = async (req, res) => {
  try {
    const { classId, teacherId, subjectId, date, attendanceData } = req.body;

    // Normalize the date to start of the day
    const normalizedDate = new Date(date);
    normalizedDate.setUTCHours(0, 0, 0, 0);
    const nextDay = new Date(normalizedDate);
    nextDay.setDate(normalizedDate.getDate() + 1);

    // Check for existing attendance
    const existingAttendance = await Attendance.findOne({
      classId,
      teacherId,
      subjectId,
      date: { $gte: normalizedDate, $lt: nextDay }
    });

    if (existingAttendance) {
      return res.status(409).json({ message: 'Attendance already exists for this date.' });
    }

    // Save new attendance
    const newAttendance = new Attendance({
      classId,
      teacherId,
      subjectId,
      date: normalizedDate,
      attendanceData
    });

    await newAttendance.save();
    return res.status(201).json({ message: 'Attendance submitted successfully.' });

  } catch (err) {
    console.error('Error taking attendance:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

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

const getAttendanceByClassSubjectTeacherDate = asyncHandler(async (req, res) => {
  const { classId, subjectId, teacherId, date } = req.query;

  if (!classId || !subjectId || !teacherId || !date) {
    throw new ApiError(400, "classId, subjectId, teacherId, and date are required");
  }

  const attendance = await Attendance.findOne({
    classId,
    teacherId,
    date: {
      $gte: new Date(date),
      $lt: new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000),
    }
  })
    .populate('classId', 'className')
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
  getAttendanceByClassSubjectTeacherDate
};


// const getAttendanceByClassAndDate = asyncHandler(async (req, res) => {
//   const { classId, date } = req.query;

//   if (!classId || !date) {
//     throw new ApiError(400, "classId and date are required");
//   }

//   const attendance = await Attendance.findOne({
//     classId,
//     date: {
//       $gte: new Date(date),
//       $lt: new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000)
//     }
//   })
//     .populate('classId', 'className subject')
//     .populate('teacherId', 'Firstname Lastname')
//     .populate('attendanceData.studentId', 'Firstname Lastname');

//   if (!attendance) {
//     return res.status(200).json(new ApiResponse(200, null, "No attendance found"));
//   }

//   return res.status(200).json(new ApiResponse(200, attendance, "Attendance found"));
// });

// const getAttendanceByClassAndDate = asyncHandler(async (req, res) => {
//   const { classId, subjectId, date } = req.query;

//   if (!classId || !subjectId || !date) {
//     throw new ApiError(400, "classId, subjectId, and date are required");
//   }

//   const attendance = await Attendance.findOne({
//     classId,
//     subjectId,
//     date: {
//       $gte: new Date(date),
//       $lt: new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000)
//     }
//   })
//     .populate('classId', 'className')
//     .populate('subjectId', 'subjectName') // You should create/populate this field
//     .populate('teacherId', 'Firstname Lastname')
//     .populate('attendanceData.studentId', 'Firstname Lastname');

//   if (!attendance) {
//     return res.status(200).json(new ApiResponse(200, null, "No attendance found"));
//   }

//   return res.status(200).json(new ApiResponse(200, attendance, "Attendance found"));
// });


// Controller to take attendance


// const takeAttendance = asyncHandler(async (req, res) => {
//   const { classId, subjectId, teacherId, date, attendanceData } = req.body;

//   if (!classId || !subjectId || !teacherId || !date || !attendanceData || !Array.isArray(attendanceData)) {
//     throw new ApiError(400, "All fields (classId, subjectId, teacherId, date, attendanceData[]) are required");
//   }

//   const existing = await Attendance.findOne({ classId, subjectId, date });
//   if (existing) {
//     throw new ApiError(409, "Attendance already taken for this class, subject, and date");
//   }

//   const classExists = await Class.findById(classId);
//   if (!classExists) throw new ApiError(404, "Class not found");

//   const teacherExists = await Teacher.findById(teacherId);
//   if (!teacherExists) throw new ApiError(404, "Teacher not found");

//   const studentIds = attendanceData.map(item => item.studentId);
//   const studentsExist = await Student.find({ '_id': { $in: studentIds } });
//   if (studentsExist.length !== studentIds.length) {
//     throw new ApiError(404, "Some students not found");
//   }

//   const newAttendance = new Attendance({
//     classId,
//     subjectId,
//     teacherId,
//     date,
//     attendanceData,
//   });

//   await newAttendance.save();

//   return res.status(201).json(new ApiResponse(200, "Attendance taken successfully"));
// });
