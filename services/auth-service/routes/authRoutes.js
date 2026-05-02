const express = require('express');

const router = express.Router();

const authController = require('../controllers/authController');

router.post('/register', authController.register);

router.post('/login', authController.login);

module.exports = router;

const passport = require('passport');

router.get('/oauth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

router.get('/oauth/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {

    const jwt = require('jsonwebtoken');

    const accessToken = jwt.sign(
      { id: req.user.id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRES }
    );

    res.json({
      message: 'Login Google berhasil',
      accessToken
    });

  }
);