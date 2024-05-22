import requestApi from "../utils/Request";


export const getMessageByRoomId = async (senderId, roomId, page = 0, limit = 100) => {

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

export const acceptCallRequest = async (data) => {
    try {
        const response = await requestApi(`/messages/acceptCallRequest/${data}`, "GET", [], true);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const rejectCallRequest = async (data) => {
    try {
        const response = await requestApi(`/messages/rejectCallRequest/${data}`, "GET", [], true);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const closeCall = async (data) => {
    try {
        const response = await requestApi(`/messages/closeCall/${data}`, "GET", [], true);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const findMessage = async (roomId, content, currentId, senderId = "", startDate = "", endDate = "", page = 0, limit = 40) => {
    try {
        const response = await requestApi(`/messages/query?roomId=${roomId}&senderId=${senderId}&content=${content}&currentId=${currentId}&startDate=${startDate}&endDate=${endDate}&page=${page}&limit=${limit}`, "GET", [], true);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const receiveMessage = async (message) => {
    try {
        const response = await requestApi(`/messages/receiveMessage`, "PUT", message, true);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}