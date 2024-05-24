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

export const addAdmin = async (data) => {
    try {
        const response = await requestApi("/groups/addAdmin", "PUT", data, true);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }

}

export const removeAdmin = async (data) => {
    try {
        const response = await requestApi("/groups/removeAdmin", "PUT", data, true);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const removeMember = async (data) => {
    try {
        const response = await requestApi("/groups/removeMember", "POST", data, true);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const updateSendMessagePermission = async (data) => {
    try {
        const response = await requestApi("/groups/updateSendMessagePermission", "PUT", data, true);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const findGroupBySenderId = async (id) => {
    try {
        const response = await requestApi("/groups?senderId=" + id, "GET", [], true);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

//  data {
//     "avatar": "path",
//     "groupName": String
//  }
export const updateGroup = async (id, data) => {
    try {

        const response = await requestApi(`/groups/${id}`, "PATCH", data, true);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}
