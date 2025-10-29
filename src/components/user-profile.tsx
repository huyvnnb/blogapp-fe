import { useAuth } from "@/hooks/useAuth";
import React from "react";

type UserProfileProps = {
  username?: string;
  display_name?: string;
  avatarUrl?: string;
};

const UserProfile: React.FC<UserProfileProps> = ({ username, display_name, avatarUrl }) => {
    const [open, setOpen] = React.useState(false);
    const { logout } = useAuth();

    return (
        <div className="relative">
            <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-primary/10 w-full"
        >
            <img
            src={avatarUrl || "/img.png"}
            alt="User Avatar"
            className="w-10 h-10 rounded-full border border-primary"
            />
            <span className="font-medium text-text">{display_name}</span>

            </button>

            {open && (
            <div className="mt-3 p-3 bg-primary/5 rounded-lg space-y-2 animate-in fade-in slide-in-from-top-2">
                <a
                    href="/profile"
                    className="block text-sm hover:underline text-primary"
                >
                    Xem hồ sơ
                </a>
                <a
                    href="/settings"
                    className="block text-sm hover:underline text-primary"
                >
                    Cài đặt
                </a>
                <a
                    onClick={logout}
                    href="/logout"
                    className="block text-sm hover:underline text-accent"
                >
                    Đăng xuất
                </a>
            </div>
        )}
        </div>
    );
}

export default UserProfile;