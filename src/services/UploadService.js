import requestApi from "../utils/Request";

export const uploadImage = async (image) => {
    try {
        const response = await requestApi("/uploads/upload", "POST", image, true, "multipart/form-data");
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}