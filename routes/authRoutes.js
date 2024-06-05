const express = require('express');
const { registerUser, authUser, getUserProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const rateLimiter = require('../middleware/rateLimiter');

const router = express.Router();


router.post('/register', rateLimiter, registerUser);
router.post('/login', rateLimiter, authUser);
router.get('/profile', protect, getUserProfile);

module.exports = router;
