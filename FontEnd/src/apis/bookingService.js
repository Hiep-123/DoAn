import axiosClient from "./axiosClient";

const addBooking = async (data) => {
    return await axiosClient.post('/bookings/', data);
}

export { addBooking }; 
