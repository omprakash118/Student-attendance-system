const Router = require('express');

const router = Router();

const {
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent,
    getUnassignedStudents
} = require('../controllers/student.controller.js');

// All routes start from /api/v1/students

router.get('/', getAllStudents);                  // GET all students
router.get('/getUnassignedStudents', getUnassignedStudents);  // getUnassignedStudents student
router.get('/:studentId', getStudentById);         // GET a student by ID
router.put('/:studentId', updateStudent);          // UPDATE a student by ID
router.delete('/:studentId', deleteStudent);       // DELETE a student by ID

module.exports = router;
