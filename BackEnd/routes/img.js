const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// Cấu hình lưu file (lưu vào thư mục "uploads/")
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Thư mục lưu file
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Đổi tên file
  },
});

const upload = multer({ storage: storage });

// API Upload Ảnh
router.post("/", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Không có file nào được tải lên!" });
  }

  const imageUrl = `http://localhost:8080/uploads/${req.file.filename}`;
  res.json({ imageUrl });
});

module.exports = router;
