
const AuthService = require('../services/authService');
const passport = require('../services/oauthService');

const register = async (req, res) => {
  const { username, password, email } = req.body;
  const user = await AuthService.register({ username, password, email });
  res.status(201).json({ user });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const token = await AuthService.login({ email, password });
  if (!token) return res.status(401).json({ message: 'Invalid credentials' });
  res.json({ token });
};

// Google OAuth callback
const googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

const googleCallback = passport.authenticate('google', {
  failureRedirect: '/login',
  session: false,
},
(req, res) => {
  res.redirect('/dashboard');
});

module.exports = { register, login, googleAuth, googleCallback };
