const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
var bodyParser = require('body-parser')
const morgan = require('morgan')
const dotenv = require('dotenv')

const carRouter = require('./routes/car')
const brandCarRouter = require('./routes/brandCar')
const bookingRouter = require('./routes/booking');
const paymentRouter = require('./routes/payment');
const commentRouter = require('./routes/comment')
const authorRouter = require('./routes/user')
dotenv.config()

app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors())
app.use(morgan("common"))

mongoose.connect((process.env.MONGODB_URL))
    .then(() => console.log('MongoDB connected successfully'))
    .catch((error) => {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    });

app.use('/api/car', carRouter)

app.use('/api/brandCar', brandCarRouter)
app.use('/api/bookings', bookingRouter);
app.use('/api/payments', paymentRouter);
app.use('/api/comment', commentRouter)
app.use('/api/user',authorRouter)
app.listen(8080, () => {
    console.log("Server is running")
})

