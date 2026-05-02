const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const db = require('./db'); 

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK
},
(accessToken, refreshToken, profile, done) => {

  const email = profile.emails[0].value;
  const name = profile.displayName;
  const photo = profile.photos[0].value;

  db.query(
    'SELECT * FROM users WHERE email = ?',
    [email],
    (err, results) => {

      if (results.length > 0) {
        return done(null, results[0]);
      }

      db.query(
        'INSERT INTO users (name, email, photo, oauth_provider) VALUES (?, ?, ?, ?)',
        [name, email, photo, 'google'],
        (err, result) => {

          const user = {
            id: result.insertId,
            name,
            email
          };

          return done(null, user);
        }
      );

    }
  );

}));