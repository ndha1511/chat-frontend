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

export const sendImgaeGroup = async (data) => {
    try {
        const response = await requestApi("/messages/saveImageGroup", "POST", data, true, "multipart/form-data");
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const seenMessage = async (data) => {
    try {
        const response = await requestApi("/messages/seenMessage", "POST", data, true);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}