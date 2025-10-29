import Loading from "@/components/loading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useReport } from "@/hooks/useReport";
import type { PublicPostStats } from "@/interface/report";
import { AlertCircle, CheckCircle, Clock, FileText, XCircle } from "lucide-react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";


export default function PublicPostStats() {
  const { loading, error, postStatus, getUserPostStatus } = useReport();
  const { t } = useTranslation();

  useEffect(() => {
    getUserPostStatus();
  }, []);

  const items = [
    {
      label: t("report.approved"),
      value: postStatus?.approve ?? 0,
      icon: <CheckCircle className="text-green-500 w-6 h-6" />,
      color: "text-green-600",
      testId: "approved-count"
    },
    {
      label: t("report.pending"),
      value: postStatus?.pending ?? 0,
      icon: <Clock className="text-yellow-500 w-6 h-6" />,
      color: "text-yellow-600",
      testId: "pending-count"
    },
    {
      label: t("report.rejected"),
      value: postStatus?.reject ?? 0,
      icon: <XCircle className="text-red-500 w-6 h-6" />,
      color: "text-red-600",
      testId: "rejected-count"
    },
    {
      label: t("report.total"),
      value: postStatus?.total ?? 0,
      icon: <FileText className="text-blue-500 w-6 h-6" />,
      color: "text-blue-600",
      testId: "total-count"
    },
  ];

  if (loading)
  return (
    <Loading />
  );

if (error)
  return (
    <div className="flex items-center gap-2 p-4 border border-red-300 bg-red-50 text-red-700 rounded-md">
      <AlertCircle className="w-5 h-5" />
      <span>{t("dashboard.fail_load")}</span>
    </div>
  );

  return (        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4" data-testid="post-status-card">
        {items.map((item) => (
            <Card key={item.label} className="shadow-sm border border-gray-100">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                {item.icon} {item.label}
                </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-semibold ${item.color}`} data-testid={item.testId}>
                {item.value}
              </div>
            </CardContent>
            </Card>
        ))}
        </div>
  );
}