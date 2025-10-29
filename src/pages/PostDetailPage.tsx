import { usePost } from "../hooks/usePost"
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import PostDetail from "../components/post-detail";
import Loading from "@/components/loading";


const PostDetailPage = () => {
    const { id } = useParams<{id: string}>();
    const postId = id || "";
    const navigate = useNavigate();

    const {post, loading, error, getPostById} = usePost();

    useEffect(() => {
        const fetchPost = async () => {
        if (postId) {
            await getPostById(postId);
        }
        };
        fetchPost();
    }, [postId]);

    if (loading) return <Loading />;
    if (error) {
        navigate("/404");
    };
    if (!post) return <p>Post not found</p>;

    return (
        <PostDetail {...post}/>
    );  
}

export default PostDetailPage