export interface AdminPost {
  id: string;
  title: string;
  summary?: string;
  content?: string;
  author_id: number;
  author_name: string;
  created_at: string;
  status: "pending" | "approved" | "rejected";
}