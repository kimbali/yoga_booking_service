const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const yogaClassRoutes = require('./routes/yogaClassRoutes');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');

// Cargar variables de entorno
dotenv.config();

// Conectar a MongoDB
connectDB();

const app = express();

// CORS ///////
// PROD: Configure CORS to allow requests from your Ionic app
// app.use(cors({
//   origin: 'http://localhost:3000', // Replace with your Ionic app's origin
//   credentials: true // Allows cookies and credentials to be included
// }));

// DEV: Alternatively, for development purposes, you can allow all origins
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/yoga-classes', yogaClassRoutes);

// Puerto del servidor
const PORT = process.env.PORT || 5001;
console.log('hey server');
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
