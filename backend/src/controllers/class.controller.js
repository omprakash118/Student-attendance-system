const ApiError = require('../utils/ApiError.js');
const ApiResponse = require('../utils/ApiResponse.js');
const asyncHandler = require('../utils/asyncHandler.js');
const Classes = require('../models/class.models.js');
const Teacher = require('../models/teacher.models.js');
const Student = require('../models/student.models.js');

// Create a new class
const createClass = asyncHandler(async (req, res) => {
    const { className, subjects = [], students = [] } = req.body;

    if (!className || !Array.isArray(subjects) || subjects.length === 0) {
        throw new ApiError(400, "Class name and subjects (with teachers) are required");
    }

    // Validate all subject entries
    for (const subject of subjects) {
        if (!subject.subjectName || !subject.teacher) {
            throw new ApiError(400, "Each subject must have a subjectName and teacher");
        }

        const teacherExists = await Teacher.findById(subject.teacher);
        if (!teacherExists) {
            throw new ApiError(404, `Teacher not found for subject ${subject.subjectName}`);
        }
    }

    // Validate student IDs
    if (students.length > 0) {
        const studentsExist = await Student.find({ '_id': { $in: students } });
        if (studentsExist.length !== students.length) {
            throw new ApiError(404, "Some students not found");
        }
    }

    const newClass = await Classes.create({ className, subjects, students });

    return res.status(201).json(new ApiResponse(201, newClass, "Class created successfully"));
});


// Get all classes
const getAllClasses = asyncHandler(async (req, res) => {
    const classes = await Classes.find()
        .populate('subjects.teacher', 'Firstname Lastname')
        .populate('students', 'Firstname Lastname');

    return res.status(200).json(new ApiResponse(200, classes, "Classes fetched successfully"));
});

// Get class by ID
const getClassById = asyncHandler(async (req, res) => {
    const { classId } = req.params;

    if (!classId) {
        throw new ApiError(400, "Class ID is required");
    }

    const classDetails = await Classes.findById(classId)
        .populate('subjects.teacher', 'Firstname Lastname')
        .populate('students', 'Firstname Lastname');

    if (!classDetails) {
        throw new ApiError(404, "Class not found");
    }

    return res.status(200).json(new ApiResponse(200, classDetails, "Class fetched successfully"));
});


// Add student to class
const addStudentToClass = asyncHandler(async (req, res) => {
    const { classId, studentId } = req.body;

    if (!classId || !studentId) {
        throw new ApiError(400, "Class ID and Student ID are required");
    }

    const classDetails = await Classes.findById(classId);
    if (!classDetails) {
        throw new ApiError(404, "Class not found");
    }

    const student = await Student.findById(studentId);
    if (!student) {
        throw new ApiError(404, "Student not found");
    }

    await Classes.findByIdAndUpdate(classId, {
        $addToSet: { students: studentId }
    });

    const updatedClass = await Classes.findById(classId)
        .populate('subjects.teacher', 'Firstname Lastname')
        .populate('students', 'Firstname Lastname');

    return res.status(200).json(new ApiResponse(200, updatedClass, "Student added to class successfully"));
});


// Remove student from class
const removeStudentFromClass = asyncHandler(async (req, res) => {
    const { classId, studentId } = req.body;

    if (!classId || !studentId) {
        throw new ApiError(400, "Class ID and Student ID are required");
    }

    const classDetails = await Classes.findById(classId);
    if (!classDetails) {
        throw new ApiError(404, "Class not found");
    }

    await Classes.findByIdAndUpdate(classId, {
        $pull: { students: studentId }
    });

    const updatedClass = await Classes.findById(classId)
        .populate('subjects.teacher', 'Firstname Lastname')
        .populate('students', 'Firstname Lastname');

    return res.status(200).json(new ApiResponse(200, updatedClass, "Student removed from class successfully"));
});


// Update class details
const updateClassDetails = asyncHandler(async (req, res) => {
    const { classId, className, subjects, students } = req.body;

    if (!classId) {
        throw new ApiError(400, "Class ID is required");
    }

    const classDetails = await Classes.findById(classId);
    if (!classDetails) {
        throw new ApiError(404, "Class not found");
    }

    const updateFields = {};

    if (className) updateFields.className = className;

    if (Array.isArray(subjects)) {
        for (const subject of subjects) {
            if (!subject.subjectName || !subject.teacher) {
                throw new ApiError(400, "Each subject must have subjectName and teacher");
            }
            const teacherExists = await Teacher.findById(subject.teacher);
            if (!teacherExists) {
                throw new ApiError(404, `Teacher not found for subject ${subject.subjectName}`);
            }
        }
        updateFields.subjects = subjects;
    }

    if (Array.isArray(students)) {
        const studentsExist = await Student.find({ '_id': { $in: students } });
        if (studentsExist.length !== students.length) {
            throw new ApiError(404, "Some students not found");
        }
        updateFields.students = students;
    }

    await Classes.findByIdAndUpdate(classId, { $set: updateFields }, { new: true });

    const updatedClass = await Classes.findById(classId)
        .populate('subjects.teacher', 'Firstname Lastname')
        .populate('students', 'Firstname Lastname');

    return res.status(200).json(new ApiResponse(200, updatedClass, "Class updated successfully"));
});


// Delete class
const deleteClass = asyncHandler(async (req, res) => {
    const { classId } = req.params;

    if (!classId) {
        throw new ApiError(400, "Class ID is required");
    }

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
