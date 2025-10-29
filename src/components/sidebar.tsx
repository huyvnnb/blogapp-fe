import React from "react";
import UserProfile from "./user-profile";
import { useAuth } from "../context/AuthContext";
import { NavLink } from "react-router-dom";

const Sidebar: React.FC = () => {
  const {me} = useAuth()

  return (
    <aside className="w-64 bg-white text-text h-screen p-4">
      <div className="flex items-center justify-evenly gap-2 mb-6">
        <img src="/rss.svg" alt="Logo" className="h-10 w-auto"/>
        <span className="text-2xl font-bold">blog</span>
      </div>
      <UserProfile display_name={me?.display_name || "Unknown"} />
      <ul className="space-y-4">
        <li>
          <NavLink 
            to="/home"
            end
            className={({ isActive }) =>
              `block p-2 rounded transition ${
                isActive 
                  ? "bg-primary text-white font-medium"
                  : "hover:bg-gray-50 text-text"
              }`
            }
          >
            Trang chủ
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/posts/new"
            end
            className={({ isActive }) =>
              `block p-2 rounded transition ${
                isActive 
                  ? "bg-primary text-white font-medium"
                  : "hover:bg-gray-50 text-text"
              }`
            }
          >
            Viết bài
          </NavLink>
        </li>
        {/* <li>
          <a
            href="/posts/new"
            className="block hover:bg-blue-100 p-2 rounded transition"
          >
            Viết bài
          </a>
        </li>
        <li>
          <a
            href="/profile"
            className="block hover:bg-primary p-2 rounded transition"
          >
            Hồ sơ
          </a>
        </li> */}
      </ul>
    </aside>
  );
};

export default Sidebar;
