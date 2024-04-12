import requestApi from "../utils/Request";

export const getGroupById = async (id) => {
    try {
        const response = await requestApi(`/groups/${id}`, "GET", [], true);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}