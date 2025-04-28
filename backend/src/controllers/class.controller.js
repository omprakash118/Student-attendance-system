const ApiError = require('../utils/ApiError.js');
const ApiResponse = require('../utils/ApiResponse.js');
const asyncHandler = require('../utils/asyncHandler.js');
const Classes = require('../models/class.models.js');
const Teacher = require('../models/teacher.models.js');
const Student = require('../models/student.models.js');

// Create a new class
const createClass = asyncHandler(async (req, res) => {
    const { className, subject, teacher, students } = req.body;

    // Check if teacher exists
    const teacherExists = await Teacher.findById(teacher);
    if (!teacherExists) {
        throw new ApiError(404, "Teacher not found");
    }

    // Check if all students exist
    const studentsExist = await Student.find({ '_id': { $in: students } });
    if (studentsExist.length !== students.length) {
        throw new ApiError(404, "Some students not found");
    }

    // Create the new class
    const newClass = await Classes.create({ className, subject, teacher, students });

    return res.status(201).json(new ApiResponse(201, newClass, "Class created successfully"));
});

// Get all classes
const getAllClasses = asyncHandler(async (req, res) => {
    const classes = await Classes.find()
        .populate('teacher', 'Firstname Lastname') // populate teacher details
        .populate('students', 'Firstname Lastname'); // populate students details
    
    return res.status(200).json(new ApiResponse(200, classes, "Classes fetched successfully"));
});

// Get a class by its ID
const getClassById = asyncHandler(async (req, res) => {
    const classId = req.params.classId;

    const classDetails = await Classes.findById(classId)
        .populate('teacher', 'Firstname Lastname')
        .populate('students', 'Firstname Lastname');

    if (!classDetails) {
        throw new ApiError(404, "Class not found");
    }

    return res.status(200).json(new ApiResponse(200, classDetails, "Class fetched successfully"));
});

// Add a student to a class
const addStudentToClass = asyncHandler(async (req, res) => {
    const { classId, studentId } = req.body;

    // Check if class exists
    const classDetails = await Classes.findById(classId);
    if (!classDetails) {
        throw new ApiError(404, "Class not found");
    }

    // Check if student exists
    const student = await Student.findById(studentId);
    if (!student) {
        throw new ApiError(404, "Student not found");
    }

    // Add student to the class
    if (!classDetails.students.includes(studentId)) {
        classDetails.students.push(studentId);
        await classDetails.save();
    }

    return res.status(200).json(new ApiResponse(200, classDetails, "Student added to class successfully"));
});

// Remove a student from a class
const removeStudentFromClass = asyncHandler(async (req, res) => {
    const { classId, studentId } = req.body;

    // Check if class exists
    const classDetails = await Classes.findById(classId);
    if (!classDetails) {
        throw new ApiError(404, "Class not found");
    }

    // Remove student from the class
    classDetails.students = classDetails.students.filter(student => student.toString() !== studentId);
    await classDetails.save();

    return res.status(200).json(new ApiResponse(200, classDetails, "Student removed from class successfully"));
});

// Update class details (e.g., change teacher, subject, etc.)
const updateClassDetails = asyncHandler(async (req, res) => {
    const { classId, className, subject, teacher, students } = req.body;

    // Check if class exists
    const classDetails = await Classes.findById(classId);
    if (!classDetails) {
        throw new ApiError(404, "Class not found");
    }

    // Update teacher
    if (teacher) {
        const teacherExists = await Teacher.findById(teacher);
        if (!teacherExists) {
            throw new ApiError(404, "Teacher not found");
        }
    }

    // Update students
    if (students) {
        const studentsExist = await Student.find({ '_id': { $in: students } });
        if (studentsExist.length !== students.length) {
            throw new ApiError(404, "Some students not found");
        }
    }

    // Update class details
    classDetails.className = className || classDetails.className;
    classDetails.subject = subject || classDetails.subject;
    classDetails.teacher = teacher || classDetails.teacher;
    classDetails.students = students || classDetails.students;

    await classDetails.save();

    return res.status(200).json(new ApiResponse(200, classDetails, "Class updated successfully"));
});

// Delete a class
const deleteClass = asyncHandler(async (req, res) => {
    const classId = req.params.classId;

    const classDetails = await Classes.findByIdAndDelete(classId);

    if (!classDetails) {
        throw new ApiError(404, "Class not found");
    }

    return res.status(200).json(new ApiResponse(200, {}, "Class deleted successfully"));
});

module.exports = {
    createClass,
    getAllClasses,
    getClassById,
    addStudentToClass,
    removeStudentFromClass,
    updateClassDetails,
    deleteClass
};
