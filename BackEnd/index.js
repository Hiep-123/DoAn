const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
var bodyParser = require('body-parser')
const morgan = require('morgan')
const dotenv = require('dotenv')
const carRouter = require('./routes/car')
const brandCarRouter = require('./routes/brandCar')
const bookingRouter = require('./booking');
app.use('/api/bookings', bookingRouter);
const paymentRouter = require('./payment');
app.use('/api/payments', paymentRouter);
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

app.use('/v1/car', carRouter)
app.use('/v1/brandCar', brandCarRouter)


app.listen(8000, () => {
    console.log("Server is running")
})

