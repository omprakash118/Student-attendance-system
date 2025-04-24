const Router = require('express');

const router = Router();

const { registerUser } = require('../controllers/user.controller.js');

router.route('/register').post(registerUser);


module.exports = router;