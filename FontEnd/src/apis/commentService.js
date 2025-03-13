import axiosClient from "./axiosClient";

const addComment = async (data) => {
    return await axiosClient.post('/comment/', data);
};

export { addComment }