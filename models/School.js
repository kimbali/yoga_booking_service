const mongoose = require('mongoose');

const Location = {
  lat: Number,
  lng: Number,
};

const schoolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  teachers: [String],
  location: Location,
  phone: String,
});

module.exports = mongoose.model('School', schoolSchema);
