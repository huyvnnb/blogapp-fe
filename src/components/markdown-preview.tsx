import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import "highlight.js/styles/github.css";

export default function MarkdownPreview({ content }: { content: string }) {
    return (
        <div className="prose prose-blue max-w-none border border-blue-100 bg-white rounded-xl p-4 overflow-x-auto" data-testid="post-content">
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeHighlight]}
        >
            {content || "*Không có nội dung*"}
        </ReactMarkdown>
        </div>
    );
}