import type { PostCreate, PostUpdate } from "../interface/posts";
import axiosClient from "./axiosClient";


export const postService = {
    // fetchPosts: async () => {
    //     const response = await axiosClient.get("/posts");
    //     return response.data.data;
    // },

    fetchPostById: async (id: string) => {
        const response = await axiosClient.get(`/posts/${id}/`);
        return response.data.data;
    },

    fetchPostsByUserId: async (userId: string) => {
        const response = await axiosClient.get(`/users/${userId}/posts`);
        return response.data.data;
    },

    publishPost: async (post: PostCreate) => {
        const response = await axiosClient.post("/posts/", post)
        return response.data.data
    },

    updatePost: async (id: string, post: PostUpdate) => {
        console.log("Post: ", post);
        const response = await axiosClient.put(`/posts/${id}/`, post);
        return response.data.data;
    },

    deletePost: async (id: string) => {
        await axiosClient.delete(`/posts/${id}/`);
    },

    getPrivateArticles: async () => {
        const response = await axiosClient.get("/posts/articles")
        return response.data.data
    },

    getPublicArticles: async (user_id: string) => {
        const response = await axiosClient.get(`/posts/articles/${user_id}/`);
        return response.data.data;
    },

    searchPosts: async (params: {
        query: string;
        limit?: number,
        last_rank?: number,
        last_id?: number,
    }) => {
        const response = await axiosClient.get("/posts/search", {params});
        return response.data.data;
    }

}


