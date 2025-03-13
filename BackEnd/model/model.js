const mongoose = require('mongoose');

// Define your schemas and models here

// Example schema and model
const carSchema = new mongoose.Schema({
    img: String,
    category: String,
    brandId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BrandCar'
    },
    pricePerDay: Number,
    des: String,
}, { timestamps: true });

//thuong hieu
const brandCarShema = new mongoose.Schema({
    nameBrandCar: {
        type: String
    },

})

//dat xe
const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    carId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car'
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'cancelled'],
        default: 'pending'
    },

}, [{ timestamps: true }])

//nguoi dung
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String
    },

}, [{ timestamps: true }]);

//tai khoan
const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    password: {
        type: String,
        required: true
    },

    userName: {
        type: String
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'User'
    }
}, [{ timestamps: true }])

//thanh toan
const paymentScheme = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking'
    },

    paythod: {
        type: String,
        enum: ['credit_card', 'paypal', 'cash', 'bank_transfer', 'crypto']
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    },
    transactionDate: {
        type: Date,
        default: Date.now
    }
}, [{ timestamps: true }]);

//chi tiet thanh toan
const detailPayment = new mongoose.Schema({
    bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking'
    },
    paymentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment'
    },
    amountCar: Number,
    totalAmount: {
        type: Number
    }
}, [{ timestamps: true }])

// danh gia
const commentSchema = new mongoose.Schema({
    bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    ratingPoints: {
        type: Number,
        min: 1,
        max: 5
    },
    comment: String,
}, [{ timestamps: true }]);

let Comment = mongoose.model('Comment', commentSchema);
let User = mongoose.model('User', userSchema);
let Car = mongoose.model('Car', carSchema)
let BrandCar = mongoose.model('BrandCar', brandCarShema)
let Booking = mongoose.model('BookingCar', bookingSchema)
let Account = mongoose.model('Account', accountSchema)
let Payment = mongoose.model('Payment', paymentScheme)
let DetailPayment = mongoose.model('DetailPayment', detailPayment)

module.exports = { Car, BrandCar, User, Booking, Account, Payment, DetailPayment, Comment }
