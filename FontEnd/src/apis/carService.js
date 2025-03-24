import axiosClient from "./axiosClient";

const addCar = async (data) => {
    return await axiosClient.post('/car', data)
}
const getAllCar = async (page = 1, limit = 6) => {
    return await axiosClient.get(`/car?page=${page}&limit=${limit}`);
};
const getCar = async (query) => {
    const { sortId, showId } = query
    const res = await axiosClient.get(`/car/sorted?sortId=${sortId}&showId=${showId}`);
    return res.data;
}

const getbyIdCar = async (id) => {
    return await axiosClient.get(`/car/${id}`)
}

const updateCar = async (id, data) => {
    return await axiosClient.put(`/car/${id}`, data)
}
const deleteCar = async (id) => {
    return await axiosClient.delete(`/car/${id}`)
}

const addBrandCar = async (data) => {
    return await axiosClient.post('/brandCar', data)
}
const getAllBrandCar = async () => {
    return await axiosClient.get(`/brandCar/`)
}
const getBrandCarId = async (id) => {
    return await axiosClient.get(`/brandCar/${id}`)
}
const updateBrandCar = async (id, data) => {
    return await axiosClient.put(`/brandCar/${id}`, data)
}
const deleteBrandCarId = async (id) => {
    return await axiosClient.delete(`/brandCar/${id}`)
}

export { addCar, getAllCar, getCar, getbyIdCar, updateCar, deleteCar, getAllBrandCar, getBrandCarId, updateBrandCar, deleteBrandCarId, addBrandCar }; 