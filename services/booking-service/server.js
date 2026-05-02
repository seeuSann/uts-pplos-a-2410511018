require('dotenv').config();

const express = require('express');
const cors = require('cors');

const bookingRoutes = require('./routes/bookingRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/bookings', bookingRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Booking service running on ${process.env.PORT}`);
});