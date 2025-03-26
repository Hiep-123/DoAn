import axiosClient from "./axiosClient";

const getBookings = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching bookings:', error);
        throw error;
    }
};

const createBooking = async (booking) => {
    try {
        const response = await axios.post(API_URL, booking);
        return response.data;
    } catch (error) {
        console.error('Error creating booking:', error);
        throw error;
    }
};

const updateBooking = async (id, booking) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, booking);
        return response.data;
    } catch (error) {
        console.error('Error updating booking:', error);
        throw error;
    }
};

const deleteBooking = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error('Error deleting booking:', error);
        throw error;
    }
};
