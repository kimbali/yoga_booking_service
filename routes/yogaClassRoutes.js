const express = require('express');
const router = express.Router();
const yogaClassController = require('../controllers/yogaClassController');

router.get('/by-school/:id', yogaClassController.getAllClasses);

router.post('/', yogaClassController.createClass);
router.get('/:id', yogaClassController.getClassById);
router.put('/:id', yogaClassController.updateClass);
router.delete('/:id', yogaClassController.deleteClass);

router.put('/:id/join', yogaClassController.joinClass);
router.put('/:id/leave', yogaClassController.leaveClass);

router.post('/multiple', yogaClassController.createClasses);

module.exports = router;
