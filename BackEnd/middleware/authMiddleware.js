const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.authMiddleware = (req, res, next) => {
    const token = req.header("Authorization");
    console.log("Token nhận được từ client:", token); // Log token

    if (!token) {
        return res.status(401).json({ error: "Không có token, truy cập bị từ chối!" });
    }

    try {
        const rawkey = token.split(" ")[1]; // Lấy token sau "Bearer"
        console.log("Token sau khi cắt:", rawkey); // Log token sau khi cắt để kiểm tra

        // Xác thực token với JWT Secret
        jwt.verify(rawkey, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                // Token không hợp lệ
                console.log("Token không hợp lệ:", err.message); // Log lỗi token không hợp lệ
                return res.status(403).json({ error: "Token không hợp lệ!" });
            }

            // Token hợp lệ, tiếp tục xử lý
            console.log("Token hợp lệ:", user); // Log thông tin người dùng
            req.user = user; // Gán thông tin người dùng vào req
            next();
        });
    } catch (error) {
        // Xử lý lỗi chung, nếu có lỗi khác
        console.log("Lỗi xác thực:", error.message);
        return res.status(401).json({ error: "Token không hợp lệ!" });
    }
};
