"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Sparkles, Bell, ArrowRight, Globe, MessageCircle } from "lucide-react";
export default function ComingSoon() {
  // Set launch date to 30 days from now for demo purposes
  const [launchDate] = useState(
    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  );
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [email, setEmail] = useState("");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Countdown Logic
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate.getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [launchDate]);

  // Subtle Mouse Tracking Glow
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle email submission here
    console.log("Notify email:", email);
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Mouse Tracking Glow */}
      <div
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(16, 185, 129, 0.06), transparent 40%)`,
        }}
      />

      {/* Animated Background Orbs */}
      <div className="absolute top-0 left-1/4 w-125 h-125 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-[100px] animate-pulse-slow" />
      <div className="absolute bottom-0 right-1/4 w-125 h-125 bg-teal-500/10 dark:bg-teal-500/5 rounded-full blur-[100px] animate-pulse-slow delay-1000" />

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center text-center">
        {/* Logo */}
        <Link href="/" className="mb-12 group">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/20 transition-transform group-hover:scale-110 group-hover:rotate-3">
              <span className="text-xl font-bold text-white">M</span>
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
              Marginalia
            </span>
          </div>
        </Link>

        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 dark:bg-emerald-500/10 dark:border-emerald-500/20 px-4 py-1.5 mb-8 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">
            In Development
          </span>
        </div>

        {/* Hero Typography */}
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white tracking-tight mb-6 leading-[1.1]">
          Something extraordinary <br className="hidden md:block" />
          <span className="bg-linear-to-r from-emerald-500 via-teal-500 to-emerald-600 bg-clip-text text-transparent">
            is brewing.
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mb-16 leading-relaxed">
          We're crafting a new way to read, write, and discuss. Be the first to
          know when we open the doors.
        </p>

        {/* Countdown Timer */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full max-w-3xl mb-16">
          {[
            { label: "Days", value: timeLeft.days },
            { label: "Hours", value: timeLeft.hours },
            { label: "Minutes", value: timeLeft.minutes },
            { label: "Seconds", value: timeLeft.seconds },
          ].map((item) => (
            <div
              key={item.label}
              className="group relative bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/60 dark:border-gray-800/60 rounded-2xl p-6 shadow-xl shadow-black/5 dark:shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/30 dark:hover:border-emerald-500/30"
            >
              <div className="absolute inset-0 bg-linear-to-br from-emerald-500/5 to-teal-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <span className="block text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tabular-nums mb-2">
                  {String(item.value).padStart(2, "0")}
                </span>
                <span className="text-xs md:text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Email Capture Form */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md flex flex-col sm:flex-row gap-3 mb-16"
        >
          <div className="relative flex-1">
            <Bell className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email for early access"
              className="w-full h-14 pl-12 pr-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all"
              required
            />
          </div>
          <button
            type="submit"
            className="group h-14 px-8 rounded-xl bg-linear-to-r from-emerald-500 to-teal-600 text-white font-semibold shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap"
          >
            Notify Me
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </form>

        {/* Footer / Socials */}
        <div className="flex items-center gap-6 text-gray-400 dark:text-gray-500">
          <a
            href="#"
            className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            aria-label="Community"
          >
            <MessageCircle className="h-5 w-5" />
          </a>
          <a
            href="#"
            className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            aria-label="Website"
          >
            <Globe className="h-5 w-5" />
          </a>
          <span className="text-xs font-mono uppercase tracking-widest">
            © 2026 Marginalia
          </span>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.1);
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}
