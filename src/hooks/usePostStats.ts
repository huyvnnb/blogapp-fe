import { reportService } from "@/service/reportService";
import { eachDayOfInterval, eachMonthOfInterval, eachWeekOfInterval, eachYearOfInterval, format } from "date-fns";
import { useState } from "react";

export interface PostStatItem {
  label: string;
  total: number;
}

export interface PostStats {
  type: "daily" | "weekly" | "monthly" | "yearly";
  range: {
    start: string;
    end: string;
  };
  status?: "APPROVE" | "PENDING" | "REJECT";
  stats: PostStatItem[];
}

export const usePostStats = () => {
    const [stats, setStats] = useState<PostStats | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getPostStats = async (type: string, start_date: string, end_date: string, status: string) => {
        setLoading(true);
        try {
            const data = await reportService.getPostStats({
                type: type,
                start_date: start_date,
                end_date: end_date,
                status: status,
            });

            const filled = fillMissingLabels(data.stats, type, start_date, end_date);

            setStats({
                ...data,
                stats: filled,
            });
        } catch (err: any) {
            console.error("Failed to fetch stats:", err);
            setError("Không thể tải thống kê bài viết");
        } finally {
            setLoading(false);
        }
    }

    return {
        loading, error,
        stats,
        getPostStats
    }
};

function fillMissingLabels(data: any[], type: string, start: string, end: string) {
  const startDate = new Date(start);
  const endDate = new Date(end);

  let labels: string[] = [];

  switch (type) {
    case "daily":
      labels = eachDayOfInterval({ start: startDate, end: endDate }).map((d) =>
        format(d, "yyyy-MM-dd")
      );
      break;

    case "weekly":
      labels = eachWeekOfInterval({ start: startDate, end: endDate }, { weekStartsOn: 1 }).map((d) =>
        format(d, "yyyy-'W'II")
      );
      break;

    case "monthly":
      labels = eachMonthOfInterval({ start: startDate, end: endDate }).map((d) =>
        format(d, "yyyy-MM")
      );
      break;

    case "yearly":
      labels = eachYearOfInterval({ start: startDate, end: endDate }).map((d) =>
        format(d, "yyyy")
      );
      break;
  }

  const filled = labels.map((label) => {
    const found = data.find((item) => item.label === label);
    return found || { label, total: 0 };
  });

  return filled;
}