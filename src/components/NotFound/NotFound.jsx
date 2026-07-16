"use client";

import Link from "next/link";
import { Home, ArrowLeft, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 dark:bg-teal-500/5 rounded-full blur-3xl animate-pulse delay-1000 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-linear-to-br from-emerald-400/5 to-teal-400/5 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-linear-to-br from-emerald-400/20 to-teal-400/20 rounded-full animate-float"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + i}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-2xl w-full text-center">
        {/* Interactive 404 Display */}
        <div 
          className="relative mb-8 transition-transform duration-300 ease-out"
          style={{
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          }}
        >
          {/* Glow Effect Behind Numbers */}
          <div className="absolute inset-0 bg-linear-to-r from-emerald-500/20 to-teal-500/20 blur-3xl rounded-full" />
          
          {/* Main 404 Text */}
          <div className="relative flex items-center justify-center gap-2 sm:gap-4">
            <span className="text-[120px] sm:text-[180px] font-bold leading-none bg-linear-to-br from-emerald-500 via-teal-500 to-emerald-600 bg-clip-text text-transparent select-none drop-shadow-2xl">
              4
            </span>
            <div className="relative">
              <span className="text-[120px] sm:text-[180px] font-bold leading-none bg-linear-to-br from-emerald-500 via-teal-500 to-emerald-600 bg-clip-text text-transparent select-none drop-shadow-2xl">
                0
              </span>
              {/* Rotating Sparkle */}
              <Sparkles className="absolute -top-2 -right-2 h-8 w-8 sm:h-12 sm:w-12 text-emerald-500 animate-spin-slow" />
            </div>
            <span className="text-[120px] sm:text-[180px] font-bold leading-none bg-linear-to-br from-emerald-500 via-teal-500 to-emerald-600 bg-clip-text text-transparent select-none drop-shadow-2xl">
              4
            </span>
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
          Page not found
        </h1>
        
        <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 max-w-md mx-auto leading-relaxed">
          Oops! The page you're looking for seems to have wandered off into the digital void.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="group flex items-center gap-2 px-8 py-4 bg-linear-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 hover:-translate-y-1 transition-all duration-300"
          >
            <Home className="h-5 w-5 transition-transform group-hover:-translate-y-1" />
            Back to Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="group flex items-center gap-2 px-8 py-4 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-300"
          >
            <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
            Go Back
          </button>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Looking for something specific?
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <Link href="/feed" className="text-emerald-600 dark:text-emerald-400 font-medium hover:underline underline-offset-4">
              Browse Feed
            </Link>
            <span className="text-gray-300 dark:text-gray-700">•</span>
            <Link href="/topics" className="text-emerald-600 dark:text-emerald-400 font-medium hover:underline underline-offset-4">
              Explore Topics
            </Link>
            <span className="text-gray-300 dark:text-gray-700">•</span>
            <Link href="/auth/login" className="text-emerald-600 dark:text-emerald-400 font-medium hover:underline underline-offset-4">
              Sign In
            </Link>
          </div>
        </div>

        {/* Fun Easter Egg */}
        <p className="mt-8 text-xs text-gray-400 dark:text-gray-600 font-mono">
          Error Code: 404 | Page Lost in Cyberspace
        </p>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          33% {
            transform: translateY(-20px) translateX(10px);
          }
          66% {
            transform: translateY(-10px) translateX(-10px);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}