const Payment = require('../model/model');

exports.createPayment = async (req, res) => {
    try {
        const payment = new Payment({
            user: req.body.user,
            cars: req.body.cars,
            amount: req.body.amount,
            paythod: req.body.paythod,
            paymentStatus: req.body.paymentStatus
        });
        await payment.save();
        res.status(201).send(payment);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find({});
        res.status(200).send(payments);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getPaymentById = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id);
        if (!payment) {
            return res.status(404).send();
        }
        res.status(200).send(payment);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.updatePayment = async (req, res) => {
    try {
        const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!payment) {
            return res.status(404).send();
        }
        res.status(200).send(payment);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.deletePayment = async (req, res) => {
    try {
        const payment = await Payment.findByIdAndDelete(req.params.id);
        if (!payment) {
            return res.status(404).send();
        }
        res.status(200).send(payment);
    } catch (error) {
        res.status(500).send(error);
    }
};
