const bcrypt = require("bcryptjs");
const { User } = require("../model/model");
require("dotenv").config();
const jwt = require("jsonwebtoken");

//API đăng ký tài khoản
exports.register = async (req, res) => {
    try {
        const { userName, password, email, phone } = req.body;
        console.log(req.body)

        if (!userName || !password) {
            return res.status(400).json({ error: "Tên đăng nhập và mật khẩu không được để trống!" });
        }

        // Kiểm tra userName có tồn tại chưa
        const existingUser = await User.findOne({ name: userName });
        if (existingUser) {
            return res.status(400).json({ error: "Tên đăng nhập đã tồn tại!" });
        }

        // 🟢 Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);

        // 🟢 Tạo User mới
        const newUser = new User({
            userName,
            password: hashedPassword,
            email: email || "", // Tránh undefined
            name: userName, // 🔥 Đảm bảo name luôn có giá trị
            phone: phone
        });

        await newUser.save();

        res.status(201).json({ message: "Đăng ký thành công!" });
    } catch (error) {
        console.error("🔥 Lỗi đăng ký:", error); // In lỗi chi tiết ra console
        res.status(500).json({ error: error.message }); // Trả về thông báo lỗi thực tế
    }

};


// 🟢 API Đăng nhập
exports.login = async (req, res) => {
    try {
        const { userName, password, email } = req.body;
        console.log(userName, password)
        // 🟢 Tìm user theo userName
        const user = await User.findOne({ userName });
        console.log(user)
        if (!user) {
            return res.status(400).json({ error: "Tên đăng nhập hoặc mật khẩu không đúng" });
        }

        // 🟢 Kiểm tra mật khẩu
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: "Tên đăng nhập hoặc mật khẩu không đúng" });
        }


        // 🟢 Tạo JWT token
        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // 🟢 Trả về kết quả
        res.status(200).json({
            message: "Đăng nhập thành công",
            token,
            user: {
                _id: user._id,
                userName: user.userName,
                email: user.email,
                phone: user.phone,
                role: user.role
            }
        });
    } catch (error) {
        console.error("🔥 Lỗi đăng nhập:", error);
        res.status(500).json({ error: error.message });
    }
};


// 🟢 API Cập nhật thông tin người dùng
exports.updateUser = async (req, res) => {
    try {
        const { userName, email, phone, name, role } = req.body;
        console.log(req.body)
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { userName, email, phone, name, role }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ error: "User không tồn tại" });
        }

        res.status(200).json({ message: "Cập nhật thành công", user: updatedUser });
    } catch (error) {
        console.error("🔥 Lỗi cập nhật Profile:", error);
        res.status(500).json({ error: error.message });
    }
};

// 🟢 API Lấy thông tin người dùng
exports.getUserInfo = async (req, res) => {
    try {
        const { id } = req.params;

        // 🟢 Tìm user (bao gồm cả role)
        const user = await User.findById(id).populate('bookingId');

        if (!user) {
            return res.status(404).json({ error: "User không tồn tại" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("🔥 Lỗi lấy thông tin User:", error);
        res.status(500).json({ error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).send('User not found');
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
}
