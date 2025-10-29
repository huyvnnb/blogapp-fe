import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { SquarePen, Trash2, ArrowRight, Globe, Lock, FileCheck, FileText, HelpCircle, XCircle, Clock } from "lucide-react";
import { toast } from "react-toastify";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { PostStatus } from "@/interface/posts";
import { Badge } from "./ui/badge";
import { useTranslation } from "react-i18next";

type ArticleCardProps = {
  id: string;
  title: string;
  summary: string;
  author?: string;
  authorId?: string;
  is_public?: boolean;
  published?: boolean;
  status?: PostStatus;
  created_at: string;
  href: string;
  user_id?: string;
  onDelete?: () => void;
};

const ArticleCard: React.FC<ArticleCardProps> = ({
  id,
  title,
  summary,
  author,
  authorId,
  created_at,
  is_public,
  published,
  status,
  href = "#",
  user_id,
  onDelete,
}) => {
  const { me } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleCardClick = () => navigate(href);
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/posts/edit/${id}`);
  };
  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Bạn có chắc muốn xóa bài viết này không?")) {
      try {
        await onDelete?.();
      } catch {
        toast.error("Xóa thất bại!");
      }
    }
  };

  const isAuthor = me?.id?.toString() === user_id?.toString();


  const statusStyle = {
    approve: "bg-green-100 text-green-700 border-green-300",
    pending: "bg-yellow-100 text-yellow-700 border-yellow-300",
    reject: "bg-red-100 text-red-700 border-red-300",
    default: "bg-gray-100 text-gray-700 border-gray-300",
  };

  return (
    <Card
      onClick={handleCardClick}
      className="group cursor-pointer transition-all duration-200 hover:shadow-md hover:border-primary/40"
      data-testid="post-item"
    >
      <CardHeader className="space-y-1">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold leading-snug text-card-foreground group-hover:text-primary" data-testid='article-title'>
            {title}
          </CardTitle>

          {isAuthor && (
            <div className="flex gap-1">
              <Button
                size="icon"
                variant="ghost"
                className="text-blue-500 hover:text-blue-600"
                onClick={handleEdit}
                data-testid="article-edit"
              >
                <SquarePen size={18} strokeWidth={1.75} />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="text-red-500 hover:text-red-600"
                data-testid="article-delete"
                onClick={handleDelete}
              >
                <Trash2 size={18} strokeWidth={1.75} />
              </Button>
            </div>
          )}
        </div>

        {isAuthor && (
          <div className="flex flex-wrap gap-2 pt-1">
            {is_public && published && (
              <Badge
                variant="outline"
                className={statusStyle[status || "default"]}
                data-testid="article-status"
              >
                {status === PostStatus.PENDING && (
                  <>
                    <Clock className="w-4 h-4" />
                    {t("post.pending")}
                  </>
                )}

                {status === PostStatus.APPROVE && (
                  <>
                    <FileCheck className="w-4 h-4" />
                    {t("post.approve")}
                  </>
                )}

                {status === PostStatus.REJECT && (
                  <>
                    <XCircle className="w-4 h-4" />
                    {t("post.reject")}
                  </>
                )}

                {!status && (
                  <>
                    <HelpCircle className="w-4 h-4" />
                    Unknown
                  </>
                )}
              </Badge>
            )}

            {/* Public / Private */}
            <Badge
              variant="outline"
              data-testid="article-is-public"
              className={
                is_public
                  ? "bg-blue-100 text-blue-700 border-blue-300"
                  : "bg-gray-100 text-gray-700 border-gray-300"
              }
            >
              {is_public ? (
                <span className="flex items-center gap-1">
                  <Globe className="h-3.5 w-3.5" /> {t("post.public")}
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <Lock className="h-3.5 w-3.5" /> {t("post.private")}
                </span>
              )}
            </Badge>

            {/* Published / Draft */}
            <Badge
              variant="outline"
              data-testid="article-published"
              className={
                published
                  ? "bg-green-100 text-green-700 border-green-300"
                  : "bg-yellow-100 text-yellow-700 border-yellow-300"
              }
            >
              {published ? (
                <span className="flex items-center gap-1">
                  <FileCheck className="h-3.5 w-3.5" /> {t("post.publish")}
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <FileText className="h-3.5 w-3.5" /> {t("post.draft")}
                </span>
              )}
            </Badge>
          </div>
        )}


        <CardDescription className="text-muted-foreground">
          {new Date(created_at).toLocaleDateString()}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-card-foreground/90 leading-relaxed line-clamp-3">
          {summary}
        </p>
      </CardContent>

      <CardFooter className="flex justify-between items-center text-sm text-muted-foreground">
        {!isAuthor && (
          <div>
            {t("post.by")}{" "}
            <Link
              to={`/users/${authorId}/posts`}
              onClick={(e) => e.stopPropagation()}
              className="text-primary hover:underline font-medium"
            >
              {author || "unknown"}
            </Link>
          </div>
        )}
        

        <span className="flex items-center text-primary font-medium group-hover:translate-x-1 transition-transform">
          {t("post.read_more")} <ArrowRight className="ml-1 h-4 w-4" />
        </span>
      </CardFooter>
    </Card>
  );
};

export default ArticleCard;
