"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, AlertCircle, X } from "lucide-react";

export default function Toast({
  message,
  type = "success",
  duration = 3000,
  onClose,
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      // Small timeout to allow the component to mount before triggering the enter animation
      const enterTimer = setTimeout(() => setVisible(true), 10);

      const exitTimer = setTimeout(() => {
        setVisible(false);
        // Wait for the exit animation to finish before calling onClose
        if (onClose) {
          setTimeout(onClose, 300); 
        }
      }, duration);

      return () => {
        clearTimeout(enterTimer);
        clearTimeout(exitTimer);
      };
    }
  }, [message, duration, onClose]);

  if (!message) return null;

  const isSuccess = type === "success";
  const Icon = isSuccess ? CheckCircle2 : AlertCircle;

  return (
    <div
      className={`fixed top-6 right-6 z-50 flex items-center gap-3 rounded-xl border bg-white dark:bg-gray-900 px-4 py-3 shadow-xl shadow-black/5 dark:shadow-black/20 transition-all duration-300 ease-out ${
        visible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 -translate-y-4 scale-95 pointer-events-none"
      } ${
        isSuccess
          ? "border-emerald-200 dark:border-emerald-500/20"
          : "border-red-200 dark:border-red-500/20"
      }`}
    >
      {/* Icon */}
      <Icon
        className={`h-5 w-5 shrink-0 ${
          isSuccess
            ? "text-emerald-600 dark:text-emerald-400"
            : "text-red-600 dark:text-red-400"
        }`}
      />

      {/* Message */}
      <p className="text-sm font-medium text-gray-900 dark:text-gray-100 pr-2">
        {message}
      </p>

      {/* Close Button */}
      <button
        onClick={() => {
          setVisible(false);
          if (onClose) setTimeout(onClose, 300);
        }}
        className="ml-auto p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label="Close toast"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}