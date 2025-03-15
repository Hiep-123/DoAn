const { Car } = require('../model/model'); // Ensure this path is correct
const mongoose = require('mongoose'); // Import mongoose for ObjectId validation

exports.createCar = async (req, res) => {
  try {
    const car = new Car(req.body);
    await car.save();
    res.status(201).send(car);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getAllCars = async (req, res) => {
  try {
    const cars = await Car.find().populate('brandId');
    res.send(cars);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getCarById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send('Invalid ID format');
  }

  try {
    const car = await Car.findById(id).populate('brandId', 'nameBrandCar');
    if (!car) return res.status(404).send('Car not found');
    res.status(200).json(car);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!car) return res.status(404).send('Car not found');
    res.send(car);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) return res.status(404).send('Car not found');
    res.send(car);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getSortedCars = async (req, res) => {
  const { sortId, showId } = req.query;

  let sortOrder = {};

  let limit = 0;

  // 🟢 Xử lý sắp xếp theo sortId
  if (sortId === "1") {
    sortOrder = { pricePerDay: 1 };    // Giá tăng dần
  } else if (sortId === "2") {
    sortOrder = { pricePerDay: -1 };   // Giá giảm dần
  } else if (sortId === '0') {
    sortOrder = {};                    // Không sắp xếp
  } else {
    console.log("⚠️ sortId không hợp lệ:", sortId);
    return res.status(400).json({ error: "Invalid sortId" });
  }

  // 🟢 Xử lý giới hạn số sản phẩm theo showId
  if (showId === '8') {
    limit = 8;
  } else if (showId === '12') {
    limit = 12;
  } else if (showId === 'all') {
    limit = 0;  // Lấy tất cả sản phẩm
  } else {
    console.log("⚠️ showId không hợp lệ:", showId);
    return res.status(400).json({ error: "Invalid showId" });
  }

  try {
    // 🟢 Gọi MongoDB với sắp xếp và giới hạn
    const query = Car.find().sort(sortOrder);
    if (limit > 0) query.limit(limit);  // 🟢 Nếu limit > 0 thì áp dụng giới hạn

    const cars = await query.exec();    // 🟢 Thực thi query
    res.status(200).json(cars);
  } catch (error) {
    console.error("🔥 Lỗi truy vấn MongoDB:", error);
    res.status(500).json({ error: error.message });
  }
};
