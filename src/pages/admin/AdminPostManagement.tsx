import AdminPostList from "./AdminPostList";
import AdminPostsStats from "./AdminPostsStats";
import PostStatusRate from "./PostStatusRate";

const AdminPostManagement = () => {
    return (
        <div className="flex flex-col gap-3 p-5">
            <div className="flex gap-3">
                <div className="flex-2">
                    <AdminPostsStats />
                </div>

                <div className="flex-1">
                    <PostStatusRate />
                </div>
            </div>

            <AdminPostList />
        </div>
    )
}

export default AdminPostManagement;