"use client";

import { useContext, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Flame, Bookmark, ChevronsLeft, ChevronsRight, User, LogIn, LogOut, Plus } from "lucide-react";
import { AuthContext } from "@/context/AuthContext";

const items = [
  { name: "Feed", icon: Home, href: "/" },
  { name: "Popular", icon: Flame, href: "/comingsoon" },
  { name: "Saved", icon: Bookmark, href: "/comingsoon" },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const pathname = usePathname();

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <aside
      className={`sticky top-16 flex h-[calc(100vh-4rem)] flex-col border-r border-gray-200/60 dark:border-gray-800/60 bg-white dark:bg-gray-950 transition-all duration-300 ease-in-out ${
        collapsed ? "w-19" : "w-64"
      }`}
    >
      {/* Top: Collapse Toggle */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800/50">
        {!collapsed && (
          <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
            Navigation
          </span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`p-2 rounded-lg text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-all ${
            collapsed ? "mx-auto" : ""
          }`}
          aria-label={collapsed ? "Expand menu" : "Collapse menu"}
        >
          {collapsed ? <ChevronsRight className="h-4 w-4" /> : <ChevronsLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* Middle: Navigation Links */}
      <nav className="flex flex-col gap-1 p-3 flex-1 overflow-y-auto">
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/60 hover:text-gray-900 dark:hover:text-white"
              }`}
              title={collapsed ? item.name : ""}
            >
              {/* Active Indicator Dot */}
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 rounded-r-full bg-emerald-500" />
              )}
              
              <item.icon className={`h-5 w-5 shrink-0 transition-colors ${
                isActive ? "text-emerald-600 dark:text-emerald-400" : "text-gray-400 dark:text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300"
              }`} />
              
              {!collapsed && <span className="truncate">{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom: User Profile & Actions */}
      <div className="p-3 border-t border-gray-100 dark:border-gray-800/50">
        {user ? (
          <div className="space-y-2">
            {/* User Card */}
            <div className="flex items-center gap-3 p-2 rounded-xl bg-gray-50 dark:bg-gray-900/50 ring-1 ring-gray-200/50 dark:ring-gray-800/50">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-emerald-500 to-teal-600 shadow-sm ring-2 ring-white dark:ring-gray-950">
                <span className="text-xs font-bold text-white">
                  {user.username[0].toUpperCase()}
                </span>
              </div>
              {!collapsed && (
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                    {user.username}
                  </p>
                  <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                    {user.email}
                  </p>
                </div>
              )}
            </div>

            {/* Logout Button */}
            <button
              onClick={logout}
              className="cursor-pointer flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400 transition-all"
              title={collapsed ? "Log out" : ""}
            >
              <LogOut className="h-5 w-5 shrink-0" />
              {!collapsed && <span>Log out</span>}
            </button>
          </div>
        ) : (
          <Link
            href="/auth/login"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/60 hover:text-gray-900 dark:hover:text-white transition-all"
            title={collapsed ? "Log in" : ""}
          >
            <LogIn className="h-5 w-5 shrink-0" />
            {!collapsed && <span>Log in</span>}
          </Link>
        )}
      </div>
    </aside>
  );
}