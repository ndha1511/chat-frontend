import requestApi from "../utils/Request";

export const getFriendRequest = async (email) => {
    try {
        const response = await requestApi("/friends/get-friend-request/" + email, "POST", [], true);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const getFriendRequestBySender = async (email) => {
    try {
        const response = await requestApi("/friends/get-friend-request-by-sender-id/" + email, "POST", [], true);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const rejectFriendRequest = async (data) => {
    try {
        const response = await requestApi("/friends/reject", "POST", data, true);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const acceptFriendRequest = async (data) => {
    try {
        const response = await requestApi("/friends/accept", "POST", data, true);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}