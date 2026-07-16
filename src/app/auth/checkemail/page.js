"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Toast from "@/components/Toast";
import useEmail from "@/hooks/useEmail";

const CheckEmail = () => {
  const API = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);
  const { setContextEmail } = useEmail();
  const [toast, setToast] = useState({
    message: "",
    type: "success",
  });
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailValid) return;

    try {
      const res = await fetch(`${API}/api/auth/checkemail`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (data.status === "SIGNUP") {
        setToast({
          message: `Sending OTP to ${email}...`,
          type: "success",
        });
        setContextEmail(email);
        localStorage.setItem("ContextEmail", email);
        setTimeout(() => router.push("/auth/verifyemail"), 2000);
      }
      if (data.status === "LOGIN") {
        setToast({
          message: "Account found. Redirecting...",
          type: "success",
        });
        setContextEmail(email);
        localStorage.setItem("ContextEmail", email);
        setTimeout(() => router.push("/auth/login"), 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 p-4 relative overflow-hidden">
      {/* Subtle background gradients for depth */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/10 dark:bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/60 dark:border-gray-800/60 p-8 shadow-xl shadow-gray-200/40 dark:shadow-black/20">
          {/* Header */}
          <div className="text-center mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 mb-8 group"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-emerald-500 to-teal-600 shadow-sm shadow-emerald-500/20 transition-transform group-hover:scale-105">
                <span className="text-lg font-bold text-white">M</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                Marginalia
              </span>
            </Link>

            <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight mb-2">
              Welcome back
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Enter your email to continue to your account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email address
              </label>

              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setTouched(true)}
                  placeholder="you@example.com"
                  className={`w-full px-4 py-3 rounded-xl border text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none transition-all duration-200 ${
                    touched && !emailValid
                      ? "border-red-300 dark:border-red-500/50 bg-red-50/50 dark:bg-red-500/5 focus:ring-2 focus:ring-red-500/20"
                      : emailValid && email
                        ? "border-emerald-300 dark:border-emerald-500/50 bg-emerald-50/50 dark:bg-emerald-500/5 focus:ring-2 focus:ring-emerald-500/20"
                        : "border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950/50 focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500"
                  }`}
                />

                {emailValid && email && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center">
                    <Check className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                  </div>
                )}
              </div>

              {touched && !emailValid && (
                <p className="text-red-500 dark:text-red-400 text-xs mt-2">
                  Please enter a valid email address
                </p>
              )}
            </div>

            <button
              type="submit"
              className="cursor-pointer w-full py-3 bg-linear-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold text-sm shadow-sm shadow-emerald-500/20 hover:shadow-md hover:shadow-emerald-500/30 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
            >
              Continue
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
            <span className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">
              or
            </span>
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
          </div>

          {/* Google Button */}
          <button className="w-full py-3 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 rounded-xl font-medium text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all flex items-center justify-center gap-3">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </button>

          {/* Sign In Link */}
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* Footer text */}
        <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>

      {/* Toast */}
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: "", type: "success" })}
      />
    </div>
  );
};

export default CheckEmail;
