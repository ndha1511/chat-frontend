import requestApi from "../utils/Request";

export const claimOtpByEmail = async (emailRequest) => {
    try {
        const response = await requestApi("/auth/sendOtpResetPassword", "POST", emailRequest, false);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const validOtpForResetPassword = async (otpRequest) => {
    try {
        const response = await requestApi("/auth/validOtp", "POST", otpRequest, false);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const resetPassword = async (resetPasswordRequest) => {
    try {
        const response = await requestApi("/auth/resetPassword", "POST", resetPasswordRequest, false);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const changePassword = async (changePasswordRequest) => {
    try {
        const response = await requestApi("/users/changePassword", "POST", changePasswordRequest, true);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}