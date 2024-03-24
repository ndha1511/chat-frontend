import requestApi from "../utils/Request";

export const sendMessageToUser = async (message) => {
    try {
        const response = await requestApi("/messages/chat", "POST", message, true);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}