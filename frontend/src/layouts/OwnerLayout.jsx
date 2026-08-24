import { useState } from "react";
import { Menu } from "lucide-react";

import { Outlet } from "react-router-dom";

import Sidebar from "../components/owner/Sidebar";

function OwnerLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="min-w-0 flex-1">
        {/* Mobile header */}
        <header className="flex h-14 items-center border-b border-border px-4 lg:hidden">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 text-text-secondary hover:bg-surface hover:text-text"
            aria-label="Open sidebar"
          >
            <Menu size={22} />
          </button>

          <span className="ml-3 text-sm font-semibold text-primary uppercase tracking-[0.18rem]">
            SlotDesk
          </span>
        </header>

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default OwnerLayout;
