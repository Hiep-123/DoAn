import axiosClient from "./axiosClient";

// Thêm booking mới
const addBooking = async (data) => {
    return await axiosClient.post('/bookings/', data);
}

// Lấy thông tin booking theo ID
const getBookingId = async (id) => {
    return await axiosClient.get(`/bookings/${id}`)
}

// Lấy danh sách tất cả bookings
const getBookings = async () => {
    try {
        const response = await axiosClient.get('/bookings/');
        return response.data;
    } catch (error) {
        console.error("Error fetching bookings:", error);
        throw error;
    }
};

// Tạo booking mới
const createBooking = async (booking) => {
    try {
        const response = await axiosClient.post('/bookings/', booking);
        return response.data;
    } catch (error) {
        console.error("Error creating booking:", error);
        throw error;
    }
};

// Cập nhật booking theo ID
const updateBooking = async (id, data) => {
    try {
        const response = await axiosClient.put(`/bookings/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("Error updating booking:", error);
        throw error;
    }
};

// Xóa booking theo ID
const deleteBooking = async (id) => {
    try {
        const response = await axiosClient.delete(`/bookings/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting booking:", error);
        throw error;
    }
};

export { deleteBooking, updateBooking, createBooking, getBookings, addBooking, getBookingId };