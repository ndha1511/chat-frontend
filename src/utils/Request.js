import axios from 'axios'

export default function requestApi(endpoint, method, body, isInterceptors) {
    const headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    }
    const token = localStorage.getItem('token');
    const instance = axios.create({ headers, baseURL: "http://localhost:8080/api/v1" });

    if (isInterceptors) {
        instance.interceptors.request.use(
            (config) => {
                if(!config.url.includes("/refreshToken")) {
                    if (token) {
                        const tokenRequest = JSON.parse(token);
                        config.headers['Authorization'] = `Bearer ${tokenRequest.token}`;
                        console.log(config.headers['Authorization'])
                    }
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
                        
                        if (token) {
                            const tokenRequest = JSON.parse(token);
                            const result = await instance.post(`/auth/refreshToken`, { refreshToken: tokenRequest.refreshToken })
                            const newToken = result.data;
                            localStorage.setItem('token', JSON.stringify(newToken));
                            console.log("set new token", newToken);
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
        responseType: 'json'
    })
}