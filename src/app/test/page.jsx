"use client";

import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { User, Globe, Lock, Terminal } from "lucide-react";

export default function Test() {
  const API = process.env.NEXT_PUBLIC_API_URL;
  const [get, setGet] = useState("");
  const [priv, setPriv] = useState("");
  const { user } = useAuth();

  const handleclick = async () => {
    try {
      const res = await fetch(`${API}/api/test/get"`);
      const data = await res.json();
      setGet(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleprivacy = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API}/api/test/private/get"`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setPriv(data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 p-4">
        <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/60 dark:border-gray-800/60 p-8 shadow-xl shadow-gray-200/40 dark:shadow-black/20 text-center">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 rounded-full bg-red-50 dark:bg-red-500/10 flex items-center justify-center ring-1 ring-red-100 dark:ring-red-500/20">
              <Lock className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight mb-2">
            Access Denied
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Please login to access the test dashboard
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="h-8 w-8 rounded-lg bg-linear-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
            <Terminal className="h-4 w-4 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
              API Test Dashboard
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Developer testing environment
            </p>
          </div>
        </div>

        {/* User Info Card */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/60 dark:border-gray-800/60 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <User className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
              Current User
            </span>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <div className="h-12 w-12 rounded-full bg-linear-to-br from-emerald-500 to-teal-600 flex items-center justify-center ring-2 ring-white dark:ring-gray-900">
              <span className="text-lg font-bold text-white">
                {user.username[0].toUpperCase()}
              </span>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {user.username}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {user.email}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-gray-50 dark:bg-gray-950/50 rounded-lg px-3 py-2">
                <span className="text-xs text-gray-500 dark:text-gray-400 block">
                  User ID
                </span>
                <code className="text-sm font-mono text-gray-900 dark:text-white">
                  {user.id}
                </code>
              </div>
              <div className="bg-gray-50 dark:bg-gray-950/50 rounded-lg px-3 py-2">
                <span className="text-xs text-gray-500 dark:text-gray-400 block">
                  Email
                </span>
                <code className="text-sm font-mono text-gray-900 dark:text-white">
                  {user.email}
                </code>
              </div>
            </div>
          </div>
        </div>

        {/* API Testing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Public API Test */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/60 dark:border-gray-800/60 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                Public Endpoint
              </span>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Test the public GET API endpoint (no authentication required)
            </p>

            <button
              onClick={handleclick}
              className="w-full py-2.5 bg-linear-to-r from-blue-500 to-cyan-600 text-white rounded-xl font-semibold text-sm shadow-sm shadow-blue-500/20 hover:shadow-md hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all duration-200 mb-4"
            >
              Test Public API
            </button>

            {get && (
              <div className="bg-gray-900 dark:bg-black rounded-lg p-3 border border-gray-800">
                <pre className="text-xs font-mono text-emerald-400 overflow-x-auto">
                  {JSON.stringify(get, null, 2)}
                </pre>
              </div>
            )}
          </div>

          {/* Private API Test */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/60 dark:border-gray-800/60 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Lock className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                Private Endpoint
              </span>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Test the private GET API endpoint (authentication required)
            </p>

            <button
              onClick={handleprivacy}
              className="w-full py-2.5 bg-linear-to-r from-purple-500 to-pink-600 text-white rounded-xl font-semibold text-sm shadow-sm shadow-purple-500/20 hover:shadow-md hover:shadow-purple-500/30 hover:-translate-y-0.5 transition-all duration-200 mb-4"
            >
              Test Private API
            </button>

            <div className="bg-gray-900 dark:bg-black rounded-lg p-3 border border-gray-800 min-h-15">
              <pre className="text-xs font-mono text-emerald-400 overflow-x-auto">
                {priv ? (
                  JSON.stringify(priv, null, 2)
                ) : (
                  <span className="text-gray-500">Click button to test...</span>
                )}
              </pre>
            </div>
          </div>
        </div>

        {/* Info Footer */}
        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200/50 dark:border-blue-800/50 rounded-xl p-4">
          <p className="text-xs text-blue-700 dark:text-blue-300">
            <strong>Note:</strong> This is a development testing page. API
            responses are displayed in JSON format for debugging purposes.
          </p>
        </div>
      </div>
    </div>
  );
}
