const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const yogaClassRoutes = require('./routes/yogaClassRoutes');
const schoolRoutes = require('./routes/schoolRoutes');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// CORS Configuration
// app.use(cors());
const allowedOrigins = ['http://localhost:8100'];
app.use(
  cors({
    origin: ['http://localhost:8100'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/yoga-classes', yogaClassRoutes);
app.use('/api/school', schoolRoutes);

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
