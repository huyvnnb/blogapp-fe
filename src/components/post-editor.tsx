import { useState } from "react";
import MarkdownPreview from "./markdown-preview";

export default function PostEditor() {
    const [content, setContent] = useState("");
    const [isPreview, setIsPreview] = useState(false);
    

    return (
        <div className="p-4 max-w-5xl mx-auto">
            <h2 className="text-xl font-bold mb-4">Tạo bài viết</h2>

            {!isPreview ? (
            <>
                <textarea
                    placeholder="Viết nội dung ở đây..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full h-64 p-2 border rounded mb-4"
                />
                <button
                    onClick={() => setIsPreview(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                Xem trước
                </button>
            </>
            ) : (
            <div className="flex gap-6">
                <textarea
                placeholder="Viết nội dung ở đây..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-1/2 h-[500px] p-2 border rounded font-mono"
                />

                <MarkdownPreview content={content} />
            </div>
            )}
        </div>
    );
}