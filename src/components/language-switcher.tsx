import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"
import { useTranslation } from "react-i18next"

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const {t} = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-1">
          <Globe className="w-4 h-4" />
          {i18n.language.toUpperCase()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-32">
        <DropdownMenuLabel>{t("navbar.language")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => changeLanguage("vi")}>{t("navbar.vietnamese")}</DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage("en")}>{t("navbar.english")}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
