const express = require('express');
const router = express.Router();
const yogaClassController = require('../controllers/yogaClassController');

router.get('/by-school/:id', yogaClassController.getAllClasses);
router.post('/', yogaClassController.createClass);
router.post('/multiple', yogaClassController.createClasses);
router.get('/:id', yogaClassController.getClassById);
router.put('/:id', yogaClassController.updateClass);
router.delete('/:id', yogaClassController.deleteClass);

module.exports = router;
