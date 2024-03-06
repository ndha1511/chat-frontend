import requestApi from "../utils/Request"

export const login = async (phoneNumber, password) => {
    const body = {
        phoneNumber, password
    }
    try {
        const response = await requestApi("/auth/login", "POST", body, false);
        const token = response.data;
        localStorage.setItem("token", JSON.stringify(token));
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const getUserInfo = async (phoneNumber) => {
    
}