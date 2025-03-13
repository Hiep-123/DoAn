const bcrypt = require("bcryptjs");
const { User, Account } = require("../models/model");
require("dotenv").config();

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
        const newUser = new User({ name: userName });
        await newUser.save();

        // 🟢 Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);

        // 🟢 Tạo tài khoản (Account) liên kết với User vừa tạo
        const newAccount = new Account({
            userID: newUser._id,
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

// API Đăng ký tài khoản
exports.login = async (req, res) => {
    try {
        const { userName, password } = req.body;

        // 🟢 Kiểm tra tài khoản có tồn tại không
        const account = await Account.findOne({ userName }).populate("userID");

        if (!account) {
            return res.status(400).json({ error: "Invalid username or password" });
        }


        // 🟢 Kiểm tra mật khẩu
        const isMatch = await bcrypt.compare(password, account.password);

        if (!isMatch) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        // 🟢 Tạo JWT Token
        const token = jwt.sign(
            { userId: account.userId._id, role: account.role }, process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES }
        );

        // 🟢 Trả về thông tin user & token
        res.status(200).json({
            message: "Đăng nhập thành công!",
            token,
            user: {
                id: account.userId._id,
                name: account.userID.name,
                email: account.userID.email,
                phone: account.userID.phone,
                userName: account.userName,
                role: account.role
            }
        });
    } catch (error) {
        console.error("🔥 Lỗi đăng nhập:", error);
        res.status(500).json({ error: "Lỗi server" });
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
