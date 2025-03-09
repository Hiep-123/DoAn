const { BrandCar } = require("../model/model")

const brandCarController = {
    addBrandCar: async (req, res) => {
        try {
            const newBrandCar = new BrandCar(req.body)
            const saveBrandCar = await newBrandCar.save();
            res.status(200).json(saveBrandCar)
        } catch (error) {
            res.status(500).json(err)
        }
    },
}


module.exports = brandCarController;