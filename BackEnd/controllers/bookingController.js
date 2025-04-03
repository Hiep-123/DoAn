const { Booking, User, Car } = require('../model/model');


exports.createBooking = async (req, res) => {
    try {
        const { userId, name, phone, carId, email } = req.body;
        const booking = new Booking(req.body);

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                email,
                name,
                phone,
                $push: { bookingId: booking._id, carId: carId }
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        await updatedUser.save()

        await booking.save();
        res.status(201).json({
            message: "Đặt xe thành công!",
            booking,
            user: updatedUser
        });
    } catch (error) {
        res.status(400).send(error);
    }
};




exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({}).populate('userId').populate('carId');
        res.status(200).send(bookings);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch bookings' });
    }
};

exports.getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id).populate('carId').populate('userId');
        if (!booking) {
            return res.status(404).send();
        }
        res.status(200).send(booking);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.updateBooking = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!booking) {
            return res.status(404).send();
        }
        res.status(200).send(booking);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);
        if (!booking) {
            return res.status(404).send();
        }
        res.status(200).send(booking);
    } catch (error) {
        res.status(500).send(error);
    }
};
