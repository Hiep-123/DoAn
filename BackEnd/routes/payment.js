const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.post('/', paymentController.createPayment);
router.get('/detailPayment', paymentController.getDetailPayment)
router.get('/', paymentController.getAllPayments);
router.get("/revenue/:year",paymentController.getMonthlyRevenue);
router.get('/:id', paymentController.getPaymentById);
router.put('/:id', paymentController.updatePayment);
router.delete('/:id', paymentController.deletePayment);
module.exports = router;
