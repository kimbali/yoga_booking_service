const mongoose = require('mongoose');

const yogaClassSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true }, // en minutos
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    required: true,
  },
  date: { type: Date, required: true },
  instructor: { type: String, required: true },
});

module.exports = mongoose.model('YogaClass', yogaClassSchema);
