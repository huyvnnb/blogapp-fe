import axiosClient from "./axiosClient";

interface GetPostHeatmapParams {
    user_id: string;
    year: number;
}

export const reportService = {
    getPostStats: async ( params: {
        type: string;
        start_date?: string;
        end_date?: string;
        status?: string;
    }) => {
        const response = await axiosClient.get("/admin/stats/posts", {params});
        return response.data.data;
    },

    getPostStatusCount: async () => {
        const response = await axiosClient.get("/admin/stats/posts/status/count");
        return response.data.data;
    },

    getUserPostStatus: async () => {
        const response = await axiosClient.get("/user/stats/posts/by-status");
        return response.data.data;
    },


    getPostHeatmap: async ({user_id, year} : GetPostHeatmapParams) => {
        const response = await axiosClient.get(`/user/stats/posts/heatmap/${user_id}`, { params: { year: Number(year) } });
        return response.data.data;
    },

    getPostYears: async (user_id: string) => {
        const response = await axiosClient.get(`/user/stats/posts/years/${user_id}`);
        return response.data.data;
    }
}