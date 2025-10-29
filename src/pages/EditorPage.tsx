import { useEffect, useMemo, useState } from "react";
import EditorField from "../components/editor-field";
import { useParams } from "react-router-dom";
import { usePost } from "../hooks/usePost";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/useAuth";
import Loading from "@/components/loading";

const EditorPage = () => {
    const { id } = useParams();
    const postId = id || "";
    const { post, getPostById } = usePost();
    const { me } = useAuth();

    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [content, setContent] = useState("");
    const [isPublic, setIsPublic] = useState(false);
    const [isPublished, setIsPublished] = useState(false);
    const [loading, setLoading] = useState(false);


    // useEffect(() => {
    //     if(id) return;
    //     const savedContent = localStorage.getItem("draft-content");
    //     const savedTitle = localStorage.getItem("draft-title");
    //     const savedSummary = localStorage.getItem("draft-summary");
    //     if(savedContent){
    //         setContent(savedContent);
    //     }
    //     if(savedSummary){
    //         setSummary(savedSummary)
    //     }
    //     if(savedTitle){
    //         setTitle(savedTitle)
    //     }
    // }, [id]);

    useEffect(() => {
        if(!id){
            return;
        }
        const fetchPost = async () => {
            setLoading(true);
            try {
                await getPostById(postId);
            } catch (err: any){
                toast.error("Đã có lỗi xảy ra")
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [id, postId]);

    useEffect(() => {
        if (!post) return;
        setTitle(post.title || "");
        setSummary(post.summary || "");
        setContent(post.content || "");
        setIsPublic(post.is_public || false);
        setIsPublished(post.published || false);
    }, [post]);

    // useEffect(() => {
    //     if (id) return;
    //     localStorage.setItem("draft-title", title);
    //     localStorage.setItem("draft-summary", summary);
    //     localStorage.setItem("draft-content", content)
    // }, [id, title, summary, content]);

    if(loading){
        return <Loading />
    }

    return (
        <div className="flex flex-1">
            <EditorField 
                content={content}
                title={title}
                summary={summary}
                is_public={isPublic}
                published={isPublished}
                onChangeSummary={setSummary}
                onChangeTitle={setTitle}
                onChangeContent={setContent}
                onChangeIsPublic={setIsPublic}
                onChangePublished={setIsPublished}
                isUpdate={!!postId}
                postId={postId}
            />
        </div>
    )
}

export default EditorPage;