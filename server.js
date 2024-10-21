const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const yogaClassRoutes = require('./routes/yogaClassRoutes');

// Cargar variables de entorno
dotenv.config();

// Conectar a MongoDB
connectDB();

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use('/api/yoga-classes', yogaClassRoutes);

// Puerto del servidor
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
