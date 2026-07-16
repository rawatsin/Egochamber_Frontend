"use client";

import Link from "next/link";
import { Search, Bell, LogIn, PenLine, Menu, X } from "lucide-react";
import ThemeToggle from "../Theme-Toggle/ThemeToggle";
import useAuth from "@/hooks/useAuth";
import { useState } from "react";

export default function Header() {
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-gray-950/80 backdrop-blur-lg border-b border-gray-200/60 dark:border-gray-800/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Left: Logo & Desktop Nav */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            {/* Modern Gradient Logo */}
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-emerald-500 to-teal-600 shadow-sm shadow-emerald-500/20 transition-transform group-hover:scale-105">
              <span className="text-lg font-bold text-white">M</span>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight hidden sm:inline">
              Marginalia
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {[
              { label: "Feed", href: "/" },
              { label: "Topics", href: "/comingsoon" },
              { label: "Saved", href: "/comingsoon" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 rounded-lg transition-all hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Desktop Search */}
          <div className="relative hidden md:block">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
            <input
              placeholder="Search discussions, topics..."
              className="h-10 w-64 lg:w-80 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 pl-10 pr-14 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 font-sans text-[11px] font-medium text-gray-400 dark:text-gray-500 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md px-1.5 py-0.5 shadow-sm">
              ⌘K
            </kbd>
          </div>

          {/* Mobile Search Icon */}
          <button className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors">
            <Search className="h-5 w-5" />
          </button>

          <ThemeToggle />

          {/* Notifications */}
          <button
            aria-label="Notifications"
            className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors relative"
          >
            <Bell className="h-5 w-5" />
            {/* Subtle notification dot */}
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-gray-950"></span>
          </button>

          {/* Auth / Login */}
          {!user && (
            <Link
              href="/auth/login"
              className="hidden sm:inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Log in
            </Link>
          )}

          {/* Write Button */}
          <Link
            href="/create"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-linear-to-r from-emerald-500 to-teal-600 text-white text-sm font-semibold shadow-sm shadow-emerald-500/20 hover:shadow-md hover:shadow-emerald-500/30 hover:-translate-y-0.5 transition-all duration-200"
          >
            <PenLine className="h-4 w-4" />
            <span>Write</span>
          </Link>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-4 py-4 space-y-1 animate-in fade-in slide-in-from-top-2 duration-200">
           {/* Mobile Search */}
           <div className="relative mb-3">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input placeholder="Search..." className="h-10 w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 pl-10 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40" />
           </div>
           
           {/* Mobile Nav Links */}
           {[
              { label: "Feed", href: "/" },
              { label: "Topics", href: "/topics" },
              { label: "Saved", href: "/saved" },
            ].map((item) => (
              <Link 
                key={item.label} 
                href={item.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
              >
                {item.label}
              </Link>
            ))}
            
            {!user && (
               <Link 
                 href="/auth/login" 
                 className="block px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
               >
                 Log in
               </Link>
            )}
            
            {/* Mobile Write Button */}
            <Link 
              href="/create" 
              className="flex items-center justify-center gap-2 mt-2 px-4 py-2.5 rounded-lg bg-linear-to-r from-emerald-500 to-teal-600 text-white text-sm font-semibold"
            >
              <PenLine className="h-4 w-4" />
              Write a post
            </Link>
        </div>
      )}
    </header>
  );
}