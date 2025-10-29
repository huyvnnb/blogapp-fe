import { useEffect, useState } from "react";
import MarkdownPreview from "./markdown-preview";
import { usePost } from "../hooks/usePost";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useTranslation } from "react-i18next";

interface EditorProps {
  postId?: string;
  title: string;
  summary: string;
  content: string;
  is_public?: boolean;
  published?: boolean;
  onChangeTitle?: (value: string) => void;
  onChangeSummary?: (value: string) => void;
  onChangeContent?: (value: string) => void;
  onChangeIsPublic?: (value: boolean) => void;
  onChangePublished?: (value: boolean) => void;
  onSubmit?: () => void;
  isUpdate?: boolean;
}

const EditorField = ({
  postId,
  title,
  summary,
  content,
  is_public,
  published,
  onChangeTitle,
  onChangeSummary,
  onChangeContent,
  onChangeIsPublic,
  onChangePublished,
  isUpdate
}: EditorProps) => {
  const [mode, setMode] = useState<"edit" | "preview">("edit");
  const [isPublished, setIsPublished] = useState<boolean>(!!published);
  const [isPublic, setIsPublic] = useState<boolean>(!!is_public);
  const { t } = useTranslation();

  useEffect(() => setIsPublished(!!published), [published]);
  useEffect(() => setIsPublic(!!is_public), [is_public]);

  const { publishPost, saveDraft, updatePost, error } = usePost();

  const handleSaveDraft = () => {
    saveDraft({ title, summary, content, is_public: isPublic, published: isPublished });
  }

  const handlePublish = () => {
    publishPost({ title, summary, content, is_public: isPublic, published: isPublished });
  }


  const handleUpdate = () => {
    if (!postId) return;

    updatePost(postId, {
        title,
        summary,
        content,
        is_public: isPublic,
        published: isPublished,
    });
  }

  return (
    <div className="flex flex-col flex-1 p-4 bg-background rounded-xl border">
      <Tabs
        defaultValue="edit"
        onValueChange={(v) => setMode(v as "edit" | "preview")}
        className="flex flex-col flex-1"
      >
        {
          error && (<div className="text-red-500 mb-2">{error}</div>
        )}
        <div className="flex justify-between items-center mb-4">
          <TabsList className="flex gap-2">
            <TabsTrigger data-testid="edit-mode" value="edit">Edit</TabsTrigger>
            <TabsTrigger data-testid="preview-mode" value="preview">Preview</TabsTrigger>
          </TabsList>

          <div className="flex gap-2 items-center">
            <Select value={isPublic ? "true" : "false"} onValueChange={(v) => onChangeIsPublic?.(v === "true")}>
              <SelectTrigger className="w-[120px] text-sm" data-testid="select-public">
                <SelectValue placeholder="Public" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true" data-testid="option-public">{t("edit.public")}</SelectItem>
                <SelectItem value="false" data-testid="option-private">{t("edit.private")}</SelectItem>
              </SelectContent>
            </Select>

            {isUpdate && (
                <Select value={isPublished ? "true" : "false"} onValueChange={(v) => onChangePublished?.(v === "true")}>
                    <SelectTrigger className="min-w-[120px] w-auto text-sm" data-testid="select-publish">
                        <SelectValue placeholder={t("edit.draft")} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="true" data-testid="option-publish">{t("edit.publish")}</SelectItem>
                        <SelectItem value="false" data-testid="option-draft">{t("edit.draft")}</SelectItem>
                    </SelectContent>
                </Select>
            )}
          </div>
        </div>

        {/* Nội dung tab */}
        <TabsContent value="edit" className="flex flex-col gap-4 flex-1">
          <Input
            value={title}
            onChange={(e) => onChangeTitle?.(e.target.value)}
            placeholder={t("edit.titlePlaceholder")}
            data-testid="input-title"
          />
          <Textarea
            value={summary}
            onChange={(e) => onChangeSummary?.(e.target.value)}
            placeholder={t("edit.summaryPlaceholder")}
            className="min-h-[100px]"
            data-testid="input-summary"
          />
          <Textarea
            value={content}
            onChange={(e) => onChangeContent?.(e.target.value)}
            placeholder={t("edit.contentPlaceholder")}
            className="flex-1 min-h-[400px]"
            data-testid="input-content"
          />
        </TabsContent>

        <TabsContent value="preview" className="flex-1 overflow-auto bg-muted/40 p-4 rounded-lg border">
          <MarkdownPreview content={content} />
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2 mt-4">
        {isUpdate ? (
            <Button onClick={handleUpdate} data-testid="btn-update">
                {t("edit.update")}
            </Button>
        ) : (
            <>
            <Button variant="outline" onClick={handleSaveDraft} data-testid="btn-save-draft">
                {t("edit.draft")}
            </Button>
            <Button onClick={handlePublish} data-testid="btn-publish">
                {t("edit.publish")}
            </Button>
            </>
        )}
        </div>
    </div>
  );
};

export default EditorField;
