import requestApi from "../utils/Request";

export const notify = async (request) => {
    try {
        const response = await requestApi("/notify/user", "POST", request, true);
        return response.data;
    } catch (error) {
        Promise.reject(error);
    }
}