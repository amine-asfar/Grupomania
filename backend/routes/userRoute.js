const express = require('express');
const router = express.Router();
const users = require('../controllers/userCtrl');

//signup
router.post('/signup', users.signup);
//login
router.post('/login', users.login);
//get user profile
router.get('/:userId', users.getUserProfile);
// update user profile
router.put('/:userId', users.updateProfile);
// delete profile 
router.delete('/:userId', users.deleteProfile);

module.exports = router;