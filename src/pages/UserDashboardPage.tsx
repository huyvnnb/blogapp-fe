import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import PublicPostStats from "./report/PublicPostStats";
import { useAuth } from "@/hooks/useAuth";
import UserPostHeatmap from "./report/PostHeatmap";
import ExportDialog from "./report/ExportDialog";
import axiosClient from "@/service/axiosClient";
import { useTranslation } from "react-i18next";

const UserDashboardPage: React.FC = () => {
  const {me} = useAuth();
  console.log(me); 
  console.log(me?.id);

  const [isExportOpen, setIsExportOpen] = useState(false);
  const handleOpen = () => setIsExportOpen(true);
  const {t} = useTranslation();
  // const handleClose = () => setIsExportOpen(false);

  const exportReport = async (payload: { user_id: string, summary_fields: string[], post_fields: string[] }) => {
    try {
      const response = await axiosClient.post("/user/stats/export", payload, {
        responseType: "blob",
      });
      console.log(response.headers);

      const disposition = response.headers['content-disposition'] || response.headers['Content-Disposition'];
      let filename = "report.xlsx";
      if (disposition && disposition.includes("filename=")) {
        filename = disposition
          .split("filename=")[1]
          .replace(/['"]/g, "");
      }

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Export failed", err);
    }
  };

  return (
    <div className="min-h-screen bg-white p-4 space-y-8">
      <div className="flex flex-wrap sm:flex-nowrap items-start sm:items-center justify-between border-b pb-4 gap-4 min-w-0">
        <div className="flex-1 min-w-0">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight truncate">
            {t("dashboard.title")}
          </h1>
          <p className="text-gray-600 mt-1 truncate">
            {t("dashboard.desc")}
          </p>
        </div>

        <Button
          onClick={handleOpen}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white whitespace-nowrap"
          id="export-excel-btn"
        >
          <Download className="w-4 h-4" />
          {t("dashboard.export_report")}
        </Button>

        <ExportDialog
          open={isExportOpen}
          onOpenChange={setIsExportOpen}
          onExport={exportReport}
          user_id={me!.id.toString()}
        />
      </div>

      {/* Post Status Section */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {t("dashboard.post_status")}
        </h2>
        <PublicPostStats />
      </section>

      <section>
        <div className="min-w-0 w-full overflow-x-auto flex justify-center items-center">
          <UserPostHeatmap user_id={me!.id}/>
        </div>
      </section>
    </div>
  );
};

export default UserDashboardPage;
