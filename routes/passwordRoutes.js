const express = require('express');
const { generatePassword, savePassword, getPasswords, getPasswordById, updatePassword, deletePassword, sharePassword,GetsharePassword  } = require('../controllers/passwordController');
const { protect } = require('../middleware/authMiddleware');
const rateLimiter = require('../middleware/rateLimiter');

const router = express.Router();

router.post('/generate', rateLimiter, generatePassword);
router.post('/save', rateLimiter, protect, savePassword);
router.post('/share/:id', rateLimiter, protect, sharePassword);
router.get('/share/:id', rateLimiter, GetsharePassword);
router.get('/', protect, getPasswords);
router.get('/:id', protect, getPasswordById);
router.put('/:id', protect, updatePassword);
router.delete('/:id', protect, deletePassword);

module.exports = router;
