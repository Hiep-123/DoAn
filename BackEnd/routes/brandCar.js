const router = require('express').Router();

const brandCarController = require('../controllers/brandController')

router.post('/', brandCarController.addBrandCar)
router.get('/', brandCarController.getAllBrandCar)
router.get('/:id', brandCarController.getBrandCarById)
router.put('/:id', brandCarController.updateBrandCar)
router.delete('/:id', brandCarController.deleteBrandCar)

module.exports = router