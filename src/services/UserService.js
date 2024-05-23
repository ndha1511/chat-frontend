import requestApi from "../utils/Request"

export const getUserInfo = async (phoneNumber) => {
    try {
        const response = await requestApi(`/users/${phoneNumber}`, "GET", [], true);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
    
}

export const getUserByEmail = async (email) => {
    try {
        const response = await requestApi(`/users/email/${email}`, "GET", [], true);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
    
}



export const updateUser = async (newUser) => {
    try {
        const response = await requestApi(`/users/updateUser`, "PUT", newUser, true);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const blockUser = async (data) => {
    try {
        const response = await requestApi(`/users/blockUser`, "PUT", data, true);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const unblockUser = async (data) => {
    try {
        const response = await requestApi(`/users/unblockUser`, "PUT", data, true);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const getBlocksUser = async (userId) => {
    try {
        const response = await requestApi(`/users/blocks/${userId}`, "GET", [], true);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}