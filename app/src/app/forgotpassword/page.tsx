"use client";

import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your registered email address");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("/api/users/forgotpassword", {
        email: email.trim(),
      });
      setSubmitted(true);
      toast.success(response.data?.message || "Password reset link sent!");
    } catch (error: unknown) {
      const err = error as { response?: { data?: { error?: string } }; message?: string };
      const errorMessage =
        err.response?.data?.error || err.message || "Failed to send reset link";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 items-center justify-center text-white shadow-lg shadow-amber-500/25 mb-4">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Forgot Password?
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Enter your email and we&apos;ll send you instructions to reset your password
          </p>
        </div>

        <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-xl">
          {submitted ? (
            <div className="text-center py-3">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-4">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-white">Reset Email Dispatched</h2>
              <p className="text-sm text-zinc-400 mt-2 mb-6 leading-relaxed">
                If an account exists for <strong className="text-zinc-200">{email}</strong>, a password reset email has been sent via Mailtrap Sandbox. Click the link in the email or visit the reset page directly.
              </p>
              <div className="flex flex-col gap-3">
                <Link
                  href="/resetpassword"
                  className="w-full inline-flex items-center justify-center py-2.5 px-4 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md transition text-sm"
                >
                  Enter Reset Token Manually
                </Link>
                <Link
                  href="/login"
                  className="w-full inline-flex items-center justify-center py-2.5 px-4 rounded-xl font-medium text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 transition text-sm"
                >
                  Return to Sign In
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5"
                >
                  Email Address
                </label>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    enterKeyHint="done"
                    placeholder="Enter your registered email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all text-sm disabled:opacity-50"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-zinc-500">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-white bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 shadow-md shadow-amber-500/25 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Sending Reset Link...</span>
                  </>
                ) : (
                  <span>Send Reset Link</span>
                )}
              </button>

              <div className="pt-2 text-center text-xs text-zinc-400">
                <Link
                  href="/login"
                  className="text-indigo-400 hover:text-indigo-300 font-medium transition inline-flex items-center gap-1"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span>Back to Sign In</span>
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
