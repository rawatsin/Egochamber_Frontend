"use client";
import { Sparkles, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function RightPanel() {
  return (
    <aside className="hidden min-[1024px]:block w-80 shrink-0 px-4 py-6">
      <div className="sticky top-20 space-y-5">
        
        {/* Today's Prompt Card */}
        <div className="relative overflow-hidden rounded-2xl border border-gray-200/60 dark:border-gray-800/60 bg-linear-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 p-6 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10 dark:hover:shadow-emerald-900/20">
          {/* Decorative gradient orb */}
          <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-linear-to-br from-emerald-400/20 to-teal-500/20 blur-3xl" />
          
          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-wide">
                Today's Prompt
              </span>
            </div>
            
            <p className="text-lg font-bold text-gray-900 dark:text-white leading-snug mb-4">
              What's a craft rule you broke on purpose — and didn't regret?
            </p>
            
            <Link
              href="/comingsoon"
              className="inline-flex items-center gap-2 rounded-lg bg-linear-to-r from-emerald-500 to-teal-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-emerald-500/20 hover:shadow-md hover:shadow-emerald-500/30 hover:-translate-y-0.5 transition-all duration-200"
            >
              <span>Add your reply</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Trending Topics Card */}
        <div className="rounded-2xl border border-gray-200/60 dark:border-gray-800/60 bg-white dark:bg-gray-900 p-6 transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
              Quietly Trending
            </span>
          </div>
          
          <ul className="space-y-1">
            {[
              "On reading like a writer",
              "The end of the design system era",
              "Why I stopped using a calendar",
            ].map((topic, i) => (
              <li key={topic}>
                <Link
                  href={`/comingsoon`}
                  className="group flex items-start gap-3 rounded-xl p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-xs font-bold text-emerald-700 dark:text-emerald-400 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-500/20 transition-colors">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug pt-0.5">
                    {topic}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer Message */}
        <div className="rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200/40 dark:border-gray-800/40 px-4 py-3">
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed text-center">
            Marginalia is a quiet place to discuss things slowly. Be generous. Disagree well.
          </p>
        </div>
      </div>
    </aside>
  );
}
