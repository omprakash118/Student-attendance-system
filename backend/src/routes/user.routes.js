const Router = require('express');
const verifyJwt = require('../middlewares/auth.middlewares.js');

const router = Router();

const { registerUser,
    registerTeacher,
    registerStudent,
    loginUser,
    logoutUser } = require('../controllers/user.controller.js');

router.route('/login').post(loginUser);
router.route('/logout').post(verifyJwt, logoutUser);
router.route('/register').post(registerUser);
router.route('/registerTeacher').post(registerTeacher);
router.route('/registerStudent').post(registerStudent);

module.exports = router;