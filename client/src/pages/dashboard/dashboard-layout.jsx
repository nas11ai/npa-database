import { useState, useEffect } from "react";

import { Aside } from "./aside";
import { Header } from "./header";

export const DashboardLayout = ({ children }) => {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  useEffect(() => {
    setSidebarIsOpen(window.innerWidth >= 768);
  }, []);

  return (
    <>
      <Aside sidebarIsOpen={sidebarIsOpen} onSidebarIsOpen={setSidebarIsOpen} />
      <div className="relative flex w-full flex-[2] flex-col">
        <Header handleSidebarIsOpen={setSidebarIsOpen} />
        <main className="h-screen overflow-auto p-5">{children}</main>
      </div>
    </>
  );
};
