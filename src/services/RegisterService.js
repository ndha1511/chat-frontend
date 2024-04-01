import requestApi from "../utils/Request";

export const register = async ({ phoneNumber,email, name, gender, dateOfBirth, password,confirmpassword }) => {

    if (password !== confirmpassword) {
        return Promise.reject(new Error("Mật khẩu và nhập lại mật khẩu không giống nhau."));
    }
    const userData = {
        phoneNumber:phoneNumber.trim(),
        email,
        name,
        gender,
        dateOfBirth,
        password
    };
    console.log(userData)
    try {
        const response = await requestApi("/auth/register", "POST", userData, false);
        const token = response.data;
        return response.data;
    } catch (error) {

        return Promise.reject(error);
    }
};



export const sendOtp = async (email) => {
    try {
        const response = await requestApi("/auth/sendOtp", "POST",  email , false);

        return response.data;
    } catch (error) {

        return Promise.reject(error);
    }
};

export const verifyOtp = async (otpValidRequest) => {
    try {
        const response = await requestApi("/auth/verifyOtp", "POST", otpValidRequest, false);

        return response.data;
    } catch (error) {

        return Promise.reject(error);
    }
};
