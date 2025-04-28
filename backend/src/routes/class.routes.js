const Router = require('express');

const router = Router();

const {
        createClass,
        getAllClasses,
        getClassById,
        addStudentToClass,
        removeStudentFromClass,
        updateClassDetails,
        deleteClass  } = require('../controllers/class.controller.js');


// Create a new class
router.post('/create', createClass);

// Get all classes
router.get('/', getAllClasses);

// Get a class by ID
router.get('/:classId', getClassById);

// Add a student to a class
router.post('/add-student', addStudentToClass);

// Remove a student from a class
router.post('/remove-student', removeStudentFromClass);

// Update class details
router.put('/update', updateClassDetails);

// Delete a class
router.delete('/:classId', deleteClass);

module.exports = router;
