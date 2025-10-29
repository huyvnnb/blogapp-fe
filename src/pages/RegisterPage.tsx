import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authService } from "../service/authService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "@/components/language-switcher";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    display_name: "",
    username: "",
    password: "",
  });
  const { t } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await authService.register(
        form.username,
        form.password,
        form.display_name
      );
      if (response) {
        toast.success(t("notify.success.register") || "Đăng ký thành công!");
        navigate("/login");
      }
    } catch (err: any) {
      toast.error(t("notify.error.register_failed") || "Đăng ký thất bại!");
    }
  };

  // const handleGoogleRegister = () => {
  //   window.location.href = "http://localhost:5000/auth/google";
  // };

  // const handleGithubRegister = () => {
  //   window.location.href = "http://localhost:5000/auth/github";
  // };

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/40">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>
      <Card className="w-[400px] shadow-lg border border-border">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">
            {t("login.register")}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              name="display_name"
              placeholder={t("login.display_name") || "Display Name"}
              value={form.display_name}
              onChange={handleChange}
            />
            <Input
              type="text"
              name="username"
              placeholder={t("login.username") || "Username"}
              value={form.username}
              onChange={handleChange}
            />
            <Input
              type="password"
              name="password"
              placeholder={t("login.password") || "Password"}
              value={form.password}
              onChange={handleChange}
            />
            <Button type="submit" className="w-full">
              {t("login.register")}
            </Button>
          </form>

          {/* <div className="flex items-center gap-2 my-6">
            <Separator className="flex-1" />
            <span className="text-sm text-muted-foreground">hoặc đăng ký bằng</span>
            <Separator className="flex-1" />
          </div>

          <div className="flex justify-center gap-3">
            <Button
              variant="outline"
              className="flex items-center gap-2 w-1/2"
              onClick={handleGoogleRegister}
            >
              <FcGoogle size={20} /> Google
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2 w-1/2"
              onClick={handleGithubRegister}
            >
              <FaGithub size={20} /> GitHub
            </Button>
          </div> */}
        </CardContent>

        <CardFooter className="flex justify-center text-sm text-muted-foreground">
          {t("login.already_have_account")}{" "}
          <Button
            variant="link"
            className="ml-1 p-0 text-blue-500"
            onClick={() => navigate("/login")}
          >
            {t("login.title")}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegisterPage;
