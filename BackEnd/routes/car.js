const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');

router.post('/', carController.createCar);
router.put('/:id', carController.updateCar);
router.delete('/:id', carController.deleteCar);

router.get('/sorted', carController.getSortedCars);
router.get('/:id', carController.getCarById);
router.get('/', carController.getAllCars);


module.exports = router;
