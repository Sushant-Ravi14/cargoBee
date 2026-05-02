const express = require('express');
const router = express.Router();
const { register, login, googleAuth, logout } = require('../controllers/auth.controller');

// POST /api/auth/register  — create account with name + email + password
router.post('/register', register);

// POST /api/auth/login     — sign in with email + password
router.post('/login', login);

// POST /api/auth/google    — Google OAuth (upsert user, return JWT)
router.post('/google', googleAuth);

// POST /api/auth/logout    — stateless signal
router.post('/logout', logout);

module.exports = router;
