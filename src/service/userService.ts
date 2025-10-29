import type { UserCreate } from "../interface/users";
import axiosClient from "./axiosClient";

export const userService = {
    getAllUsers: async () => {
        const response = await axiosClient.get("/users");
        return response.data.data;
    },  

    getUserById: async (id: string) => {
        const response = await axiosClient.get(`/users/${id}/`);
        return response.data.data;
    },

    createUser: async (data: UserCreate) => {
        const response = await axiosClient.post("/users", data);
        return response.data.data;
    },

    getProfile: async () => {
        const response = await axiosClient.get("/users/me");
        return response.data.data
    },

    getMyArticles: async () => {
        const response = await axiosClient.get("/posts/articles");
        return response.data.data
    },

    getEffectiveUser: async () => {
        const response = await axiosClient.get("/users/effective");
        return response.data.data
    }
};