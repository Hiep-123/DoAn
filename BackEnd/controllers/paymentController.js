const { Payment, DetailPayment, Booking } = require('../model/model');
const mongoose = require('mongoose');

exports.createPayment = async (req, res) => {
    try {
        const { userId, bookingId, method, amountCar, totalAmount } = req.body;
        // Kiểm tra ObjectId có hợp lệ không
        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(bookingId)) {
            return res.status(400).json({ error: "Invalid ObjectId format" });
        }

        // Tạo thanh toán mới
        const payment = new Payment({
            userId,
            bookingId,
            method,
            paymentStatus: 'pending' // Mặc định là pending
        });

        await payment.save();

        // Lưu chi tiết thanh toán
        const detailPayment = new DetailPayment({
            bookingId,
            paymentId: payment._id,
            amountCar,
            totalAmount
        });

        await detailPayment.save();

        res.status(201).json({
            message: "Payment created successfully!",
            payment,
            detailPayment
        });

    } catch (error) {
        console.error("Error in createPayment:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


exports.getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find().populate('userId') // Lấy toàn bộ thông tin userId
        res.status(200).json(payments);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: "Lỗi server", error });
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
        // Tìm payment theo ID
        const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        // Kiểm tra nếu payment không tồn tại
        if (!payment) {
            return res.status(404).send("Payment not found");
        }

        // Nếu payment có trạng thái 'completed', cập nhật trạng thái của booking
        if (payment.paymentStatus === 'completed') {
            // Cập nhật booking với paymentId
            const booking = await Booking.findById(payment.bookingId);
            if (booking) {
                booking.status = 'completed';
                await booking.save(); // Lưu lại trạng thái mới của booking
            }
        }

        res.status(200).send(payment); // Trả lại payment đã cập nhật
    } catch (error) {
        res.status(400).send(error); // Trả lỗi nếu có
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

exports.getDetailPayment = async (req, res) => {
    try {
        const detailPayment = await DetailPayment.find()
        res.status(200).json(detailPayment);
    } catch (error) {
        res.status(500).send(error);
    }
}