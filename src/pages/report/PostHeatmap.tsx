import React, { useEffect, useMemo, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { useReport } from "@/hooks/useReport";
import type { DayStat } from "@/interface/report";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from "react-i18next";
import Loading from "@/components/loading";

interface UserPostHeatmapProps {
  data?: DayStat[];
  user_id: string;
  defaultYear?: number;
}

const UserPostHeatmap: React.FC<UserPostHeatmapProps> = ({
  data,
  user_id,
  defaultYear = new Date().getFullYear()
}) => {
  const [year, setYear] = useState<number>(defaultYear);
  const { loading, heatmap, getPostHeatmap, years, getPostYears } = useReport();
  const { t } = useTranslation();

  useEffect(() => {
    if (!data) getPostHeatmap({ user_id, year });
  }, [data, user_id, year]);

  useEffect(() => {
    getPostYears(user_id);
  }, [user_id]);

  const activeData = data || heatmap || [];

  const dataMap = useMemo(() => {
    const map: Record<string, number> = {};
    activeData.forEach((d) => (map[d.date] = d.count));
    return map;
  }, [activeData]);

  // const monthLabels = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
   const monthLabels = [
    t("months.jan"),
    t("months.feb"),
    t("months.mar"),
    t("months.apr"),
    t("months.may"),
    t("months.jun"),
    t("months.jul"),
    t("months.aug"),
    t("months.sep"),
    t("months.oct"),
    t("months.nov"),
    t("months.dec")
  ];
  const cellSize = 12;

  const allYears = useMemo(() => {
    if (!years || years.length === 0) return [new Date().getFullYear()];

    const firstYear = Math.min(...years); // năm nhỏ nhất có post
    const currentYear = new Date().getFullYear();

    const yearList: number[] = [];
    for (let y = currentYear; y >= firstYear; y--) {
      yearList.push(y);
    }
    return yearList;
  }, [years]);

  const months = useMemo(() => {
    const monthArrays: (Date | null)[][][] = [];

    for (let m = 0; m < 12; m++) {
      const monthWeeks: (Date | null)[][] = [];
      const firstDay = new Date(year, m, 1);
      const lastDay = new Date(year, m + 1, 0);


      let week: (Date | null)[] = [];

      for (let i = 0; i < firstDay.getDay(); i++) week.push(null);

      for (let d = 1; d <= lastDay.getDate(); d++) {
        week.push(new Date(year, m, d));

        if (week.length === 7) {
          monthWeeks.push(week);
          week = [];
        }
      }

      if (week.length > 0) {
        while (week.length < 7) week.push(null);
        monthWeeks.push(week);
      }

      monthArrays.push(monthWeeks);
    }

    return monthArrays;
  }, [year]);

  const pad = (n: number) => String(n).padStart(2, "0");
  const formatLocalDate = (d: Date) =>
    `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;


  const getColor = (count: number) => {
    if (count === 0) return "bg-gray-200 dark:bg-gray-800";
    if (count <= 2) return "bg-green-300";
    if (count <= 5) return "bg-green-500";
    return "bg-green-700";
  };

  return (
    <Card className="p-4 shadow-sm rounded-2xl relative overflow-visible">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">{t("dashboard.activity")} ({year})</CardTitle>
        <Select value={String(year)} onValueChange={(val) => setYear(Number(val))}>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Select Year" />
          </SelectTrigger>
          <SelectContent>
            {allYears.map((y) => (
              <SelectItem key={y} value={String(y)}>
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="pb-6 overflow-x-auto">
          <TooltipProvider>
            <div className="min-w-max flex gap-4">
              {months.map((weeks, monthIndex) => (
                <div key={monthIndex} className="flex flex-col gap-1 items-center flex-shrink-0">
                  <span className="text-xs font-medium">{monthLabels[monthIndex]}</span>
                  <div className="flex gap-[2px]">
                    {weeks.map((week, weekIndex) => (
                      <div key={weekIndex} className="flex flex-col gap-[2px]">
                        {week.map((day, dayIndex) => {
                          const dateStr = day ? formatLocalDate(day) : "";
                          const count = day ? dataMap[dateStr] || 0 : 0;
                          return (
                            <Tooltip key={dayIndex}>
                              <TooltipTrigger asChild>
                                <div
                                  style={{ width: cellSize, height: cellSize }}
                                  className={`${day ? getColor(count) : "bg-transparent"} rounded-[3px]`}
                                />
                              </TooltipTrigger>
                              {day && (
                                <TooltipContent side="top" className="text-xs">
                                  <p>{dateStr}</p>
                                  <p>{count} post{count !== 1 ? "s" : ""}</p>
                                </TooltipContent>
                              )}
                            </Tooltip>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end mt-6 text-[10px] text-gray-500 items-center gap-1">
              <span>Less</span>
              <div className="w-[10px] h-[10px] bg-gray-200 dark:bg-gray-800 rounded-[2px]" />
              <div className="w-[10px] h-[10px] bg-green-300 rounded-[2px]" />
              <div className="w-[10px] h-[10px] bg-green-500 rounded-[2px]" />
              <div className="w-[10px] h-[10px] bg-green-700 rounded-[2px]" />
              <span>More</span>
            </div>
          </TooltipProvider>
          {loading && (
            <div className="absolute inset-0 bg-white/70 dark:bg-gray-900/70 flex justify-center items-center rounded-2xl">
              <Loading />
            </div>
          )}
      </CardContent>
    </Card>
  );
};

export default UserPostHeatmap;
