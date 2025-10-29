import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { reportService } from "@/service/reportService";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const statusColors = {
  APPROVE: "#22c55e", // xanh
  PENDING: "#facc15", // vàng
  REJECT: "#ef4444", // đỏ
};

interface StatusData {
  APPROVE: number;
  PENDING: number;
  REJECT: number;
}

const PostStatusRate = () => {
  const [statusData, setStatusData] = useState<StatusData | null>(null);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const fetchStatusData = async () => {
    setLoading(true);
    try {
      const res = await reportService.getPostStatusCount();
      if (res) {
        setStatusData({
          APPROVE: res.approve,
          PENDING: res.pending,
          REJECT: res.reject,
        });
      }
    } catch (err) {
      console.error("Failed to fetch post status count", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatusData();
  }, []);

  if (!statusData) return null;

  const data = [
    { name: t("report.approved"), value: statusData.APPROVE },
    { name: t("report.pending"), value: statusData.PENDING },
    { name: t("report.rejected"), value: statusData.REJECT },
  ];

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{t("report.post_status")}</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center items-center h-[400px]">
        {loading || !statusData ? (
          <p className="text-center text-gray-500">Đang tải dữ liệu...</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                innerRadius={60}
                paddingAngle={3}
                cornerRadius={8}
                labelLine
                label={({ name, value, percent }) => `${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => {
                  const key =
                    entry.name === t("report.approved")
                      ? "APPROVE"
                      : entry.name === t("report.pending")
                      ? "PENDING"
                      : "REJECT";
                  return <Cell key={index} fill={statusColors[key]} />;
                })}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  borderRadius: 8,
                  border: "1px solid #e5e7eb",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
                formatter={(value: number) => [`${value} ${t("report.post")}`, t("report.count").toLowerCase()]}
              />
              <Legend
                verticalAlign="bottom"
                iconType="circle"
                iconSize={12}
                wrapperStyle={{ fontSize: 13 }}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default PostStatusRate;
