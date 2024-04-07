import requestApi from "../utils/Request";

export const downFile = async (fileKey) => {
    try {
        const response = await requestApi(`/files/download/${fileKey}`, "GET", [], true);
        return response.data;
    } catch (error) {
        Promise.reject(error);
    }
}