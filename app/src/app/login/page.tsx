"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.identifier.trim() || !formData.password.trim()) {
      toast.error("Please enter your email/username and password");
      return;
    }

    try {
      setLoading(true);

      const isEmail = formData.identifier.includes("@");
      const payload = {
        email: isEmail ? formData.identifier.trim() : "",
        username: !isEmail ? formData.identifier.trim() : "",
        password: formData.password,
      };

      const response = await axios.post("/api/users/login", payload);
      const data = response.data;

      toast.success(data.message || "Logged in successfully!");
      router.push("/profile");
      router.refresh();
    } catch (error: unknown) {
      const err = error as { response?: { data?: { error?: string } }; message?: string };
      const errorMessage = err.response?.data?.error || err.message || "Invalid credentials or login failed";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Card Header */}
        <div className="text-center mb-8">
          <div className="inline-flex w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-violet-600 items-center justify-center text-white shadow-lg shadow-indigo-500/25 mb-4">
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
              />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Welcome Back
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Sign in to access your account and dashboard
          </p>
        </div>

        {/* Card Body */}
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-xl backdrop-blur-md">
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email / Username Input */}
            <div>
              <label
                htmlFor="identifier"
                className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5"
              >
                Email or Username
              </label>
              <div className="relative">
                <input
                  id="identifier"
                  name="identifier"
                  type="text"
                  required
                  autoComplete="username"
                  enterKeyHint="next"
                  placeholder="name@example.com or username"
                  value={formData.identifier}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all text-sm disabled:opacity-50"
                />
                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-zinc-500">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold uppercase tracking-wider text-zinc-400"
                >
                  Password
                </label>
                <Link
                  href="/forgotpassword"
                  className="text-xs text-indigo-400 hover:text-indigo-300 font-medium transition"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  enterKeyHint="done"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-full px-4 py-3 pr-11 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all text-sm disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-400 hover:text-zinc-200 transition"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 shadow-md shadow-indigo-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-indigo-500/40 active:scale-[0.99]"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </form>

          {/* Card Footer Link */}
          <div className="mt-6 text-center text-xs text-zinc-400">
            <span>Don&apos;t have an account? </span>
            <Link
              href="/signup"
              className="text-indigo-400 hover:text-indigo-300 font-semibold underline underline-offset-4 decoration-indigo-500/40 transition"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}