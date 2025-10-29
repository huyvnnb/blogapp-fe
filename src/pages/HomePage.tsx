import { useEffect, useTransition } from "react";
import ArticleCard from "../components/article-card";
import { useUser } from "../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { usePost } from "../hooks/usePost";
import { Button } from "@/components/ui/button";
import { PostStatus } from "@/interface/posts";
import { useAuth } from "@/hooks/useAuth";
import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import Loading from "@/components/loading";

const HomePage = () => {
	const {myArticles, getMyArticles, loading, error } = useUser();
    const {deletePost} = usePost();
    const { me } = useAuth();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleClick = () => {
        navigate("/posts/new");
    };

    useEffect(() => {
    const fetchData = async () => {
        try {
            await getMyArticles();
        } catch (err) {
        console.error(err);
        }
    };

    fetchData();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await deletePost(id);
            await getMyArticles(); 
        } catch (err) {
            console.error(err);
        }
    };

    if (loading)
        return (
            <Loading />
        );

    if (error)
        return (
        <div className="text-center text-red-500 mt-4">
            Error: {error}
        </div>
        );

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-text mb-4">{t("post.post")}</h1>
                <Button onClick={handleClick} className="flex items-center gap-2 cursor-pointer">
                    <Plus className="w-4 h-4" />
                    { t("post.new_post") }
                </Button>
            </div>

            { myArticles.length === 0 ? (
                <div>
                    <div className="text-center text-gray-500 mt-4">
                        {t("post.no_post")}
                    </div>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 gap-6">
                    {myArticles.map((post) => (
                    <ArticleCard
                        key={post.id}
                        id={post.id}
                        title={post.title}
                        summary={post.summary || ""}
                        is_public={post.is_public || false}
                        published={post.published || false}
                        status={post.status || PostStatus.APPROVE}
                        created_at={post.created_at || "undefined" }
                        href={`/posts/${post.id}`}
                        user_id={me?.id}
                        onDelete={() => handleDelete(post.id)}
                    />
                    ))}
                </div>
            )}
        </div>
    );
} 

export default HomePage;