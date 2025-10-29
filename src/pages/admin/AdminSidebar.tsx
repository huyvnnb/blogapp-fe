import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Users, FileText, Settings, LayoutDashboard, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useTranslation } from "react-i18next";



export function AdminSidebar() {
  const location = useLocation();
  const { t } = useTranslation();
  const pathname = location.pathname;

  const menuItems = [
    { label: t("sidebar.home"), icon: <Home className="w-5 h-5" />, path: "/admin" },
    // { label: t("sidebar.user_manage"), icon: <Users className="w-5 h-5" />, path: "/admin/users" },
    { label: t("sidebar.post_manage"), icon: <FileText className="w-5 h-5" />, path: "/admin/posts" },
    // { label: t("sidebar.config"), icon: <Settings className="w-5 h-5" />, path: "/admin/settings" },
  ];

  return (
    <div className="h-screen w-64 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 flex flex-col">
      <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-800">
        <span className="font-bold text-lg">Admin Panel</span>
      </div>
      <ScrollArea className="flex-1 p-4">
        <nav className="flex flex-col space-y-2">
          {menuItems.map((item) => {
            const active = pathname === item.path;
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                  active ? "bg-gray-100 text-white" : "text-gray-700 dark:text-gray-200"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-4">
          <LanguageSwitcher />
        </div>
      </ScrollArea>
      {/* <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <Button variant="outline" className="w-full">
          {t("navbar.logout")}
        </Button>
      </div> */}
    </div>
  );
}
