const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const { User } = require("../model/model");
const { register, login, getUserInfo, updateUser } = require("../controllers/authorController");
const router = express.Router();


router.post("/register", register);
router.post("/login", login);

// 🟢 API lấy danh sách người dùng (cần đăng nhập)
router.get("/users", authMiddleware, async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error("🔥 Lỗi lấy danh sách người dùng:", error);
        res.status(500).json({ error: "Lỗi server" });
    }
});
router.get("/getInfo/:id", getUserInfo);
router.put("/updateUser/:userId", updateUser);

module.exports = router;
