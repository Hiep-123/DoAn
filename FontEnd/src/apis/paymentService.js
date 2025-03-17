import axiosClient from "./axiosClient";

const addPayment = async (data) => {
    return await axiosClient.post('/payments/', data);
};

export { addPayment }; 