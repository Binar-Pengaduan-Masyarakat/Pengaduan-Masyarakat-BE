var express = require('express');
var router = express.Router();
const authController = require('../controller/authController');
const authMiddleware = require('../middleware/middlewareAuth')

/* GET users listing. */

router.post('/login', authController.login);
router.post('/register', authMiddleware.checkUserExist, authController.register);
router.get('/verify-email', authController.getVerifyEmail);

module.exports = router