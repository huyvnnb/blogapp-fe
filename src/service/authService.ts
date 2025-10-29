import axiosClient from "./axiosClient";

export const authService = {
    login: async (username: string, password: string) => {
        const response = await axiosClient.post("/auth/login", { username, password });
        return response.data.data;
    },

    register: async (username: string, password: string, display_name: string) => {
        await axiosClient.post("/auth/register", { username, password, display_name });
        return true;
    },

    refresh: async () => {
        const response = await axiosClient.post("/auth/refresh");
        return response.data.data;
    },

    logout: async () => {
        const response = await axiosClient.post("/auth/logout");
        return response.data.data;
    }
};