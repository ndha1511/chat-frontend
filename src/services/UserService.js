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
