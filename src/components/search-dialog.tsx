import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { NotebookText, Search, User, X } from "lucide-react"
import type { Cursor, PostSearch } from "@/interface/posts"
import { postService } from "@/service/postService"
import { debounce } from "lodash"
import { Link, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

export const SearchDialogCustom = () => {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const [posts, setPosts] = useState<PostSearch[]>([]);
  const [cursor, setCursor] = useState<Cursor>({});
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();

  const navigate = useNavigate();


  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  useEffect(() => {
    console.log("LastID: ", cursor.last_id);
    console.log("LastRank: ", cursor.last_rank)
  }, [cursor]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [])

  const listRef = useRef<HTMLDivElement>(null);

  const hotKeywords = [
    "Artificial Intelligence",
    "React",
    "Python",
    "Kubernetes",
    "AWS",
    "Flask"
  ]

  const handleKeywordClick = (keyword: string) => {
    setQuery(keyword)
  }

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    if (target.scrollTop + target.clientHeight >= target.scrollHeight - 50) {
      loadPosts(query);
    }
  };

  async function loadPosts(searchQuery: string, limit = 10) {
    if (!hasMore || loading) return;
    setLoading(true);

    try {
      const response = await postService.searchPosts({
        query: searchQuery,
        limit,
        last_rank: cursor.last_rank,
        last_id: cursor.last_id,
      });

      if (response.posts.length > 0) {
        setPosts(prev => [...prev, ...response.posts]);
        setCursor(response.cursor);
        setHasMore(response.has_more);
      } else {
        setHasMore(false);
      }
    } finally {
      setLoading(false);
    }
  }

  const debounceLoad = useRef(
    debounce(async (q: string) => {
      setPosts([]);
      setCursor({});
      setHasMore(true);
      await loadPosts(q);
    }, 500)
  ).current


  // useEffect(() => {
  //   if (open) {
  //       setPosts([]);
  //       setCursor({});
  //       setHasMore(true);
  //       loadPosts(query);
  //   }
  // }, [open]);

  useEffect(() => {
    if (query.trim()) {
      debounceLoad(query)
    } else {
      setPosts([])
      setCursor({})
      setHasMore(true)
    }
  }, [query])


  return (
    <>
      <Button
        variant="outline"
        className="flex items-center gap-2 text-muted-foreground w-40 justify-start"
        onClick={() => setOpen(true)}
      >
        <Search className="h-4 w-4 text-muted-foreground" />
        <span>{t("navbar.search")}...</span>
      </Button>

      {open && (
        <div
          className="fixed inset-0 flex items-start justify-center pt-24 z-50"
          onClick={() => setOpen(false)}
        >
          <div
            className="
              bg-background border rounded-2xl shadow-2xl 
              w-[700px] max-w-[90vw]
              overflow-hidden
            "
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ô nhập */}
            <div className="flex items-center px-4 py-3">
              <Search className="h-4 w-4 text-muted-foreground mr-2" />
              <Input
                ref={inputRef}
                placeholder="Nhập từ khóa..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="border-0 focus-visible:ring-0 focus:ring-0 outline-none shadow-none bg-transparent text-base"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="p-1 hover:bg-muted rounded-md"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="h-px bg-border" />

            <div
              ref={listRef}
              className="p-4 max-h-64 overflow-y-auto"
              onScroll={handleScroll}
            >
              {query ? (
                posts.length > 0 ? (
                  posts.map(post => (
                    <div
                      key={post.id}
                      className="block p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                      onClick={() => {
                        navigate(`/posts/${post.id}`)
                        setOpen(false)
                      }}
                    >
                      <p className="font-medium line-clamp-1 text-gray-900">
                        {post.title}
                      </p>

                      <p className="font-normal text-muted-foreground line-clamp-2 mt-1">
                        {post.summary}
                      </p>

                      <div className="flex items-center gap-1.5 mt-2 text-xs text-gray-500">
                        <User className="w-3.5 h-3.5" />
                        <Link
                          to={`/users/${post.user_id}/posts`}
                          onClick={(e) =>{
                            e.stopPropagation(),
                            setOpen(false)
                          }}
                          className="hover:underline"
                        >
                          {post.username || "Không rõ tác giả"}
                        </Link>
                      </div>
                    </div>
                  ))
                ) : !hasMore ? (
                  <div className="text-center text-gray-400 py-4">
                    {t("navbar.search_not_found")} 😢
                  </div>
                ) : (
                  <div className="text-center text-gray-400 py-4">
                    {t("load")}...
                  </div>
                )
              ) : (
                <div>
                  <p className="text-sm text-muted-foreground mb-3">
                    🔥 {t("navbar.hot_keyword")}:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {hotKeywords.map((keyword) => (
                      <button
                        key={keyword}
                        onClick={() => handleKeywordClick(keyword)}
                        className="
                          text-sm px-3 py-1.5 
                          rounded-full border border-border
                          hover:bg-muted transition-colors
                        "
                      >
                        {keyword}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {!hasMore && posts.length > 0 && (
              <div className="text-center text-xs text-gray-400 py-2">{t("navbar.search_end")}</div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
