const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require('../config/db');

exports.register = async (req, res) => {

  try {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(422).json({
        message: 'All fields required'
      });
    }

    db.query(
      'SELECT * FROM users WHERE email = ?',
      [email],
      async (err, results) => {

        if (results.length > 0) {
          return res.status(409).json({
            message: 'Email already used'
          });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        db.query(
          'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
          [name, email, hashedPassword],
          (err, result) => {

            if (err) {
              return res.status(500).json({
                message: err.message
              });
            }

            res.status(201).json({
              message: 'Register success'
            });

          }
        );

      }
    );

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

exports.login = async (req, res) => {

  try {

    const { email, password } = req.body;

    db.query(
      'SELECT * FROM users WHERE email = ?',
      [email],
      async (err, results) => {

        if (results.length === 0) {
          return res.status(401).json({
            message: 'Invalid credentials'
          });
        }

        const user = results[0];

        const validPassword = await bcrypt.compare(
          password,
          user.password
        );

        if (!validPassword) {
          return res.status(401).json({
            message: 'Invalid credentials'
          });
        }

        const accessToken = jwt.sign(
          {
            id: user.id,
            email: user.email
          },
          process.env.JWT_SECRET,
          {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRES
          }
        );

        const refreshToken = jwt.sign(
          {
            id: user.id
          },
          process.env.JWT_SECRET,
          {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRES
          }
        );

        db.query(
          'INSERT INTO refresh_tokens (token, user_id) VALUES (?, ?)',
          [refreshToken, user.id]
        );

        res.status(200).json({
          accessToken,
          refreshToken
        });

      }
    );

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

exports.refresh = (req, res) => {

  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({
      message: 'Refresh token required'
    });
  }

  db.query(
    'SELECT * FROM refresh_tokens WHERE token = ?',
    [refreshToken],
    (err, results) => {

      if (results.length === 0) {
        return res.status(403).json({
          message: 'Invalid refresh token'
        });
      }

      jwt.verify(
        refreshToken,
        process.env.JWT_SECRET,
        (err, decoded) => {

          if (err) {
            return res.status(403).json({
              message: 'Expired refresh token'
            });
          }

          const newAccessToken = jwt.sign(
            { id: decoded.id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRES }
          );

          res.json({
            accessToken: newAccessToken
          });

        }
      );

    }
  );
router.post('/refresh', authController.refresh);
};

exports.logout = (req, res) => {

  const { refreshToken } = req.body;

  db.query(
    'DELETE FROM refresh_tokens WHERE token = ?',
    [refreshToken],
    () => {

      res.json({
        message: 'Logout success'
      });

    }
  );
router.post('/logout', authController.logout);
};

