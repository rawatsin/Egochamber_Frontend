"use client";

import Link from "next/link";
import React, { useState } from "react";
import { ArrowRight, Mail } from "lucide-react";
import useEmail from "@/hooks/useEmail";

const VerifyEmail = () => {
  const { contextEmail } = useEmail();
  const email = contextEmail;
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const updated = [...code];
    updated[index] = value;
    setCode(updated);

    if (value && index < 5) {
      document.getElementById(`code-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      document.getElementById(`code-${index - 1}`)?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalCode = code.join("");
    console.log(finalCode);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 p-4 relative overflow-hidden">
      {/* Subtle background gradients for depth */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/10 dark:bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/60 dark:border-gray-800/60 p-6 md:p-8 shadow-lg">
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

            <div className="flex justify-center mb-4">
              <div className="h-12 w-12 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center ring-1 ring-emerald-100 dark:ring-emerald-500/20">
                <Mail className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight mb-2">
              Check your inbox
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              We sent a 6-digit verification code to{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {email}
              </span>
            </p>
          </div>

          {/* Verification Code Input */}
          <form onSubmit={handleSubmit}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 text-center">
              Verification code
            </label>

            <div className="mx-auto mb-6 flex max-w-xs justify-center gap-3">
              {code.map((digit, index) => (
                <input
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="h-14 w-12 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950/50 text-center text-xl font-bold text-gray-900 dark:text-white outline-none transition-all duration-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 focus:bg-white dark:focus:bg-gray-900"
                />
              ))}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-linear-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold text-sm shadow-sm shadow-emerald-500/20 hover:shadow-md hover:shadow-emerald-500/30 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
            >
              Verify Email
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          {/* Resend Code */}
          <button className="w-full mt-3 py-3 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 rounded-xl font-medium text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
            Resend Code
          </button>

          {/* Skip Option */}
          <div className="mt-8 text-center">
            <Link
              href={`/auth/signup`}
              className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              Skip for now
            </Link>

            <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
              You can verify your email later from settings.
            </p>
          </div>
        </div>

        {/* Footer text */}
        <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-6">
          Didn't receive the email? Check your spam folder.
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;
