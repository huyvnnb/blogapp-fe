import { Link } from "react-router-dom";
import type { Post } from "../interface/posts";
import MarkdownPreview from "./markdown-preview";
import { UserRoundPen } from "lucide-react";

const PostDetail = ({...props}: Post) => {
    const {title, summary, content, created_at, author} = props;

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-2" data-testid="post-title">{title}</h1>

            {created_at && (
                <p className="text-gray-500 text-sm mb-4">
                    {new Date(created_at).toLocaleDateString()}
                </p>
            )}
            {author?.id && author.username && (
                <p className="text-sm text-gray-600 mb-4 flex items-center gap-1">
                <UserRoundPen className="font-normal h-4 w-4"/>
                <Link
                    to={`/users/${author.id}/posts`}
                    className="text-blue-600 hover:underline"
                >
                    {author.username}
                </Link>
                </p>
            )}

            {summary && <p className="text-gray-700 mb-6">{summary}</p>}

            <div className="prose max-w-none">
                <MarkdownPreview content={content} />
            </div>
        </div>
    );
};

export default PostDetail;