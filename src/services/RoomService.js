import requestApi from "../utils/Request";

export const getRoomsBySenderId = async (senderId) => {
    try {
        const response = await requestApi(`/rooms/all/${senderId}`, "GET", [], true);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}