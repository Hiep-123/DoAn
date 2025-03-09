const router = require('express').Router();

const brandCarController = require('../controllers/brandController')


router.post('/', brandCarController.addBrandCar)

module.exports = router