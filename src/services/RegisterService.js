import requestApi from "../utils/Request";

export const register = async ({ phoneNumber, name, gender, dateOfBirth, password,confirmpassword }) => {

    if (password !== confirmpassword) {
        return Promise.reject(new Error("Mật khẩu và nhập lại mật khẩu không giống nhau."));
    }
    const userData = {
        phoneNumber:phoneNumber.trim(),
        name,
        gender,
        dateOfBirth,
        password
    };
    console.log(userData)
    try {
        const response = await requestApi("/auth/register", "POST", userData, 'json', false);
        const token = response.data;
        localStorage.setItem("token", JSON.stringify(token));
        return response.data;
    } catch (error) {

        return Promise.reject(error);
    }
};
