import axios from 'axios'

export default function requestApi(endpoint, method, body, responseType = 'json', isInterceptors) {
    const headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    }
    const token = sessionStorage.getItem('token');
    const instance = axios.create({ headers, baseURL: "http://localhost:8080/api/v1" });

    if (isInterceptors) {
        instance.interceptors.request.use(
            (config) => {
                if (token) {
                    const { token } = JSON.parse(token);
                    config.headers['Authorization'] = `Bearer ${token}`
                }
                return config;
            },
            (error) => {
                return Promise.reject(error)
            }
        );

        instance.interceptors.response.use(
            (response) => {
                return response
            },
            async (error) => {
                const originalConfig = error.config;
                console.log("Access token expired")
                if (error.response && error.response.status === 403) {
                    try {
                        console.log("call refresh token api")
                        if (token) {
                            const { refreshToken } = JSON.parse(token);
                            const result = await instance.post(`/auth/refreshToken`, { refreshToken })
                            const newToken = result.data;
                            localStorage.setItem('token', JSON.stringify(newToken));
                            originalConfig.headers['Authorization'] = `Bearer ${newToken.token}`;

                            return instance(originalConfig);
                        }

                    } catch (err) {
                        if (err.response && err.response.status === 400) {
                            localStorage.removeItem('token')

                            window.location.href = '/login'
                        }
                        return Promise.reject(err)
                    }
                }
                return Promise.reject(error)
            }
        )
    }

    return instance.request({
        method: method,
        url: `${endpoint}`,
        data: body,
        responseType: responseType
    })
}