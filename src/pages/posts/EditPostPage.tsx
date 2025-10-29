import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/useAuth";
import { usePost } from "@/hooks/usePost";
import EditorField from "@/components/editor-field";

const EditPostPage = () => {
  const { id } = useParams();
  const postId = id || "";
  const { post, getPostById } = usePost();
  const { me, loading: authLoading } = useAuth();

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOwner, setIsOwner] = useState<boolean | null>(null);

  // Fetch post data
  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      setLoading(true);
      try {
        await getPostById(postId);
      } catch (err: any) {
        toast.error("Đã có lỗi xảy ra");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id, postId]);

  // Check owner
  useEffect(() => {
    if (!post || !me) return;
    setIsOwner(post.author?.id === me.id);
  }, [post, me]);

  // Fill editor fields
  useEffect(() => {
    if (!post) return;
    setTitle(post.title || "");
    setSummary(post.summary || "");
    setContent(post.content || "");
  }, [post]);

  // Draft saving (for new post)
  useEffect(() => {
    if (id) return;
    localStorage.setItem("draft-title", title);
    localStorage.setItem("draft-summary", summary);
    localStorage.setItem("draft-content", content);
  }, [id, title, summary, content]);

  if (authLoading || loading || isOwner === null) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (!isOwner) {
    return <Navigate to="/404" />;
  }

  return (
    <div className="flex flex-1 p-4">
      <EditorField
        content={content}
        title={title}
        summary={summary}
        onChangeSummary={setSummary}
        onChangeTitle={setTitle}
        onChangeContent={setContent}
        isUpdate={!!postId}
        postId={postId}
      />
    </div>
  );
};

export default EditPostPage;
