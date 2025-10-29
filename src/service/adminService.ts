import type { PostStatus } from "@/interface/posts";
import axiosClient from "./axiosClient"

export const adminService = {
    login: async (username: string, password: string) => {
        const response = await axiosClient.post("/admin/login", {username, password})
        return response.data.data
    },

    getAllUsers: async () => {
        const response = await axiosClient.get("/admin/users");
        return response.data.data
    },

    getUserById: async (id: string) => {
        const response = await axiosClient.get(`/admin/users/${id}/`);
        return response.data.data
    },

    updatePostStatus: async (id: string, status: PostStatus) => {
        const response = await axiosClient.patch(`/admin/posts/${id}/status`, {status})
        return response.data.data
    },

    getPendingPost: async () => {
        const response = await axiosClient.get("/admin/posts/pending");
        return response.data.data;
    },
    
    getPostDetail: async (id: string) => {
        const response = await axiosClient.get(`/admin/posts/${id}`);
        return response.data.data;
    },

    deletePost: async (id: string) => {
        const response = await axiosClient.delete(`/admin/posts/${id}/`);
        return response.data.data;
    }
}