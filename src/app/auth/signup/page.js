"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, Check, ArrowRight } from "lucide-react";
import Toast from "../../../components/Toast.jsx";
import useEmail from "@/hooks/useEmail.js";
import useAuth from "@/hooks/useAuth.js";
import { useRouter } from "next/navigation";

export default function Signup() {
  const API = process.env.NEXT_PUBLIC_API_URL;
  const { contextEmail } = useEmail();
  const { user, setUser } = useAuth();
  const emailfromparams = contextEmail;
  const [toast, setToast] = useState({ message: "", type: "" });
  const router = useRouter();

  const [form, setForm] = useState({
    username: "",
    email: emailfromparams || "",
    password: "",
  });

  const [showPw, setShowPw] = useState(false);
  const [touched, setTouched] = useState({
    username: false,
    email: false,
    password: false,
  });

  const showToast = (msg, type = "success") => {
    setToast({ message: msg, type });
    setTimeout(() => {
      setToast({ message: "", type: "" });
    }, 3000);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const usernameValid = form.username.length >= 3;
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  const passwordValid = form.password.length >= 8;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        showToast(data.message, "error");
        return;
      }

      showToast(data.message);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      router.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 p-4 relative overflow-hidden">
      {/* Subtle background gradients for depth */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/10 dark:bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/60 dark:border-gray-800/60 p-5 sm:p-8 shadow-xl shadow-gray-200/40 dark:shadow-black/20">
          
          {/* Header */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-8 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-emerald-500 to-teal-600 shadow-sm shadow-emerald-500/20 transition-transform group-hover:scale-105">
                <span className="text-lg font-bold text-white">M</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                Marginalia
              </span>
            </Link>
            
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight mb-2">
              Create your account
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Join the community and start sharing your thoughts
            </p>
          </div>

          {/* Toast */}
          <Toast message={toast.message} type={toast.type} />

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="username"
                  placeholder="johndoe"
                  value={form.username}
                  onChange={handleChange}
                  onBlur={() => setTouched((t) => ({ ...t, username: true }))}
                  className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 ${
                    touched.username && !usernameValid
                      ? "border-red-300 dark:border-red-500/50 bg-red-50/50 dark:bg-red-500/5 focus:ring-2 focus:ring-red-500/20"
                      : usernameValid && form.username
                        ? "border-emerald-300 dark:border-emerald-500/50 bg-emerald-50/50 dark:bg-emerald-500/5 focus:ring-2 focus:ring-emerald-500/20"
                        : "border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950/50 focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500"
                  }`}
                />
                {usernameValid && form.username && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center">
                    <Check className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                  </div>
                )}
              </div>
              {touched.username && !usernameValid && (
                <p className="text-red-500 dark:text-red-400 text-xs mt-2">Username must be at least 3 characters</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email address
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                  readOnly={!!emailfromparams}
                  className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 ${
                    emailfromparams
                      ? "bg-gray-100 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700 cursor-not-allowed"
                      : touched.email && !emailValid
                        ? "border-red-300 dark:border-red-500/50 bg-red-50/50 dark:bg-red-500/5 focus:ring-2 focus:ring-red-500/20"
                        : emailValid && form.email
                          ? "border-emerald-300 dark:border-emerald-500/50 bg-emerald-50/50 dark:bg-emerald-500/5 focus:ring-2 focus:ring-emerald-500/20"
                          : "border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950/50 focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500"
                  }`}
                />
                {!emailfromparams && emailValid && form.email && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center">
                    <Check className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                  </div>
                )}
              </div>
              {emailfromparams && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Email pre-filled from your previous step.
                </p>
              )}
              {!emailfromparams && touched.email && !emailValid && (
                <p className="text-red-500 dark:text-red-400 text-xs mt-2">Please enter a valid email address</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                  className={`w-full px-4 py-3 pr-14 rounded-xl border text-sm outline-none transition-all duration-200 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 ${
                    touched.password && !passwordValid
                      ? "border-red-300 dark:border-red-500/50 bg-red-50/50 dark:bg-red-500/5 focus:ring-2 focus:ring-red-500/20"
                      : passwordValid && form.password
                        ? "border-emerald-300 dark:border-emerald-500/50 bg-emerald-50/50 dark:bg-emerald-500/5 focus:ring-2 focus:ring-emerald-500/20"
                        : "border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950/50 focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500"
                  }`}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  {passwordValid && form.password && (
                    <div className="h-5 w-5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center">
                      <Check className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              {touched.password && !passwordValid && (
                <p className="text-red-500 dark:text-red-400 text-xs mt-2">Password must be at least 8 characters</p>
              )}
            </div>

            <button
              type="submit"
              className="cursor-pointer w-full py-3 bg-linear-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold text-sm shadow-sm shadow-emerald-500/20 hover:shadow-md hover:shadow-emerald-500/30 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
            >
              Create account
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
            <span className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">or</span>
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
          </div>

          {/* Google Button */}
          <button className="w-full py-3 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 rounded-xl font-medium text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all flex items-center justify-center gap-3">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
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
          By creating an account, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
