import requestApi from "../utils/Request";

export const getMessageByRoomId = async (roomId, page = 0, limit = 40) => {
    try {
        const response = await requestApi(`/messages/${roomId}?page=${page}&limit=${limit}`, "GET", [], true);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}