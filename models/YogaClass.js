const mongoose = require('mongoose');

const yogaClassSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  date: { type: Date },
  duration: { type: Number }, // en minutos
  type: { type: String },
  level: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    required: true,
  },
  teacher: { type: String },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
    required: true,
  },
  capacity: { type: Number },
  registrations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('YogaClass', yogaClassSchema);
