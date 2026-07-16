"use client";
import AuthModal from "../../components/Modal/AuthModal.jsx";
import Toast from "@/components/Toast";
import useAuth from "@/hooks/useAuth.js";
import React, { useEffect, useState } from "react";

const Create = () => {
  const API = process.env.NEXT_PUBLIC_API_URL;
  const { user } = useAuth();
  const [authModal, setAuthModal] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [toast, setToast] = useState({
    message: "",
    type: "success",
  });

  useEffect(() => {
    !user && setAuthModal(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!user){
      return setAuthModal(true);
    }
    
    if (!title || !content) {
      return;
    }
    const payload = { title, content };
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API}/api/posts`, {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        setToast({
          message: data.message,
          type: "success",
        });

        setTitle("");
        setContent("");
      } else {
        setToast({
          message: data.message,
          type: "error",
        });
      }
    } catch (error) {
      setToast({
        message: "Something went wrong",
        type: "error",
      });
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() =>
          setToast({
            message: "",
            type: "success",
          })
        }
      />
      {authModal && <AuthModal onClose={() => setAuthModal(false)} />}
      
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="font-mono text-emerald-600 dark:text-emerald-400 text-sm mb-4">// Hello, World</p>
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white tracking-tight">
            Create <span className="text-emerald-600 dark:text-emerald-400">Post</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-4 text-base max-w-xl mx-auto leading-relaxed">
            Share your thoughts with the community
          </p>
        </div>

        {/* Form Card - Terminal Style */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
          {/* Terminal Header */}
          <div className="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
              <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
              <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
            </div>
            <span className="ml-4 text-xs font-mono text-gray-600 dark:text-gray-400">~/create-post</span>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            {/* Title Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 font-mono">
                $ title<span className="text-emerald-600 dark:text-emerald-400">?</span>
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Enter a catchy title..."
                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-3.5 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200 outline-none font-mono text-sm"
              />
            </div>

            {/* Content Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 font-mono">
                $ content<span className="text-emerald-600 dark:text-emerald-400">?</span>
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={10}
                placeholder='console.log("What is on your mind?")'
                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-3.5 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200 resize-none outline-none font-mono text-sm leading-relaxed"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4">
              <button
                type="button"
                className="cursor-pointer px-5 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-200 font-mono text-sm"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="cursor-pointer px-5 py-2.5 rounded-lg bg-emerald-700 dark:bg-emerald-600 hover:bg-emerald-800 dark:hover:bg-emerald-700 text-white font-semibold shadow-[0_2px_6px_rgba(16,185,129,0.3)] hover:shadow-[0_4px_12px_rgba(16,185,129,0.4)] transition-all duration-200 font-mono text-sm"
              >
                publish_post
              </button>
            </div>
          </form>
        </div>

        {/* Info Panel */}
        <div className="mt-6 bg-emerald-50/60 dark:bg-emerald-900/20 rounded-lg p-4 border border-emerald-100 dark:border-emerald-800">
          <div className="flex items-start gap-3">
            <code className="text-xs font-mono text-emerald-700 dark:text-emerald-400 shrink-0">$ tips</code>
            <div>
              <p className="text-xs text-emerald-800 dark:text-emerald-300 leading-relaxed">
                Clear titles help posts get discovered. Write authentically and stay concise!
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Create;