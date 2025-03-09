const router = require('express').Router();

const carController = require('../controllers/carController')


router.post('/', carController.addCar)
router.get('/', carController.getCar)

module.exports = router