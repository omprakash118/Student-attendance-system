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



router.post('/create', createClass);           // Create a new class
router.get('/', getAllClasses);                // Get all classes
router.get('/:classId', getClassById);         // Get a class by ID
router.post('/add-student', addStudentToClass);// Add a student to a class
router.post('/remove-student', removeStudentFromClass);  // Remove a student from a class
router.put('/update', updateClassDetails);     // Update class details
router.delete('/:classId', deleteClass);       // Delete a class

module.exports = router;
