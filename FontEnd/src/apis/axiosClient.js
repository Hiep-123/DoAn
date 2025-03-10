import axios from "axios";
import Cookies from "js-cookie";

const axiosClient = axios.create({
    baseURL: 'http://localhost:8080/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// axiosClient.interceptors.request.use(async (config) => {

//     const token = Cookies.get('token')
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`
//     }
//     return config;
// }, (err) => {
//     return Promise.reject(err)
// })

// axiosClient.interceptors.response.use((res) => {

//     return res
// }, async (err) => {
//     const orginalRequest = err.config
//     if (err.response.status === 401 && !orginalRequest._retry) {
//         orginalRequest._retry = true;

//         const refreshToken = Cookies.get('refreshToken');
//         if (!refreshToken) return Promise.reject(err);

//         try {
//             const res = await axiosClient.post('/refresh-token', { token: refreshToken })
//             const newAccessToken = res.data.accessToken
//             Cookies.set('token', newAccessToken)
//             orginalRequest.headers.Authorization = `Bearer ${newAccessToken}`

//             return axiosClient(orginalRequest)
//         } catch (error) {
//             Cookies.remove('token');
//             Cookies.remove('refreshToken');
//             return Promise.reject(err);
//         }
//     }
// })

export default axiosClient;