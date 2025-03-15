const bcrypt = require("bcryptjs");
const { User, Account } = require("../model/model");
require("dotenv").config();
const jwt = require("jsonwebtoken");
// 🟢 API Đăng ký tài khoản
exports.register = async (req, res) => {
    try {
        const { userName, password } = req.body;

        // 🟢 Kiểm tra userName có tồn tại chưa
        const existingAccount = await Account.findOne({ userName });
        if (existingAccount) {
            return res.status(400).json({ error: "Tên đăng nhập đã tồn tại!" });
        }

        // Tạo User trước, tạm dùng userName làm name
        const newUser = new User({
            name: userName,
            email: req.body.email || undefined
        });
        await newUser.save();

        // 🟢 Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);

        // 🟢 Tạo tài khoản (Account) liên kết với User vừa tạo
        const newAccount = new Account({
            userId: newUser._id,
            userName,
            password: hashedPassword
        });

        await newAccount.save();

        res.status(201).json({ message: "Đăng ký thành công!" });
    } catch (error) {
        console.error("🔥 Lỗi đăng ký:", error);
        res.status(500).json({ error: "Lỗi server" });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Tìm tài khoản theo email
        const userAccount = await Account.findOne({ userName: email });

        if (!userAccount) {
            return res.status(400).json({ error: "Email hoặc mật khẩu không đúng" });
        }


        // Kiểm tra mật khẩu
        const isPasswordValid = await bcrypt.compare(password, userAccount.password);

        if (!isPasswordValid) {
            return res.status(400).json({ error: "Email hoặc mật khẩu không đúng" });
        }

        // Lấy thông tin user
        const user = await User.findById(userAccount.userId);
        if (!user) {
            return res.status(400).json({ error: "Thông tin tài khoản không hợp lệ" });
        }

        // Tạo JWT token
        const token = jwt.sign({ userId: user._id }, "secretKey", { expiresIn: "1h" });

        // Trả về kết quả
        res.status(200).json({
            message: "Đăng nhập thành công", token, user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone
            }
        });
    } catch (error) {
        console.error("🔥 Lỗi đăng nhập:", error);
        res.status(500).json({ error: error.message });
    }
};


exports.updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const { name, email, phone } = req.body;

        const updatedUser = await User.findByIdAndUpdate(userId, { name, email, phone }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ message: "Profile updated successfully", user: updatedUser });

    } catch (error) {
        console.error("🔥 Lỗi cập nhật Profile:", error);
        res.status(500).json({ error: error.message });
    }
};

exports.getUserInfo = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ error: "User không tồn tại" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("🔥 Lỗi lấy thông tin User:", error);
        res.status(500).json({ error: error.message });
    }
};
