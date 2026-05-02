require('dotenv').config();

const express = require('express');
const cors = require('cors');

const paymentRoutes = require('./routes/paymentRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/payments', paymentRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Payment service running on ${process.env.PORT}`);
});