import type React from "react";
type UserCardProps = {
    username: string,
    display_name: string,
    avatarUrl?: string
}

const UserCard: React.FC<UserCardProps> = ({ username, display_name, avatarUrl }) => {
    return (
        <div className="flex items-center gap-4 w-full p-5 rounded-2xl border border-gray-200 shadow-md mb-5 bg-gradient-to-r from-white to-gray-50 hover:shadow-lg transition">
            <img 
                src={avatarUrl || "/img.png"} 
                alt="User Avatar" 
                className="w-16 h-16 rounded-full object-cover"
            />
            <div className="flex flex-col">
                <h2 className="text-lg font-semibold text-gray-800">
                    { display_name || "Unknown" }
                </h2>
                <p className="text-sm text-gray-500 leading-snug">
                    @{ username || "undefined" }
                </p>
            </div>
        </div>
    )
}

export default UserCard;