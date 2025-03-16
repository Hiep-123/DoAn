import axiosClient from "./axiosClient";

const addBooking = async (data) => {
    return await axiosClient.post('/bookings/', data);
}

const getBookingId = async (id) => {
    return await axiosClient.get(`/bookings/${id}`)
}
export { addBooking, getBookingId }; 
