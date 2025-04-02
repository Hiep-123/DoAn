import axiosClient from "./axiosClient";

export const getPayments = async () => {
    return await axiosClient.get("/payments");
};

export const createPayment = async (data) => {
    return await axiosClient.post("/payments", data);
};

export const updatePayment = async (id, data) => {
    return await axiosClient.put(`/payments/${id}`, data);
};

export const deletePayment = async (id) => {
    return await axiosClient.delete(`/payments/${id}`);
};
