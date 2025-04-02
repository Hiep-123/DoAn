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
    pickupAddress: String,
    pickupDate: Date,
    pickupTime: String,
    dropOffAddress: String,
    dropOffTime: String,
    dropOffDate: Date,
    status: {
        type: String,
        enum: ['pending', 'completed', 'cancelled'],
        default: 'pending'
    },

}, [{ timestamps: true }])

//nguoi dung
const userSchema = new mongoose.Schema({
    bookingId: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Booking'
        }
    ],
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        sparse: true
    },
    phone: {
        type: String
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
        default: 'user'
    }
}, { timestamps: true });



//thanh toan
const paymentScheme = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        required: true
    },
    method: {
        type: String,
        enum: ['cash', 'transfer'],
        required: true
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
}, { timestamps: true }); // Đúng format

const detailPaymentSchema = new mongoose.Schema({
    bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        required: true
    },
    paymentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment',
        required: true
    },
    amountCar: {
        type: Number,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    }
}, { timestamps: true });

// danh gia
const commentSchema = new mongoose.Schema({
    bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        default: null
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
let Booking = mongoose.model('Booking', bookingSchema)
let Payment = mongoose.model('Payment', paymentScheme)
let DetailPayment = mongoose.model('DetailPayment', detailPaymentSchema)

module.exports = { Car, BrandCar, User, Booking, Payment, DetailPayment, Comment }
