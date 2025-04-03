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

exports.getMonthlyRevenue = async (req, res) => {
    try {
        const { year } = req.params;
        const parsedYear = parseInt(year, 10);

        if (isNaN(parsedYear) || parsedYear < 2000 || parsedYear > 2100) {
            return res.status(400).json({ message: "Năm không hợp lệ!" });
        }

        // Danh sách tháng
        const months = [
            "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4",
            "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8",
            "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
        ];

        // Tạo mảng chứa doanh thu từng tháng với format [{ month: 'Tháng 1', revenue: 0 }, ...]
        let monthlyRevenue = months.map((month, index) => ({
            month: month,
            revenue: 0
        }));

        // Truy vấn tất cả chi tiết thanh toán trong năm
        const payments = await DetailPayment.find({
            createdAt: {
                $gte: new Date(`${parsedYear}-01-01T00:00:00.000Z`),
                $lte: new Date(`${parsedYear}-12-31T23:59:59.999Z`),
            },
        });

        // Cập nhật doanh thu từng tháng
        payments.forEach(payment => {
            const monthIndex = new Date(payment.createdAt).getMonth(); // Lấy tháng (0-11)
            monthlyRevenue[monthIndex].revenue += payment.totalAmount || 0; // Cộng dồn doanh thu
        });

        res.json({
            year: parsedYear,
            monthlyRevenue
        });
    } catch (error) {
        console.error("🔥 Lỗi khi tính doanh thu:", error);
        res.status(500).json({ message: "Lỗi server!" });
    }
};

