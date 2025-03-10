import axiosClient from "./axiosClient";

const getAllCar = async (data) => {
    return await axiosClient.get('/car/', data);
};
const getCar = async (query) => {
    const { sortId, showId } = query

    const res = await axiosClient.get(`/car/sorted?sortId=${sortId}&showId=${showId}`);
    return res.data;
}
export { getAllCar, getCar }; 