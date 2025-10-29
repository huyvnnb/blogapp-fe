import { useParams } from "react-router-dom";
import ArticleCard from "../components/article-card";
import { usePost } from "../hooks/usePost";
import { useEffect } from "react";
import { useUser } from "../hooks/useUser";
import UserCard from "../components/user-card";
import UserPostHeatmap from "./report/PostHeatmap";


const UserPostPage = ()=> {
    const { id } = useParams<{ id: string }>();
    const userId = id || "";

    const {loading, error, articles, getUserArticles} = usePost();
    const { user, getUserById } = useUser();

    useEffect(() => {
        const fetchArticles = async () => {
            if (userId) {
                await getUserArticles(userId);
            }
        };
        fetchArticles();
    }, [userId]);

    useEffect(() => {
        const fetchUser = async () => {
            if(userId){
                await getUserById(userId);
            };
        };
        fetchUser();
    }, [userId])

    if (loading)
        return (
        <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        );

    if (error)
        return (
        <div className="text-center text-red-500 mt-4">
            Error: {error}
        </div>
        );

    return (
        <div className="space-y-6 p-4">
            <UserCard 
                username={user?.username || "Unknown"} 
                display_name={user?.display_name || "Unknown"}
            />
            <UserPostHeatmap user_id={userId} />
            <h1 className="text-3xl font-bold mb-4">Posts</h1>

            { articles.length === 0 ? (
                <div className="text-center text-gray-500 mt-4">
                    No data
                </div>
            ) : (
                <div className="grid md:grid-cols-2 gap-6">
                    {articles.map((post) => (
                    <ArticleCard
                        key={post.id}
                        id={post.id}
                        title={post.title}
                        summary={post.summary || ""}
                        author={post.author?.username || "unknown"}
                        authorId={post.author?.id}
                        created_at={post.created_at || new Date().toISOString()}
                        href={`/posts/${post.id}`}
                    />
                    ))}
                </div>
            )}
            
        </div>
    );
}
    
export default UserPostPage;