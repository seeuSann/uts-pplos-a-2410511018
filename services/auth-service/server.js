require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/authRoutes');

app.use('/', authRoutes);

const passport = require('passport');
require('./config/passport');

app.use(passport.initialize());

app.listen(process.env.PORT, () => {
  console.log(`Auth service running on ${process.env.PORT}`);
});