import requestApi from "../utils/Request";


export const getMessageByRoomId = async (senderId, roomId, page = 0, limit = 40) => {

    try {
        const response = await requestApi(`/messages/${roomId}?senderId=${senderId}&page=${page}&limit=${limit}`, "GET", [], true);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const getMessageByRoomIdV2 = async (senderId, roomId, page = 0, limit = 40) => {
    try {
        const response = await requestApi(`/messages/v2/${roomId}?senderId=${senderId}&page=${page}&limit=${limit}`, "GET", [], true);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const revokeMessage = async (object) => {
    try {
        const response = await requestApi(`/messages/revokeMessage`, "POST", object,true);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const fowardMessage = async (object) => {
    try {
        const response = await requestApi(`/messages/forwardMessage`, "POST", object,true);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const callRequest = async (data) => {
    try {
        const response = await requestApi(`/messages/callRequest`, "POST", data, true);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}