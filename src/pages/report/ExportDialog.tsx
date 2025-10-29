import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface ExportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onExport: (payload: { user_id: string, summary_fields: string[]; post_fields: string[] }) => void;
  user_id: string;
}

// const summaryFieldOptions = [
//   { key: "user_info", label: "Thông tin người dùng" },
//   { key: "total_posts", label: "Tổng số bài viết" },
//   { key: "avg_length", label: "Độ dài trung bình" },
//   { key: "approval_rate", label: "Tỉ lệ được duyệt" },
//   { key: "export_posts", label: "Export bài viết" },
// ];

// const postFields = [
//   { key: "id", label: "ID" },
//   { key: "title", label: "Title" },
//   { key: "content", label: "Content" },
//   { key: "summary", label: "Summary" },
//   { key: "user_id", label: "User ID" },
//   { key: "published", label: "Published" },
//   { key: "is_public", label: "Is Public" },
//   { key: "status", label: "Status" },
//   { key: "created_at", label: "Created At" },
//   { key: "updated_at", label: "Updated At" },
// ];

const ExportDialog: React.FC<ExportDialogProps> = ({ open, onOpenChange, onExport, user_id }) => {
  const [selectedSummaryFields, setSelectedSummaryFields] = useState<string[]>([]);
  const [selectedPostFields, setSelectedPostFields] = useState<string[]>([]);
  const { t } = useTranslation();

  const summaryFieldOptions = [
    { key: "user_info", label: t("export.user_info") },
    { key: "total_posts", label: t("export.total_posts") },
    { key: "avg_length", label: t("export.avg_length") },
    { key: "approval_rate", label: t("export.approval_rate") },
    { key: "export_posts", label: t("export.post_info") },
  ];

  const postFields = [
    { key: "id", label: t("export.post_fields.id") },
    { key: "title", label: t("export.post_fields.title") },
    { key: "content", label: t("export.post_fields.content") },
    { key: "summary", label: t("export.post_fields.summary") },
    { key: "user_id", label: t("export.post_fields.user_id") },
    { key: "published", label: t("export.post_fields.published") },
    { key: "is_public", label: t("export.post_fields.is_public") },
    { key: "status", label: t("export.post_fields.status") },
    { key: "created_at", label: t("export.post_fields.created_at") },
    { key: "updated_at", label: t("export.post_fields.updated_at") },
  ];

  useEffect(() => {
    if (!open) {
      setSelectedSummaryFields([]);
      setSelectedPostFields([]);
    }
  }, [open]);

  const toggleSummaryField = (key: string) => {
    setSelectedSummaryFields((prev) =>
      prev.includes(key) ? prev.filter((f) => f !== key) : [...prev, key]
    );
  };

  const togglePostField = (key: string) => {
    setSelectedPostFields((prev) =>
      prev.includes(key) ? prev.filter((f) => f !== key) : [...prev, key]
    );
  };

  const toggleAllSummary = () => {
    if (selectedSummaryFields.length === summaryFieldOptions.length) {
      setSelectedSummaryFields([]);
    } else {
      setSelectedSummaryFields(summaryFieldOptions.map((f) => f.key));
    }
  };

  const toggleAllPost = () => {
    if (selectedPostFields.length === postFields.length) {
      setSelectedPostFields([]);
    } else {
      setSelectedPostFields(postFields.map((f) => f.key));
    }
  };

  const handleExport = () => {
    onExport({
      user_id: user_id,
      summary_fields: selectedSummaryFields,
      post_fields: selectedPostFields,
    });
    setSelectedSummaryFields([]);
    setSelectedPostFields([]);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("export.title")}</DialogTitle>
          <DialogDescription>
            {t("export.desc")}
          </DialogDescription>
        </DialogHeader>

        {/* Summary Fields */}
        <div className="mt-4">
          <Button
            variant="outline"
            size="sm"
            className="mb-2"
            onClick={toggleAllSummary}
          >
            {selectedSummaryFields.length === summaryFieldOptions.length
              ? t("export.deselect_all")
              : t("export.select_all")
            }
          </Button>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {summaryFieldOptions.map((field) => (
              <div key={field.key} className="flex items-center space-x-2">
                <Checkbox
                  checked={selectedSummaryFields.includes(field.key)}
                  onCheckedChange={() => toggleSummaryField(field.key)}
                  id={field.key}
                />
                <label htmlFor={field.key} className="text-sm">
                  {field.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Post Fields */}
        {selectedSummaryFields.includes("export_posts") && (
          <>
            <Separator className="my-4" />
            <div className="mt-2 p-3 border border-gray-200 rounded-lg max-h-64 overflow-y-auto">
              <span className="font-medium text-sm mb-2 block">
                {t("export.choose_post_fields")}
              </span>

              <Button
                variant="outline"
                size="sm"
                className="mb-2"
                onClick={toggleAllPost}
              >
                {selectedPostFields.length === postFields.length
                  ? t("export.deselect_all")
                  : t("export.select_all")
                }
              </Button>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {postFields.map((field) => (
                  <div key={field.key} className="flex items-center space-x-2">
                    <Checkbox
                      checked={selectedPostFields.includes(field.key)}
                      onCheckedChange={() => togglePostField(field.key)}
                      id={`post_${field.key}`}
                    />
                    <label htmlFor={`post_${field.key}`} className="text-sm">
                      {field.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Footer */}
        <DialogFooter className="mt-4 flex justify-end space-x-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            {t("export.cancel")}
          </Button>
          <Button
            onClick={handleExport}
            disabled={
              selectedSummaryFields.length === 0 &&
              selectedPostFields.length === 0
            }
            className="bg-blue-600 hover:bg-blue-700"
          >
            {t("export.export")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExportDialog;
