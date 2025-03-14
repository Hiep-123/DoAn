const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.authMiddleware = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ error: "Không có token, truy cập bị từ chối!" });
    }

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        req.user = decoded;  // Gán userId và role vào req
        next();
    } catch (error) {
        res.status(401).json({ error: "Token không hợp lệ!" });
    }
};
