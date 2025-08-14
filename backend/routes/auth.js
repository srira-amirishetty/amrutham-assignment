const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth');

// @desc    Register a new user
// @route   POST /auth/register
// @access  Public
router.post('/register', auth.register);

// @desc    Login a user
// @route   POST /auth/login
// @access  Public
router.post('/login', auth.login);
module.exports = router;