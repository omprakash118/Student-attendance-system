const Router = require('express');

const router = Router();

const { takeAttendance,
    getAllClasses,
    getAttendanceById,
    getAttendanceByClassAndDate
 } = require('../controllers/takeAttendance.controller.js');

router.route('/take-attendance').post(takeAttendance);
router.route('/get-attendance').get(getAllClasses);
router.route('/get-attendance/:attendanceId').get(getAttendanceById);
router.route('/get-attendance-by-class').get(getAttendanceByClassAndDate);



module.exports = router;