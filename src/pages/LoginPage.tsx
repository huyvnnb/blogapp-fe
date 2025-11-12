import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Mail, Loader2 } from "lucide-react"
import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "@/components/language-switcher";

const LoginPage = () => {
    const navigate = useNavigate();
    const { login, isAuthenticated, error } = useAuth();
    const [form, setForm] = useState({ username: "", password: "" });
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();

    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/home");
        }
    }, [isAuthenticated]);

    const handleSubmit = async (e: React.FormEvent) => {
      setLoading(true);
        e.preventDefault();
        try {
            const success = await login(form.username, form.password);
            if (success) {
                toast.success(t("notify.success.login") || "Đăng nhập thành công!");
                navigate("/home");
            }
        } catch (err: any) {
            toast.error(error);
            // console.error(err);
        } finally {
          setLoading(false);
        }
    }

    return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>
      <Card className="w-[400px] shadow-lg border border-border/50">
        <CardHeader>
          <CardTitle className="text-2xl text-center">{t("login.title")}</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              name="username"
              placeholder={t("login.username") || "Username"}
              value={form.username}
              onChange={handleChange}
              data-testid="login-username"
              required
            />
            <Input
              type="password"
              name="password"
              placeholder={t("login.password") || "Password"}
              value={form.password}
              onChange={handleChange}
              data-testid="login-password"
              required
            />
            <Button type="submit" className="w-full" disabled={loading} data-testid="login-btn">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t("login.loging")}...
                </>
              ) : (
                t("login.title") || "Login"
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col items-center space-y-2 text-sm">
          <p className="text-muted-foreground">
            {t("login.not_have_account")}{" "}
            <span
              className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80 cursor-pointer transition-colors duration-200"
              onClick={() => navigate("/register")}
            >
              {t("login.register")}
            </span>
          </p>
          <p className="text-muted-foreground">
            <span
              className="text-primary hover:underline cursor-pointer"
              onClick={() => navigate("/admin")}
            >
              {t("login.go_to_admin")}
            </span>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default LoginPage;