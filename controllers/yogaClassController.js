const YogaClass = require('../models/YogaClass');

// Obtener todas las clases
exports.getAllClasses = async (req, res) => {
  try {
    const schoolId = req.params.id;

    if (!schoolId) {
      return res.status(400).json({ message: 'schoolId is required' });
    }

    const classes = await YogaClass.find({ school: schoolId }).sort({
      date: 1,
    }); // Sort by date ascending (oldest first)
    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear una nueva clase
exports.createClass = async (req, res) => {
  const { title, description, duration, level, date, instructor } = req.body;
  const newClass = new YogaClass({
    title,
    description,
    duration,
    level,
    date,
    instructor,
  });

  try {
    const savedClass = await newClass.save();
    res.status(201).json(savedClass);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Crear multiples clases
exports.createClasses = async (req, res) => {
  const classes = req.body; // Recibimos un array de clases

  try {
    const savedClasses = await YogaClass.insertMany(classes); // insertMany para crear varias clases
    res.status(201).json(savedClasses);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtener una clase por ID
exports.getClassById = async (req, res) => {
  try {
    const yogaClass = await YogaClass.findById(req.params.id);
    if (!yogaClass) return res.status(404).json({ message: 'Class not found' });
    res.json(yogaClass);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar una clase por ID
exports.updateClass = async (req, res) => {
  try {
    const updatedClass = await YogaClass.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedClass)
      return res.status(404).json({ message: 'Class not found' });
    res.json(updatedClass);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar una clase por ID
exports.deleteClass = async (req, res) => {
  try {
    const deletedClass = await YogaClass.findByIdAndDelete(req.params.id);
    if (!deletedClass)
      return res.status(404).json({ message: 'Class not found' });
    res.json({ message: 'Class deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
