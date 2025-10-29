import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, User } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { LanguageSwitcher } from "./language-switcher"
import { useTranslation } from "react-i18next"
import { SearchDialogCustom } from "./search-dialog"

const Navbar = () => {
  const { isAuthenticated, logout, me } = useAuth();
  const { t } = useTranslation();

  return (
    <header className="flex items-center justify-between px-6 h-16 border-b bg-background">
      <nav className="flex items-center gap-6 text-sm font-medium">
        <Link
          to="/home"
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          {t("navbar.posts")}
        </Link>
        <Link
          to="/explore"
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          {t("navbar.explore")}
        </Link>
      </nav>
      <SearchDialogCustom />

      <div className="flex items-center gap-4">
        <LanguageSwitcher />
        {isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={me?.avatarUrl || "/avatars/default.png"}
                    alt={me?.display_name || "User"}
                  />
                  <AvatarFallback>
                    {me?.display_name?.[0]?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{me?.username || "User"}</span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>{t("navbar.account")}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile" className="flex items-center gap-2">
                  <User className="h-4 w-4" /> {t("navbar.profile")}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="flex items-center gap-2 text-red-600 focus:text-red-700"
                onClick={logout}
              >
                <LogOut className="h-4 w-4" /> {t("navbar.logout")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link to="/login">Đăng nhập</Link>
            </Button>
            <Button asChild>
              <Link to="/register">Đăng ký</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}

export default Navbar;

