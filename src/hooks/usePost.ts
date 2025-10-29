import { useNavigate } from "react-router-dom";
import type { Post, PostCreate, PostUpdate, PublicArticle } from "../interface/posts";
import { postService } from "../service/postService";
import { useState } from "react";
import { toast } from "react-toastify";
import { fa } from "zod/v4/locales";
import { useTranslation } from "react-i18next";


export const usePost = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [articles, setArticles] = useState<PublicArticle[]>([])
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();
    const { t } = useTranslation();


    // const getPosts = async () => {
    //     setLoading(true);
    //     setError(null);

    //     try {
    //         const data = await postService.fetchPosts();
    //         setPosts(data);
    //     } catch (err: any) {
    //         setError(err.message || "Some error occurred");
    //     } finally {
    //         setLoading(false);
    //     }
    // }

    const getPostById = async (id: string) => {
        setLoading(true);
        setError(null); 
    
        try {
            const data = await postService.fetchPostById(id);
            setPost(data);
        } catch (err: any) {
            setError(err.message || "Some error occurred");
            return null;
        } finally {
            setLoading(false);
        }
    }

    const getPostByUserId = async (userId: string) => {
        setLoading(true);
        setError(null); 
        try {
            const data = await postService.fetchPostsByUserId(userId);
            setPosts(data);
        } catch (err: any) {    
            setError(t("notify.error.error_occur") || "Some error occurred");
            return null;
        } finally {
            setLoading(false);
        }
    }

    const getUserArticles = async (user_id: string) => {
        setLoading(true);
        try {
            const data = await postService.getPublicArticles(user_id);
            setArticles(data);
        } catch (err: any){
            setError(err.message || "Cannot get articles.")
        } finally {
            setLoading(false);
        }
    }

    const handlePost = async (
        data: PostCreate | PostUpdate,
        published: boolean,
        successMsg: string, 
        errorMsg: string,
        isUpdate = false,
        postId?: string,
    ) => {
        setLoading(true);

        try {
            if(isUpdate){
                if (!postId){
                    throw Error("PostId must be included");
                }
                await postService.updatePost(postId, {...data, published});
            }
            else {
                await postService.publishPost({...data, published})
            }
            toast.success(successMsg);
            navigate("/home");
        } catch (err: any){
            toast.error(err?.message || errorMsg);
        }
        finally{
            setLoading(false);
        }
    }


    const publishPost = async (data: PostCreate) => {
        setLoading(true);
        
        try {
            await postService.publishPost({
                ...data,
                published: true
            });
            toast.success(t("notify.success.post_publish") || "Xuất bản thành công!");
            navigate("/home");
        } catch (err: any) {
            if(err?.status == 422){
                toast.error(t("notify.error.post_not_empty") || "Tiêu đề và nội dung không được để trống");
            } else {
                toast.error(t("notify.error.publish_failed") || err?.message || "Xuất bản thất bại!");
            }
        } finally {
            setLoading(false);
        }
    }

    const saveDraft = async (data: PostCreate) => {
        setLoading(true);
        try {
        await postService.publishPost({
            ...data,
            published: false,
        });
        toast.success(t("notify.success.save_draft") || "Lưu bản nháp thành công!");
        navigate("/home");
        } catch (err: any) {
            if(err?.status == 422){
                toast.error(t("notify.error.post_not_empty") || "Tiêu đề và nội dung không được để trống");
            } else {
                toast.error(t("notify.error.save_draft_failed") || err?.message || "Lưu bản nháp thất bại!");
            }
        } finally {
            setLoading(false);
        }
    };

    const updatePost = async (id: string, post: PostUpdate) => {
        setLoading(false)
        try {
            await postService.updatePost(id, post);
            toast.success(t("notify.success.update_post") || "Cập nhật bài viết thành công!");
            navigate("/home")
        } catch (err: any) {
            if(err?.status == 422){
                toast.error(t("notify.error.post_not_empty") || "Tiêu đề và nội dung không được để trống");
            } else {
                toast.error(t("notify.error.update_failed") || err?.message || "Cập nhật thất bại!");
            }
        } finally {
            setLoading(false);
        }
    }

    const updateDraftPost = async (id: string, post: PostUpdate) => {
        handlePost(post, false, "Lưu bài viết thành bản nháp.", "Cập nhật thất bại!", true, id);
    }

    const deletePost = async (id: string) => {
        setLoading(true);
        try {
            await postService.deletePost(id);
            toast.success(t("notify.success.delete_post") || "Xóa bài viết thành công!");
        } catch (err: any){
            toast.error(t("notify.error.delete_failed") || err?.message || "Xóa bài viết thất bại!");
        } finally {
            setLoading(false);
        }
    }

    return { 
        posts, 
        loading, 
        error, 
        post, 
        articles,
        getUserArticles,
        getPostById, 
        getPostByUserId, 
        publishPost, 
        saveDraft,
        updatePost,
        updateDraftPost,
        deletePost
    };
}