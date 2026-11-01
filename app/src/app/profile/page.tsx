"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

interface UserProfile {
  _id: string;
  username: string;
  email: string;
  isVerified: boolean;
  isAdmin: boolean;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let ignore = false;

    axios
      .get("/api/users/me")
      .then((response) => {
        if (!ignore && response.data?.data) {
          setUser(response.data.data);
        }
      })
      .catch(() => {
        if (!ignore) {
          setUser(null);
        }
      })
      .finally(() => {
        if (!ignore) {
          setLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      const response = await axios.get("/api/users/me");
      if (response.data?.data) {
        setUser(response.data.data);
        toast.success("Profile refreshed!");
      }
    } catch (error: unknown) {
      const err = error as { response?: { data?: { error?: string } }; message?: string };
      toast.error(err.response?.data?.error || err.message || "Failed to refresh profile");
    } finally {
      setRefreshing(false);
    }
  };

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await axios.get("/api/users/logout");
      toast.success("Logged out successfully");
      router.push("/login");
      router.refresh();
    } catch (error: unknown) {
      const err = error as { response?: { data?: { error?: string } }; message?: string };
      toast.error(err.response?.data?.error || err.message || "Failed to logout");
    } finally {
      setIsLoggingOut(false);
    }
  };

  const copyUserId = () => {
    if (user?._id) {
      navigator.clipboard.writeText(user._id);
      setCopied(true);
      toast.success("User ID copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="w-12 h-12 border-3 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-zinc-400 text-sm font-medium">Loading user profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-zinc-900/80 border border-zinc-800 rounded-2xl p-8 text-center backdrop-blur-md shadow-xl">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-5">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Authentication Required</h2>
          <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
            You must be signed in with a valid session cookie to view your user dashboard.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/login"
              className="px-5 py-2.5 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md transition text-sm"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="px-5 py-2.5 rounded-xl font-semibold text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 transition text-sm"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 max-w-4xl w-full mx-auto px-4 py-10 sm:py-16">
      {/* Top Banner / Welcome */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-xl mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold uppercase shadow-lg shadow-indigo-500/20">
              {user.username ? user.username.charAt(0) : "U"}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl font-bold text-white tracking-tight">
                  {user.username}
                </h1>
                {user.isAdmin && (
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-purple-500/10 text-purple-400 border border-purple-500/30">
                    Admin
                  </span>
                )}
                {user.isVerified ? (
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Verified
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                    Unverified
                  </span>
                )}
              </div>
              <p className="text-sm text-zinc-400 mt-1">{user.email}</p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700/80 rounded-xl transition border border-zinc-700/50 disabled:opacity-50"
            >
              <svg
                className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Refresh</span>
            </button>
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-medium text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 rounded-xl transition disabled:opacity-50"
            >
              {isLoggingOut ? (
                <span className="w-4 h-4 border-2 border-rose-400 border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              )}
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Unverified notice */}
        {!user.isVerified && (
          <div className="mt-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs sm:text-sm">
                Your email is not verified yet. Check your inbox (or Mailtrap sandbox) or enter the verification token.
              </span>
            </div>
            <Link
              href="/verifyemail"
              className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-semibold whitespace-nowrap transition"
            >
              Verify Email Now
            </Link>
          </div>
        )}
      </div>

      {/* User Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Account Details */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6">
          <h2 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
            <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
            </svg>
            Account Identity
          </h2>
          <div className="space-y-4 text-sm">
            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-wider font-medium">Username</p>
              <p className="text-zinc-200 font-mono mt-0.5">{user.username}</p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-wider font-medium">Email Address</p>
              <p className="text-zinc-200 mt-0.5">{user.email}</p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-wider font-medium">Database ID</p>
              <div className="flex items-center gap-2 mt-1">
                <code className="text-xs text-zinc-400 font-mono bg-zinc-950 px-2 py-1 rounded border border-zinc-800 break-all">
                  {user._id}
                </code>
                <button
                  onClick={copyUserId}
                  className="p-1 rounded hover:bg-zinc-800 text-zinc-400 hover:text-white transition flex-shrink-0"
                  title="Copy User ID"
                >
                  {copied ? (
                    <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Security & Access */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6">
          <h2 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
            <svg className="w-4 h-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Security &amp; Permissions
          </h2>
          <div className="space-y-4 text-sm">
            <div className="flex items-center justify-between py-1 border-b border-zinc-800/60">
              <span className="text-zinc-400">Email Verification</span>
              <span className={user.isVerified ? "text-emerald-400 font-medium" : "text-amber-400 font-medium"}>
                {user.isVerified ? "Verified" : "Pending"}
              </span>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-zinc-800/60">
              <span className="text-zinc-400">Account Role</span>
              <span className="text-zinc-200 font-medium">{user.isAdmin ? "Administrator" : "Standard User"}</span>
            </div>
            <div className="flex items-center justify-between py-1">
              <span className="text-zinc-400">Session Mode</span>
              <span className="text-indigo-400 font-mono text-xs">HTTP-Only JWT Cookie</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Route Showcase */}
      <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-white">Dynamic User Profile Route</h3>
          <p className="text-xs text-zinc-400 mt-1">
            Test the dynamic App Router dynamic route handler at{" "}
            <code className="text-indigo-300 font-mono">/profile/[id]</code>.
          </p>
        </div>
        <Link
          href={`/profile/${user._id}`}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-sm transition"
        >
          <span>Visit /profile/{user._id.slice(0, 8)}...</span>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </Link>
      </div>
    </div>
  );
}