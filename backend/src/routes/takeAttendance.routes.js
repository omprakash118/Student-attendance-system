const Router = require('express');

const router = Router();

const { takeAttendance,
    getAllClasses,
    getAttendanceById
 } = require('../controllers/takeAttendance.controller.js');

router.route('/take-attendance').post(takeAttendance);
router.route('/get-attendance').get(getAllClasses);
router.route('/get-attendance/:attendanceId').get(getAttendanceById);

module.exports = router;