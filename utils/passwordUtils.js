const zxcvbn = require('zxcvbn');

const generatePassword = (length, options) => {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const specialChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    
    let characters = '';
    if (options.lowercase) characters += lowercase;
    if (options.uppercase) characters += uppercase;
    if (options.numbers) characters += numbers;
    if (options.specialChars) characters += specialChars;
  
    let password = '';
    for (let i = 0; i < length; i++) {
      password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    
    return password;
  };
  
  const checkPasswordStrength = (password) => {
    const result = zxcvbn(password);
    return {
      score: result.score,
      feedback: result.feedback
    };
  };
  
  module.exports = { generatePassword, checkPasswordStrength };
  