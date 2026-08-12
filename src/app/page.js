"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import CreatePost from "@/components/CreatePost";
import PostCard from "@/components/PostCard/PostCard";
import RightPanel from "@/components/RightPanel/RightPanel";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen min-w-0 bg-background grain">
      <div className="hidden shrink-0 lg:block">
        <Sidebar />
      </div>
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open navigation"
          className="fixed left-3 top-[4.5rem] z-30 rounded-xl border border-gray-200/70 bg-white/90 p-3 text-gray-600 shadow-lg backdrop-blur transition-colors hover:text-emerald-600 dark:border-gray-800/70 dark:bg-gray-900/90 dark:text-gray-300 dark:hover:text-emerald-400"
        >
          <Menu className="h-5 w-5" />
        </button>
        <Sidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>

      <main className="min-w-0 flex-1 px-4 py-5 sm:px-6 sm:py-8 lg:px-10">
        <div className="mx-auto w-full max-w-2xl space-y-5">
          <CreatePost />

          <div className="space-y-5">
            <PostCard />
            
            
          </div>
        </div>
      </main>

      <RightPanel />
    </div>
  );
}
