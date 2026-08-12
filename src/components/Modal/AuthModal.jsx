import Link from "next/link";
import React from "react";
import { Lock, X } from "lucide-react";

const AuthModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md px-4">
      <div className="relative max-h-[calc(100dvh-2rem)] w-full max-w-sm overflow-y-auto rounded-2xl border border-gray-200/60 bg-white p-5 shadow-2xl shadow-black/20 dark:border-gray-800/60 dark:bg-gray-900 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 rounded-lg text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-5">
          <div className="h-14 w-14 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center ring-1 ring-emerald-100 dark:ring-emerald-500/20">
            <Lock className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
          </div>
        </div>

        {/* Content */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
            Sign in to continue
          </h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
            Join the community to publish posts, save your favorites, and engage in discussions.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-3">
          <Link
            href="/auth/login"
            className="w-full py-3 bg-linear-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold text-sm shadow-sm shadow-emerald-500/20 hover:shadow-md hover:shadow-emerald-500/30 hover:-translate-y-0.5 transition-all duration-200 text-center block"
          >
            Sign in
          </Link>

          <button
            onClick={onClose}
            className="w-full py-3 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 rounded-xl font-medium text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all text-center"
          >
            Browse as guest
          </button>
        </div>
        
        {/* Footer */}
        <p className="mt-6 text-center text-xs text-gray-400 dark:text-gray-500">
          New here?{" "}
          <Link href="/auth/checkemail" className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
