import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if(error.response?.status === 401 && !originalRequest._retry){
            originalRequest._retry = true;
            try {
                const response = await axios.post(
                    "http://localhost:5000/auth/refresh",
                    {},
                    { withCredentials: true }
                )
                const newToken = response.data.data.token;
                localStorage.setItem("token", newToken);

                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return axiosClient(originalRequest);
            } catch (error){
                console.error("Refresh token failed:", error);
                localStorage.removeItem("token");
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
)

export default axiosClient;