"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import useAuth from "@/hooks/useAuth";
import AuthModal from "../Modal/AuthModal";

export default function PostCard() {
  const API = process.env.NEXT_PUBLIC_API_URL;
  const { user } = useAuth();
  const [authModal, setAuthModal] = useState(false);

  const [postdata, setPostdata] = useState([]);

  const getAllPosts = async () => {
    try {
      const res = await fetch(`${API}/api/posts`);
      const data = await res.json();
      setPostdata(data.posts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  const handleVote = async (postId, voteType) => {
    if (!user) {
      setAuthModal(true);
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API}/api/posts/${postId}/vote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ voteType }),
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.message);
        return;
      }
      getAllPosts();
    } catch (err) {
      console.log(err);
    }
  };

  if (!postdata.length) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-4">
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center mb-4 ring-1 ring-emerald-100 dark:ring-emerald-800/30">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-emerald-600 dark:text-emerald-400"
          >
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          No posts yet
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 text-center max-w-xs">
          The feed is empty. Be the first to share something!
        </p>
      </div>
    );
  }

  return (
    <>
      {authModal && <AuthModal onClose={() => setAuthModal(false)} />}

      <div className="mx-auto w-full max-w-3xl space-y-5 sm:space-y-6">
        {postdata.map((e) => (
          <article
            key={e.id}
            className="group relative bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/5 dark:hover:shadow-emerald-900/10 hover:-translate-y-1"
          >
            {/* Top Gradient Accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-emerald-400 via-teal-500 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="p-4 sm:p-6">
              {/* 1. HEADER: Author & Meta (Moved to Top) */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-linear-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-sm ring-2 ring-white dark:ring-gray-900">
                    <span className="text-sm font-bold text-white">
                      {e.author.username[0].toUpperCase()}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-900 dark:text-gray-100 leading-none">
                      {e.author.username}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {formatDistanceToNow(new Date(e.createdAt), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                </div>

                {/* Optional: Menu or Share button could go here */}
              </div>

              {/* 2. CONTENT: Title & Body */}
              <Link
                href={`/post/${e.id}`}
                prefetch={false}
                className="block group/link"
              >
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover/link:text-emerald-600 dark:group-hover/link:text-emerald-400 transition-colors line-clamp-2">
                  {e.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-[15px] leading-relaxed line-clamp-3">
                  {e.content}
                </p>
              </Link>

              {/* 3. FOOTER: Actions (Horizontal Bar) */}
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-4 dark:border-gray-800 sm:mt-6">
                {/* Horizontal Voting Pill */}
                <div className="inline-flex items-center bg-gray-50 dark:bg-gray-800/50 rounded-lg p-1 gap-1 ring-1 ring-gray-200 dark:ring-gray-700">
                  <button
                    onClick={() => handleVote(e.id, "UP")}
                    className="cursor-pointer p-1.5 rounded-md text-gray-500 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-700 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all active:scale-90 shadow-sm hover:shadow"
                    aria-label="Upvote"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m18 15-6-6-6 6" />
                    </svg>
                  </button>

                  <span className="px-2 text-sm font-bold text-gray-700 dark:text-gray-200 tabular-nums min-w-6 text-center">
                    {e.voteCount}
                  </span>

                  <button
                    onClick={() => handleVote(e.id, "DOWN")}
                    className="cursor-pointer p-1.5 rounded-md text-gray-500 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-700 hover:text-red-500 dark:hover:text-red-400 transition-all active:scale-90 shadow-sm hover:shadow"
                    aria-label="Downvote"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
                </div>

                {/* Read More Link */}
                <Link
                  href={`/post/${e.id}`}
                  className="text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors flex items-center gap-1 group/readmore"
                >
                  Read story
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform group-hover/readmore:translate-x-1"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
