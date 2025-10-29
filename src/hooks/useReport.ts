import type { DayStat, PublicPostStats } from "@/interface/report"
import { reportService } from "@/service/reportService";
import { useState } from "react"

export const useReport = () => {
    const [postStatus, setPostStatus] = useState<PublicPostStats | null>(null);
    const [heatmap, setHeatmap] = useState<DayStat[]>([]);
    const [loading, setLoading] = useState(false);
    const [years, setYears] = useState<number[]>([])
    const [error, setError] = useState<string | null>(null);


    const getUserPostStatus = async () => {
        setLoading(true);
        try {
            const data = await reportService.getUserPostStatus();
            setPostStatus(data);
        } catch (err: any) {
            console.error("Không lấy được trạng thái bài viết");
            setError(err.message || "Không lấy được trạng thái bài viết")
        } finally {
            setLoading(false);
        }
    }

    const getPostHeatmap = async ({ user_id, year }: { user_id: string; year: number }) => {
        setLoading(true);
        try {
            const data = await reportService.getPostHeatmap({ user_id, year });
            setHeatmap(data);
        } catch (err: any) {
            setError(err.message || "Something has occured.");
        } finally {
            setLoading(false);
        }
    };

    const getPostYears = async (user_id: string) => {
        setLoading(true);
        try {
            const data = await reportService.getPostYears(user_id);
            setYears(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return {
        loading, error,
        postStatus, getUserPostStatus,
        heatmap, getPostHeatmap,
        years, getPostYears
    }
}