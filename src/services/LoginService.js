import requestApi from "../utils/Request"

export const login = async (phoneNumber, password) => {
    const body = {
        phoneNumber, password
    }
    try {
        const response = await requestApi("/auth/login", "POST", body, false);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }

}

export const checkLogin = () => {
    const user = localStorage.getItem("user");
    if(user) {
        return JSON.parse(user);
    } else {
        return false;
    }
}

