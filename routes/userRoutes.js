const express = require('express');
const {registerUser, loginUser, getUser} = require('../controllers/authController');

const router = express.Router();

// Register a new user
router.post('/register', registerUser);

// Login a user
router.post('/login', loginUser);

router.get('/me', getUser);

module.exports = router;