const { BrandCar } = require("../model/model");

const brandCarController = {
    // 🟢 Thêm hãng xe
    addBrandCar: async (req, res) => {
        try {
            const newBrandCar = new BrandCar(req.body);
            const savedBrandCar = await newBrandCar.save();
            res.status(200).json(savedBrandCar);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // 🟢 Lấy tất cả hãng xe
    getAllBrandCar: async (req, res) => {
        try {
            const allBrandCar = await BrandCar.find();
            res.status(200).json(allBrandCar);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // 🟢 Lấy một hãng xe theo ID
    getBrandCarById: async (req, res) => {
        try {
            const { id } = req.params;
            const brandCar = await BrandCar.findById(id);
            if (!brandCar) {
                return res.status(404).json({ error: "Hãng xe không tồn tại" });
            }
            res.status(200).json(brandCar);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // 🟢 Cập nhật thông tin hãng xe
    updateBrandCar: async (req, res) => {
        try {
            const updatedBrand = await BrandCar.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            );

            if (!updatedBrand) {
                return res.status(404).json({ error: "Không tìm thấy dòng xe" });
            }

            res.status(200).json(updatedBrand);
        } catch (error) {
            console.error("Lỗi khi cập nhật:", error);
            res.status(400).json({ error: error.message });
        }
    },

    // 🟢 Xóa hãng xe
    deleteBrandCar: async (req, res) => {
        try {
            const { id } = req.params;
            const deletedBrandCar = await BrandCar.findByIdAndDelete(id);
            if (!deletedBrandCar) {
                return res.status(404).json({ error: "Hãng xe không tồn tại" });
            }
            res.status(200).json({ message: "Xóa thành công" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = brandCarController;
