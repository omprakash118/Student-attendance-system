const Router = require('express');

const router = Router();

const { registerUser,
    registerTeacher,
    registerStudent } = require('../controllers/user.controller.js');

router.route('/register').post(registerUser);
router.route('/registerTeacher').post(registerTeacher);
router.route('/registerStudent').post(registerStudent);


module.exports = router;