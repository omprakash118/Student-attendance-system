const Router = require('express');

const router = Router();

const { takeAttendance } = require('../controllers/takeAttendance.controller.js');

router.route('/take-attendance').post(takeAttendance);

module.exports = router;