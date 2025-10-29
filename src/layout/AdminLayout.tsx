import { AdminSidebar } from "@/pages/admin/AdminSidebar";
import { Outlet } from "react-router-dom";
// import AdminUserManagement from "./AdminUserManagement";
// import AdminSettings from "./AdminSettings";

function AdminLayout() {
  return (
    <div className="flex">
      <div className="fixed left-0 top-0 h-screen w-64 bg-gray-100 border-r">
        <AdminSidebar />
      </div>

      <main className="flex-1 p-6 overflow-auto bg-white ml-64 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;