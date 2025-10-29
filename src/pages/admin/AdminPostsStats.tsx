import { useEffect, useState } from "react";
import { usePostStats } from "@/hooks/usePostStats";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Loader2 } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";
import { DatePickerField } from "@/components/datepicker-field";
import { useTranslation } from "react-i18next";


const PostStatsChart = () => {
  const { stats, loading, error, getPostStats } = usePostStats();

  const [type, setType] = useState<"daily" | "weekly" | "monthly" | "yearly">("daily");
  // const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [status, setStatus] = useState<"APPROVE" | "PENDING" | "REJECT">("APPROVE");
  const [range, setRange] = useState("7");
  const { t } = useTranslation()

  const RANGE_OPTIONS = {
    daily: [
      { value: "7", label: t("range.daily.7") },
      { value: "14", label: t("range.daily.14") },
      { value: "30", label: t("range.daily.30") },
    ],
    weekly: [
      { value: "5", label: t("range.weekly.5") },
      { value: "10", label: t("range.weekly.10") },
      { value: "15", label: t("range.weekly.15") },
    ],
    monthly: [
      { value: "3", label: t("range.monthly.3") },
      { value: "6", label: t("range.monthly.6") },
      { value: "12", label: t("range.monthly.12") },
    ],
    yearly: [
      { value: "3", label: t("range.yearly.3") },
      { value: "5", label: t("range.yearly.5") },
      { value: "10", label: t("range.yearly.10") },
    ],
  };

  useEffect(() => {
  if (!range || !endDate) return;

  const r = parseInt(range);
  const start = new Date(endDate);

  switch (type) {
    case "daily":
      start.setDate(endDate.getDate() - (r - 1));
      break;
    case "weekly":
      start.setDate(endDate.getDate() - (r -1) * 7);
      break;
    case "monthly":
      start.setMonth(endDate.getMonth() - (r - 1));
      break;
    case "yearly":
      start.setFullYear(endDate.getFullYear() - (r - 1));
      break;
  }
  const toLocalYMD = (d: Date) => {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }
  // getPostStats(
  //   type,
  //   start.toISOString().split("T")[0],
  //   endDate.toISOString().split("T")[0],
  //   status
  // );
  getPostStats(
    type,
    toLocalYMD(start),
    toLocalYMD(endDate),
    status
  );
}, [type, range, status, endDate]);


  const formatLabel = (label: string) => {
    switch (type) {
      case "daily":
        return label.slice(5);
      case "weekly":
        return label;
      case "monthly":
        return label;
      case "yearly":
        return label;
      default:
        return label;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{t("report.post_stats")}</CardTitle>
        <Select value={type} onValueChange={(v) => {
          const newType = v as "daily" | "weekly" | "monthly" | "yearly";
          setType(newType);
          setRange(RANGE_OPTIONS[newType][0].value);
        }}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Chọn loại" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">{t("report.daily")}</SelectItem>
            <SelectItem value="weekly">{t("report.weekly")}</SelectItem>
            <SelectItem value="monthly">{t("report.monthly")}</SelectItem>
            <SelectItem value="yearly">{t("report.yearly")}</SelectItem>
          </SelectContent>
        </Select>
        <Select value={range} onValueChange={setRange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Chọn khoảng thời gian" />
          </SelectTrigger>
          <SelectContent>
            {RANGE_OPTIONS[type].map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={status} onValueChange={(v) => setStatus(v as any)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="APPROVE">{t("report.approved")}</SelectItem>
              {/* <SelectItem value="PENDING">Chờ duyệt</SelectItem> */}
              <SelectItem value="REJECT">{t("report.rejected")}</SelectItem>
            </SelectContent>
          </Select>
        <div className="flex items-center gap-3">
          {/* <DatePickerField label="Từ ngày" date={startDate} onChange={(d) => setStartDate(d)} /> */}
          <DatePickerField label={t("report.to_date")} date={endDate} onChange={(d) => setEndDate(d)} />
        </div>
      </CardHeader>
      <CardContent className="h-[360px] bg-gray-50 dark:bg-gray-900 rounded-xl p-4 shadow-inner">
        {loading ? (
          <div className="flex justify-center items-center h-full text-gray-500">
            <Loader2 className="w-5 h-5 animate-spin mr-2" /> {t("button.loading")}
          </div>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : stats?.stats?.length ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={stats.stats}>
              <defs>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="label"
                tickFormatter={formatLabel}
                tick={{ fill: "#6b7280", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#6b7280", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                label={{
                  value: t("report.post_count"),
                  angle: -90,
                  position: "insideLeft",
                  style: { textAnchor: "middle", fill: "#6b7280" },
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                }}
                labelStyle={{ color: "#6b7280", fontWeight: 500 }}
                formatter={(value: any) => [`${value} ${t("report.post")}`, t("report.count")]}
              />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#3b82f6"
                strokeWidth={2.5}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                fill="url(#lineGradient)"
                animationDuration={700}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex flex-col justify-center items-center h-full text-gray-500">
            <img src="/empty-state.svg" alt="No data" className="w-28 opacity-70 mb-3" />
            <p>{t("report.no_data")}</p>
          </div>
        )}
      </CardContent>

    </Card>
  );
};

export default PostStatsChart;
