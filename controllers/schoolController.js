const School = require('../models/School');

// Obtener todas las clases
exports.getAllSchools = async (req, res) => {
  try {
    const school = await School.find();
    res.json(school);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear una nueva clase
exports.createSchool = async (req, res) => {
  const { name, description, teachers, location, phone } = req.body;
  const newSchool = new School({
    name,
    description,
    teachers,
    location,
    phone,
  });

  try {
    const savedSchool = await newSchool.save();
    res.status(201).json(savedSchool);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtener una clase por ID
exports.getSchoolById = async (req, res) => {
  try {
    const School = await School.findById(req.params.id);
    if (!school) return res.status(404).json({ message: 'School not found' });
    res.json(school);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar una clase por ID
exports.updateSchool = async (req, res) => {
  try {
    const updatedSchool = await School.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedSchool)
      return res.status(404).json({ message: 'School not found' });
    res.json(updatedSchool);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar una clase por ID
exports.deleteSchool = async (req, res) => {
  try {
    const deletedSchool = await School.findByIdAndDelete(req.params.id);
    if (!deletedSchool)
      return res.status(404).json({ message: 'School not found' });
    res.json({ message: 'School deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
