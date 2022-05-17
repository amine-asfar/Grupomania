const express = require('express');
const router = express.Router();
const users = require('../controllers/userCtrl');

//signup
router.post('/', users.signup);


module.exports = router;