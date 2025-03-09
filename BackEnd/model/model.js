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

const Car = mongoose.model('Car', carSchema);
//thuong hieu
const brandCarShema = new mongoose.Schema({
    nameBrandCar: {
        type: String
    },
    cars: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Car'
        }
    ]
})

//dat xe
const bookingSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
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
    user: {
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
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    cars: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car'
    },
    amount: {
        type: Number
    },
    paythod: {
        type: String,
        enum: ['credit_card', 'paypal', 'cash']
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
}, [{ timestamps: true }])


//chi tiet thanh toan
const detailPayment = new mongoose.Schema({
    cars: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car'
    },
    amountCar: Number,
    totalAmount: {
        type: Number
    }
}, [{ timestamps: true }])

// danh gia
const commentSchema = new mongoose.Schema({
    cars: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Xe',
    },
    userID: {
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
