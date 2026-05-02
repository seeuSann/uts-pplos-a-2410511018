require('dotenv').config();

const express = require('express');
const cors = require('cors');

const rateLimit = require('express-rate-limit');

const {
  createProxyMiddleware
} = require('http-proxy-middleware');

const authMiddleware = require('./middleware/authMiddleware');

const app = express();

app.use(cors());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  message: {
    message: 'Too many requests'
  }
});

app.use(limiter);

app.use('/api/auth',
  createProxyMiddleware({
    target: process.env.AUTH_SERVICE,
    changeOrigin: true
  })
);

app.use('/api/properties',
  authMiddleware,
  createProxyMiddleware({
    target: process.env.PROPERTY_SERVICE,
    changeOrigin: true
  })
);

app.use('/api/bookings',
  authMiddleware,
  createProxyMiddleware({
    target: process.env.BOOKING_SERVICE,
    changeOrigin: true
  })
);

app.use('/api/payments',
  authMiddleware,
  createProxyMiddleware({
    target: process.env.PAYMENT_SERVICE,
    changeOrigin: true
  })
);

app.listen(process.env.PORT, () => {
  console.log(`Gateway running on port ${process.env.PORT}`);
});