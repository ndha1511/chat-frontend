import requestApi from "../utils/Request";

export const sendMessageToUser = async (message) => {
    try {
        const response = await requestApi("/messages/chat", "POST", message, true, "multipart/form-data");
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}
export const sendFriendRequest = async (data) => {
    try {
        const response = await requestApi("/friends/add", "POST",data , true);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}