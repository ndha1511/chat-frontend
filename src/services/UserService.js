import requestApi from "../utils/Request"

export const getUserInfo = async (phoneNumber) => {
    try {
        const response = await requestApi(`/users/${phoneNumber}`, "GET", [], true);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
    
}