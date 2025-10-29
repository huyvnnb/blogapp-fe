import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, Users, FileText, Settings, ShieldCheckIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AdminDashboardPage = () => {
  const { me, logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <ShieldCheckIcon className="w-8 h-8 text-primary" />
            {t("admin.admin_dashboard")}
          </h1>
          <Button variant="destructive" onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />
            {t("navbar.logout")}
          </Button>
        </header>

        <section className="grid gap-6 md:grid-cols-3">
          {/* <Card className="shadow-md hover:shadow-lg transition">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="h-5 w-5 text-primary" />
                Quản lý người dùng
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                Xem, khóa, hoặc chỉnh sửa thông tin tài khoản.
              </p>
              <Button className="mt-3 w-full" variant="outline">
                Truy cập
              </Button>
            </CardContent>
          </Card> */}

          <Card className="shadow-md hover:shadow-lg transition">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileText className="h-5 w-5 text-primary" />
                {t("admin.post_management")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                {t("admin.post_manage_desc")}
              </p>
              <Button 
                className="mt-3 w-full" 
                variant="outline"
                onClick={() => navigate("/admin/posts")}
                >
                {t("admin.access")}
              </Button>
            </CardContent>
          </Card>

          {/* <Card className="shadow-md hover:shadow-lg transition">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Settings className="h-5 w-5 text-primary" />
                Cài đặt hệ thống
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                Tùy chỉnh cấu hình, phân quyền, hoặc cài đặt thông báo.
              </p>
              <Button className="mt-3 w-full" variant="outline">
                Truy cập
              </Button>
            </CardContent>
          </Card> */}
        </section>

        {/* <footer className="text-center text-gray-500 text-sm mt-10">
          {me ? (
            <>
              Đăng nhập với tư cách:{" "}
              <span className="font-medium text-gray-700">{me.username}</span>
            </>
          ) : (
            "Đang tải thông tin..."
          )}
        </footer> */}
      </div>
    </div>
  );
};

export default AdminDashboardPage;
