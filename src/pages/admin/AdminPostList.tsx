import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "react-toastify";
import { CheckIcon, XIcon, EyeIcon, RefreshCw } from "lucide-react";
import { format } from "date-fns";
import { adminService } from "@/service/adminService";
import type { AdminPost } from "@/interface/admin";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import MarkdownPreview from "@/components/markdown-preview";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTranslation } from "react-i18next";

const AdminPostList = () => {
  const [posts, setPosts] = useState<AdminPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<AdminPost | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    fetchPendingPosts();
  }, []);

  const fetchPendingPosts = async () => {
    setLoading(true);
    try {
      const res = await adminService.getPendingPost();
      setPosts(res);
    } catch (err) {
      toast.error("Không thể tải danh sách bài viết!");
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = async (id: string) => {
    try {
      setLoadingDetail(true);
      const res = await adminService.getPostDetail(id);
      setSelectedPost(res);
      setOpenDialog(true);
    } catch {
      toast.error("Không thể tải chi tiết bài viết!");
    } finally {
      setLoadingDetail(false);
    }
  };

  const handleUpdateStatus = async (id: string, status: "approve" | "reject") => {
    try {
      await adminService.updatePostStatus(id.toString(), status);
      toast.success(`Bài viết đã được ${status === "approve" ? "duyệt" : "từ chối"}`);
      setPosts((prev) => prev.filter((p) => p.id !== id));
      setOpenDialog(false);
    } catch {
      toast.error("Cập nhật trạng thái thất bại!");
    }
  };

  return (
    <div className="">
      {/* <Card className="border border-border/50">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold">Bài viết chờ duyệt</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchPendingPosts}
            disabled={loading}
            className="flex items-center gap-1"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Làm mới
          </Button>
        </CardHeader>
        <CardContent>
          {posts.length === 0 ? (
            <p className="text-muted-foreground text-center py-6">
              Không có bài viết nào đang chờ duyệt.
            </p>
          ) : (
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="text-left p-3">Tiêu đề</th>
                  <th className="text-left p-3">Tác giả</th>
                  <th className="text-left p-3">Ngày tạo</th>
                  <th className="text-center p-3">Trạng thái</th>
                  <th className="text-center p-3">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr
                    key={post.id}
                    className="border-b hover:bg-muted/20 transition-colors"
                  >
                    <td 
                      className="p-3 font-medium"
                      onClick={() => handlePreview(post.id.toString())}
                      
                    >{post.title}</td>
                    <td className="p-3">{post.author_name}</td>
                    <td className="p-3 text-muted-foreground">
                      {format(new Date(post.created_at), "dd/MM/yyyy HH:mm")}
                    </td>
                    <td className="text-center p-3">
                      <Badge variant="outline" className="capitalize">
                        {post.status}
                      </Badge>
                    </td>
                    <td className="text-center p-3 flex justify-center gap-2">
                      <Button
                        size="icon"
                        className="h-6 w-6 rounded-full bg-green-600 hover:bg-green-500"
                        onClick={() => handleUpdateStatus(post.id, "approve")}
                      >
                        <CheckIcon className="w-4 h-4 text-white" />
                      </Button>

                      <Button
                        size="icon"
                        className="h-6 w-6 rounded-full bg-red-500 hover:bg-red-600"
                        onClick={() => handleUpdateStatus(post.id, "reject")}
                      >
                        <XIcon className="w-4 h-4 text-white" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card> */}
      <Card className="border border-border/50 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="leading-none font-semibold">{t("report.pending_post")}</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchPendingPosts}
            disabled={loading}
            className="flex items-center gap-1"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            {t("report.refresh")}
          </Button>
        </CardHeader>

        <CardContent>
          {posts.length === 0 ? (
            <p className="text-muted-foreground text-center py-6">
              {t("report.no_pending_post")}
            </p>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("admin.title")}</TableHead>
                    <TableHead>{t("admin.author")}</TableHead>
                    <TableHead>{t("admin.created_at")}</TableHead>
                    <TableHead className="text-center">{t("admin.status")}</TableHead>
                    <TableHead className="text-center">{t("admin.action")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {posts.map((post) => (
                    <TableRow
                      key={post.id}
                      className="hover:bg-muted/50 transition-colors"
                    >
                      <TableCell
                        className="font-medium cursor-pointer hover:underline"
                        onClick={() => handlePreview(post.id)
                        }
                      >
                        {post.title}
                      </TableCell>
                      <TableCell>{post.author_name}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {format(new Date(post.created_at), "dd/MM/yyyy HH:mm")}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="capitalize">
                          {post.status === "pending" ? t("admin.pending") : post.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="flex justify-center gap-2">
                        <Button
                          size="icon"
                          className="h-7 w-7 rounded-full bg-green-600 hover:bg-green-500"
                          onClick={() => handleUpdateStatus(post.id, "approve")}
                        >
                          <CheckIcon className="w-4 h-4 text-white" />
                        </Button>
                        <Button
                          size="icon"
                          className="h-7 w-7 rounded-full bg-red-500 hover:bg-red-600"
                          onClick={() => handleUpdateStatus(post.id, "reject")}
                        >
                          <XIcon className="w-4 h-4 text-white" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto animate-in fade-in-0 zoom-in-95 duration-200">
          {selectedPost && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold">{selectedPost.title}</DialogTitle>
                <p className="text-sm text-muted-foreground">
                  {selectedPost.author_name} •{" "}
                  {format(new Date(selectedPost.created_at), "dd/MM/yyyy HH:mm")}
                </p>
              </DialogHeader>

              <div className="mt-4 space-y-4">
                {selectedPost.summary && (
                  <p className="text-gray-700 italic">{selectedPost.summary}</p>
                )}
                <div
                  className="prose prose-sm dark:prose-invert max-w-none"
                  // dangerouslySetInnerHTML={{ __html: selectedPost.content || ""}}
                >
                  <MarkdownPreview content={selectedPost.content || ""} />
                </div>
              </div>

              <DialogFooter className="flex justify-end gap-2 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setOpenDialog(false)}
                >
                  Đóng
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleUpdateStatus(selectedPost.id, "reject")}
                >
                  Từ chối
                </Button>
                <Button
                  className="bg-green-500 hover:bg-green-600 text-white"
                  onClick={() => handleUpdateStatus(selectedPost.id, "approve")}
                >
                  Duyệt bài
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPostList;
