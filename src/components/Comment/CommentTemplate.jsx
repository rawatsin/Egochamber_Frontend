"use client";

import { useState } from "react";
import Toast from "../Toast";

const CommentTemplate = ({
  createComment,
  openAuthModal,
  parentId = null,
  onSuccess,
}) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState({
    message: "",
    type: "success",
  });

  const handleClick = async () => {
    if (!localStorage.getItem("token")) {
      openAuthModal();
      return;
    }

    if (!text.trim()) {
      setToast({
        message: "Comment cannot be empty.",
        type: "error",
      });
      return;
    }

    try {
      setLoading(true);

      const data = await createComment(text, parentId);

      setToast({
        message: data.message,
        type: "success",
      });

      setText("");

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      setToast({
        message: error.message,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
      {/* Terminal Label */}
      <p className="font-mono text-xs text-emerald-600 dark:text-emerald-400 mb-4">
        $ {parentId ? "reply_to_comment()" : "create_comment()"}
      </p>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={
          parentId 
            ? 'console.log("Write your reply...")' 
            : 'console.log("What are your thoughts?")'
        }
        className="w-full min-h-24 resize-none rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 font-mono text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
      />

      <div className="mt-4 flex justify-end gap-3">
        <button
          onClick={() => {
            setText("");

            if (onSuccess) {
              onSuccess();
            }
          }}
          className="cursor-pointer px-5 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 font-mono text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
        >
          cancel
        </button>

        <button
          disabled={loading}
          onClick={handleClick}
          className={`cursor-pointer px-5 py-2.5 rounded-lg font-mono text-sm font-semibold transition-all ${
            loading
              ? "bg-gray-400 dark:bg-gray-600 cursor-not-operative opacity-50"
              : "bg-emerald-700 dark:bg-emerald-600 hover:bg-emerald-800 dark:hover:bg-emerald-700 text-white shadow-[0_2px_6px_rgba(16,185,129,0.3)] hover:shadow-[0_4px_12px_rgba(16,185,129,0.4)]"
          }`}
        >
          {loading
            ? parentId
              ? "> replying..."
              : "> posting..."
            : parentId
            ? "> send_reply"
            : "> submit"}
        </button>
      </div>

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
    </div>
  );
};

export default CommentTemplate;