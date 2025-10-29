import { useEffect, useState } from "react";
import EditorField from "@/components/editor-field";

export default function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [isPublic, setIsPublic] = useState(false);


  return (
    <div className="flex flex-1 p-6 h-full overflow-auto">
      <EditorField
        title={title}
        summary={summary}
        content={content}
        is_public={isPublic}
        onChangeTitle={setTitle}
        onChangeSummary={setSummary}
        onChangeContent={setContent}
      />
    </div>
  );
}
