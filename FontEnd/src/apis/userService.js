import axiosClient from "./axiosClient";

// Lấy danh sách tất cả người dùng
export const getUsers = async () => {
    return await axiosClient.get("/user"); // Endpoint lấy danh sách người dùng
};

// Thêm người dùng mới
export const registerAuth = async (data) => {
    return await axiosClient.post("/user", data); // Endpoint thêm người dùng
};

// Cập nhật thông tin người dùng
export const updateInfoUser = async (id, data) => {
    return await axiosClient.put(`/user/${id}`, data); // Endpoint cập nhật người dùng
};

// Xóa người dùng
export const deleteUser = async (id) => {
    return await axiosClient.delete(`/user/${id}`); // Endpoint xóa người dùng
};