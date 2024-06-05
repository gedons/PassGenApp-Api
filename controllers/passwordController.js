const Password = require('../models/Password');
const { generatePassword, checkPasswordStrength } = require('../utils/passwordUtils');

// Generate password and check strength
exports.generatePassword = (req, res) => {
  const { length, options } = req.body;
  const password = generatePassword(length, options);
  const strength = checkPasswordStrength(password);
  res.json({ password, strength });
};

// Save password to user's profile
exports.savePassword = async (req, res) => {
  const { password } = req.body;
  try {
    const newPassword = new Password({
      user: req.user.id,
      password
    });
    const savedPassword = await newPassword.save();
    res.status(201).json(savedPassword);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all passwords for the logged-in user
exports.getPasswords = async (req, res) => {
  try {
    const passwords = await Password.find({ user: req.user.id }).sort({ date: -1 });;
    res.json(passwords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific password by ID
exports.getPasswordById = async (req, res) => {
  try {
    const password = await Password.findById(req.params.id);
    if (password && password.user.toString() === req.user.id) {
      res.json(password);
    } else {
      res.status(404).json({ message: 'Password not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a password by ID
exports.updatePassword = async (req, res) => {
  try {
    const password = await Password.findById(req.params.id);
    if (password && password.user.toString() === req.user.id) {
      password.password = req.body.password || password.password;
      const updatedPassword = await password.save();
      res.json(updatedPassword);
    } else {
      res.status(404).json({ message: 'Password not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a password by ID
exports.deletePassword = async (req, res) => {
    try {
      const password = await Password.findById(req.params.id);
      if (password && password.user.toString() === req.user.id) {
        await password.deleteOne();
        res.json({ message: 'Password removed' });
      } else {
        res.status(404).json({ message: 'Password not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

exports.sharePassword = async (req, res) => {
  try {
    const password = await Password.findById(req.params.id);
    if (!password) {
      return res.status(404).json({ error: 'Password not found' });
    }
    const shareableLink = `https://easypassword-gen.vercel.app/share/${password._id}`;
    res.json({ shareableLink });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}

exports.GetsharePassword = async (req, res) => {
  try {
    const password = await Password.findById(req.params.id);
    if (!password) {
      return res.status(404).json({ error: 'Password not found' });
    }
    res.json({ password: password.password });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}