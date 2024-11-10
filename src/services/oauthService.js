const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
},
async (accessToken, refreshToken, profile, done) => {
  const user = await User.findByEmail(profile.emails[0].value);
  if (!user) {
    const newUser = await User.createUser({
      username: profile.displayName,
      email: profile.emails[0].value,
      password: null, // OAuth users don't need a password
    });
    return done(null, newUser);
  }
  return done(null, user);
}));

module.exports = passport;
