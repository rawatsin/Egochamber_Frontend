"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import Comment from "@/components/Comment/Comment";
import CommentTemplate from "@/components/Comment/CommentTemplate";
import AuthModal from "@/components/Modal/AuthModal";
import useAuth from "@/hooks/useAuth";

export default function Post() {
  const API = process.env.NEXT_PUBLIC_API_URL;
  const { id } = useParams();
  const { user } = useAuth();

  const [authModal, setAuthModal] = useState(false);

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  const [aiSummary, setAiSummary] = useState(null);
  const [loadingSummary, setLoadingSummary] = useState(false);

  //get ai summary
  const getAiSummary = async () => {
    try {
      setLoadingSummary(true);

      const res = await fetch(`${API}/api/posts/${id}/summary`, {
        method: "POST",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      setAiSummary(data.summary);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingSummary(false);
    }
  };

  // Get Single Post
  const getSinglePost = async () => {
    try {
      const res = await fetch(`${API}/api/posts/${id}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      setPost(data.postById);
    } catch (error) {
      console.log(error);
    }
  };

  // Get Comments
  const getComments = async () => {
    try {
      const res = await fetch(`${API}/api/comment/${id}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      setComments(data.comments);
    } catch (error) {
      console.log(error);
    }
  };

  // Create Comment / Reply
  const createComment = async (text, parentId = null) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API}/api/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        text,
        postId: id,
        parentId,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }

    await getComments();

    return data;
  };

  useEffect(() => {
    if (!id) return;

    getSinglePost();
    getComments();
    getAiSummary();
  }, [id]);

  const handleVote = async (voteType) => {
    if (!user) {
      setAuthModal(true);
      return;
    }
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API}/api/posts/${id}/vote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          voteType,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.message);
        return;
      }

      // Refresh post to get latest vote count
      getSinglePost();
    } catch (error) {
      console.log(error);
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-900 dark:bg-black flex items-center justify-center">
        <span className="animate-pulse text-emerald-600 font-mono">
          $ loading...
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {authModal && <AuthModal onClose={() => setAuthModal(false)} />}

      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Post */}

        <article className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
          <div className="flex gap-8">
            {/* Voting */}
            <div className="flex flex-col items-center gap-3 pt-1">
              <button
                onClick={() => handleVote("UP")}
                className="cursor-pointer group rounded-xl p-2 text-gray-500 dark:text-gray-400 transition-all duration-200 hover:bg-green-500/10 hover:text-green-600 active:scale-95"
                aria-label="Upvote"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform group-hover:-translate-y-0.5"
                >
                  <path d="m18 15-6-6-6 6" />
                </svg>
              </button>

              <span className="font-semibold text-base tracking-wide text-gray-900 dark:text-gray-100">
                {post.voteCount}
              </span>

              <button
                onClick={() => handleVote("DOWN")}
                className="cursor-pointer group rounded-xl p-2 text-gray-500 dark:text-gray-400 transition-all duration-200 hover:bg-red-500/10 hover:text-red-600 active:scale-95"
                aria-label="Downvote"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform group-hover:translate-y-0.5"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <header className="mb-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 shrink-0 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center font-bold text-emerald-700 dark:text-emerald-400 ring-1 ring-inset ring-gray-200 dark:ring-gray-700">
                    {post.author.username[0].toUpperCase()}
                  </div>

                  <div className="min-w-0">
                    <h2 className="font-medium text-gray-900 dark:text-gray-100 truncate">
                      {post.author.username}
                    </h2>

                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      u/{post.author.username}
                    </p>
                  </div>
                </div>
              </header>

              <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white mb-5 break-words">
                {post.title}
              </h1>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                {post.content}
              </p>
            </div>
          </div>
        </article>
        {loadingSummary ? (
          <div className="mt-6 rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
            <p>Generating AI Summary...</p>
          </div>
        ) : (
          aiSummary && (
            <div className="mt-6 rounded-3xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50/50 dark:bg-emerald-950/30 p-6">
              <h2 className="text-xl font-semibold mb-4">🤖 AI Summary</h2>

              <p className="mb-4">{aiSummary.summary}</p>

              <h3 className="font-semibold mb-2">Key Points</h3>

              <ul className="list-disc ml-5 space-y-1">
                {aiSummary.keyPoints.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>

              <div className="mt-5 grid gap-3 text-sm">
                <p>
                  <span className="font-semibold">📂 Category:</span>{" "}
                  {aiSummary.category}
                </p>

                <p>
                  <span className="font-semibold">😊 Overall Tone:</span>{" "}
                  {aiSummary.sentiment}
                </p>

                <p>
                  <span className="font-semibold">⏱ Estimated Read Time:</span>{" "}
                  {aiSummary.readingTime}
                </p>

                <p>
                  <span className="font-semibold">🔥 Controversy:</span>{" "}
                  {aiSummary.controversyScore}/10 (
                  {aiSummary.controversyScore <= 2
                    ? "Very Low"
                    : aiSummary.controversyScore <= 4
                      ? "Low"
                      : aiSummary.controversyScore <= 6
                        ? "Moderate"
                        : aiSummary.controversyScore <= 8
                          ? "High"
                          : "Very High"}
                  )
                </p>

                <p>
                  <span className="font-semibold">
                    💬 Discussion Potential:
                  </span>{" "}
                  {aiSummary.discussionPotential}
                  {aiSummary.discussionPotential === "High" &&
                    " - Likely to attract many replies"}
                  {aiSummary.discussionPotential === "Medium" &&
                    " - May generate a healthy discussion"}
                  {aiSummary.discussionPotential === "Low" &&
                    " - Fewer replies are expected"}
                </p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {aiSummary.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-emerald-100 dark:bg-emerald-900 px-3 py-1 text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )
        )}

        {/* Top Level Comment */}

        <div className="mt-8">
          <CommentTemplate
            createComment={createComment}
            openAuthModal={() => setAuthModal(true)}
          />
        </div>

        {/* Comments */}

        <div className="mt-6 space-y-4">
          <Comment
            comments={comments}
            createComment={createComment}
            openAuthModal={() => setAuthModal(true)}
          />
        </div>
      </main>
    </div>
  );
}
