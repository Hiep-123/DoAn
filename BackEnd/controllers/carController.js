const { Car, BrandCar } = require("../model/model")

const carController = {
    addCar: async (req, res) => {
        try {
            const newCar = new Car(req.body);
            const saveCar = await newCar.save();

            res.status(200).json(saveCar);

        } catch (error) {
            res.status(500).json(error);
        }
    },

    getCar: async (req, res) => {
        try {
            const getAllCar = await Car.find().populate('brandCars')
            res.status(200).json(getAllCar)
        } catch (err) {
            res.status(500).json(err)
        }
    }
}


module.exports = carController;