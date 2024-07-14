const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/:userId', userController.getUserProfile);
router.post('/', userController.createUserProfile);
router.put('/:userId', userController.updateUserProfile);
router.delete('/:userId', userController.deleteUserProfile);

module.exports = router;
