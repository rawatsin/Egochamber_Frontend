"use client";

import { PenLine, Image, Video } from "lucide-react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

export default function CreatePost() {
  const router = useRouter();
  const { user } = useAuth();

  // Get the user's initial for the avatar, fallback to "U"
  const userInitial = user?.username ? user.username[0].toUpperCase() : "U";

  return (
    <div className="rounded-2xl border border-gray-200/60 dark:border-gray-800/60 bg-white dark:bg-gray-900 p-5 transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-700">
      
      {/* Top row: Avatar & Input */}
      <div className="flex items-center gap-4">
        
        {/* Dynamic Gradient Avatar */}
        <div className="h-10 w-10 rounded-full bg-linear-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-sm ring-2 ring-white dark:ring-gray-900 shrink-0">
          <span className="text-sm font-bold text-white">
            {userInitial}
          </span>
        </div>

        {/* Modernized Input Trigger */}
        <button
          onClick={() => router.push("/create")}
          className="flex-1 text-left rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 px-4 py-3 text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:border-gray-300 dark:hover:border-gray-700 transition-all"
        >
          Start a discussion…
        </button>
      </div>

      {/* Actions Toolbar */}
      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800/80 flex items-center gap-1">
        <Action icon={<PenLine className="h-4 w-4" />} label="Write" />
        <Action icon={<Image className="h-4 w-4" />} label="Image" />
        <Action icon={<Video className="h-4 w-4" />} label="Video" />
      </div>
    </div>
  );
}

function Action({ icon, label }) {
  return (
    <button className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all">
      {icon}
      <span>{label}</span>
    </button>
  );
}