import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from "react-i18next";

const AdminLoginPage = () => {
    const navigate = useNavigate();
    const { adminLogin, isAuthenticated, isAdmin, loading } = useAuth();
    const [form, setForm] = useState({ username: "", password: "" });
    const [submitting, setSubmitting] = useState(false);
    const { t } = useTranslation();
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        if (isAuthenticated && isAdmin) {
            navigate("/admin");
        }
    }, [isAuthenticated, isAdmin, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const success = await adminLogin(form.username, form.password);
            if (success) {
                toast.success("Đăng nhập quản trị thành công!");
                navigate("/admin/dashboard");
            } else {
                toast.error("Đăng nhập thất bại. Vui lòng kiểm tra lại.");
            }
        } catch (err: any) {
            toast.error(err.message || "Login failed");
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    }

    return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-[400px] shadow-lg border border-border/50">
        <CardHeader>
          <CardTitle className="text-2xl text-center">{t("login.admin")}</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              name="username"
              placeholder={t("login.username") || "Tên đăng nhập"}
              value={form.username}
              onChange={handleChange}
              disabled={submitting || loading}
              data-testid="admin-username"
              required
            />
            <Input
              type="password"
              name="password"
              placeholder={t("login.password") || "Mật khẩu"}
              value={form.password}
              onChange={handleChange}
              disabled={submitting || loading}
              data-testid="admin-password"
              required
            />
            <Button type="submit" className="w-full" disabled={loading} data-testid="admin-login-btn">
              {submitting || loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t("login.loging")}...
                </>
              ) : (
                t("login.login")
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center text-sm text-muted-foreground">
          <p>
            {t("login.not_is_admin")}{" "}
            <span
              className="text-primary hover:underline cursor-pointer"
              onClick={() => navigate("/login")}
            >
              {t("login.return_user")}
            </span>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default AdminLoginPage;