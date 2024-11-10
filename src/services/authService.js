const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateToken } = require('../utils/jwtUtils');

class AuthService {
  static async register({ username, password, email }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return User.createUser({ username, password: hashedPassword, email });
  }

  static async login({ email, password }) {
    const user = await User.findByEmail(email);
    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user.password);
    return isPasswordValid ? generateToken(user.id) : null;
  }
}

module.exports = AuthService;
