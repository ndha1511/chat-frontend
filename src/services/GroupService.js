import requestApi from "../utils/Request";

export const getGroupById = async (id) => {
    try {
        const response = await requestApi(`/groups/${id}`, "GET", [], true);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}
export const getUserGroupById = async (id) => {
    try {
        const response = await requestApi(`/groups/members/${id}`, "GET", [], true);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const addGroup = async (data) => {
    try {
        const response = await requestApi("/groups", "POST", data, true, "multipart/form-data");
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const addMember = async (data) => {
    try {
        const response = await requestApi("/groups/addMember", "POST", data, true);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const leaveGroup = async (data) => {
    try {
        const response = await requestApi("/groups/leaveGroup", "PUT", data, true);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const removeGroup = async (data) => {
    try {
        const response = await requestApi("/groups/remove", "DELETE", data, true);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}
