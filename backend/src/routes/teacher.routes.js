const Router = require('express');

const router = Router();

const {
    getAllTeachers,
    getTeacherById,
    updateTeacher,
    deleteTeacher,
} = require('../controllers/teacher.controller.js');

// All routes start from /api/v1/teachers

router.get('/', getAllTeachers);                  // GET all teachers
router.get('/:teacherId', getTeacherById);         // GET a teacher by ID
router.put('/update/:teacherId', updateTeacher);          // UPDATE a teacher by ID
router.delete('/delete/:teacherId', deleteTeacher);       // DELETE a teacher by ID

module.exports = router;
 