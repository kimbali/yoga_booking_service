const express = require('express');
const router = express.Router();
const yogaClassController = require('../controllers/yogaClassController');

// Rutas CRUD para YogaClass
router.get('/', yogaClassController.getAllClasses);
router.post('/', yogaClassController.createClass);
router.get('/:id', yogaClassController.getClassById);
router.put('/:id', yogaClassController.updateClass);
router.delete('/:id', yogaClassController.deleteClass);

module.exports = router;
