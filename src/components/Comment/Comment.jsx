"use client";

import { useState } from "react";
import CommentTemplate from "./CommentTemplate";
import { formatDistanceToNow } from "date-fns";

const Comment = ({ comments, createComment, openAuthModal, level = 0 }) => {
  const [replyingTo, setReplyingTo] = useState(null);

  if (!comments || comments.length === 0) {
    if (level !== 0) return null;

    return (
      <div className="mt-6 rounded-lg border border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-8 text-center">
        <p className="font-mono text-xs text-emerald-600 dark:text-emerald-400">$ ls comments</p>
        <p className="mt-2 font-mono text-sm text-gray-500 dark:text-gray-400">No results found.</p>
        <p className="mt-1 font-mono text-xs text-gray-400 dark:text-gray-500">
          Be the first to post something.
        </p>
      </div>
    );
  }

  return (
    <div className={level === 0 ? "mt-6 space-y-4" : "mt-4 space-y-4"}>
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
          style={{
            marginLeft: level * 24,
          }}
        >
          <div className="flex items-start gap-4">
            {/* Avatar */}
            <div className="h-10 w-10 shrink-0 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center font-semibold font-mono text-emerald-700 dark:text-emerald-400">
              {comment.author.username[0].toUpperCase()}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {/* Header */}
              <div className="flex items-center gap-2 mb-3">
                <p className="font-medium font-mono text-sm text-gray-800 dark:text-gray-200">{comment.author.username}</p>
                <span className="text-xs text-gray-400 dark:text-gray-500 font-mono">•</span>
                <span className="text-xs text-gray-400 dark:text-gray-500 font-mono">
                  {formatDistanceToNow(new Date(comment.createdAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>

              {/* Text */}
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed wrap-break-word">
                {comment.text}
              </p>

              {/* Actions */}
              <div className="mt-3 flex gap-4 text-xs font-mono">
                <button
                  onClick={() =>
                    setReplyingTo(replyingTo === comment.id ? null : comment.id)
                  }
                  className="text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer transition-colors"
                >
                  reply
                </button>

                <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">edit</button>

                <button className="text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500 transition-colors">delete</button>
              </div>

              {/* Reply Box */}
              {replyingTo === comment.id && (
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                  <CommentTemplate
                    parentId={comment.id}
                    createComment={createComment}
                    openAuthModal={openAuthModal}
                    onSuccess={() => setReplyingTo(null)}
                  />
                </div>
              )}

              {/* Nested Replies */}
              {comment.replies.length > 0 && (
                <div className="mt-4 pl-4 border-l-2 border-gray-100 dark:border-gray-800">
                  <Comment
                    comments={comment.replies}
                    createComment={createComment}
                    openAuthModal={openAuthModal}
                    level={level + 1}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comment;