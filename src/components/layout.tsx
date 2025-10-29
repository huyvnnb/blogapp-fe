import React, { useState } from "react";
import { AppSidebar } from "./app-sidebar";
import Navbar from "./navbar";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <AppSidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div
        className={`flex flex-col flex-1 transition-all duration-300 ${
          collapsed ? "ml-16" : "ml-64"
        }`}
      >
        <Navbar />
        <main className="flex-1 overflow-auto bg-muted/10 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
