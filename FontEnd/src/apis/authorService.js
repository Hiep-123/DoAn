import axiosClient from "./axiosClient";

const loginAuth = async (data) => {
    return await axiosClient.post('/user/login', data);
};
const registerAuth = async (data) => {
    return await axiosClient.post('/user/register', data);
}
export { loginAuth, registerAuth }; 