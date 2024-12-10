const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const yogaClassRoutes = require('./routes/yogaClassRoutes');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// CORS Configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [
  'http://localhost:8100',
];
app.use(
  cors({
    origin: ['http://localhost:8100'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/yoga-classes', yogaClassRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
