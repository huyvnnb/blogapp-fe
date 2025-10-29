import { Link, useLocation } from "react-router-dom";
import { Home, SquarePen, ClipboardList, PanelLeft, BookOpen } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const AppSidebar = ({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const location = useLocation();
  const [hoverLogo, setHoverLogo] = useState(false);
  const { t } = useTranslation();

  const navItems = [
    { title: t("sidebar.home"), icon: <Home size={18} />, to: "/home", testId: "home" },
    { title: t("sidebar.create_post"), icon: <SquarePen size={18} />, to: "/posts/new", testId:"new-post" },
    { title: t("sidebar.dashboard"), icon: <ClipboardList size={18} />, to: "/dashboard", testId: "dashboard" },
  ];

  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-white dark:bg-gray-900 border-r transition-all duration-100 
        ${collapsed ? "w-16" : "w-64"}
      `}
    >
      <div
        className={`flex items-center ${
          collapsed ? "justify-center" : "justify-between"
        } px-4 py-3`}
      >
        <div
          className="flex items-center gap-2 relative"
          onMouseEnter={() => setHoverLogo(true)}
          onMouseLeave={() => setHoverLogo(false)}
        >
          {collapsed ? (
            hoverLogo ? (
              <button
                onClick={() => setCollapsed(false)}
                className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
              >
                <PanelLeft size={18} />
              </button>
            ) : (
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-primary font-normal">
                <BookOpen />
              </div>
            )
          ) : (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-primary font-bold">
                <BookOpen />
              </div>
              <span className="font-semibold text-lg">Blogly</span>
            </div>
          )}
        </div>

        {!collapsed && (
          <button
            onClick={() => setCollapsed(true)}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-200"
          >
            <PanelLeft size={18} />
          </button>
        )}
      </div>

      {/* Menu */}
      <nav className="flex flex-col mt-4 space-y-1" data-testid="app-sidebar">
        {navItems.map((item) => {
          const isActive = location.pathname.startsWith(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              data-testid={`nav-${item.testId}`}
              className={`flex items-center gap-3 px-2 py-2 rounded-md transition-colors mx-2
                ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
                }
                ${collapsed ? "justify-center" : ""}
              `}
            >
              {item.icon}
              {!collapsed && (
                <span className="text-sm font-medium">{item.title}</span>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};
