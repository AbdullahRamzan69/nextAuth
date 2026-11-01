"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

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

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Profile", href: "/profile" },
    { name: "Verify Email", href: "/verifyemail" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                  AuthFlow
                </span>
                <span className="text-[10px] uppercase tracking-wider text-indigo-400 font-medium -mt-1">
                  Fullstack Auth
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "text-white bg-zinc-800/80 shadow-sm"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {pathname.startsWith("/profile") ? (
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 rounded-xl transition-all disabled:opacity-50"
              >
                {isLoggingOut ? (
                  <span className="inline-block w-4 h-4 border-2 border-rose-400 border-t-transparent rounded-full animate-spin mr-1" />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                )}
                Logout
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-xl transition-all"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 rounded-xl shadow-md shadow-indigo-500/20 transition-all hover:shadow-indigo-500/30"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-800 bg-zinc-950 px-4 pt-2 pb-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-zinc-300 hover:text-white hover:bg-zinc-900"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2 border-t border-zinc-800 flex flex-col gap-2">
            {pathname.startsWith("/profile") ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                disabled={isLoggingOut}
                className="w-full text-center py-2 px-3 text-sm font-medium text-rose-400 bg-rose-500/10 rounded-lg"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2 px-3 text-sm font-medium text-zinc-300 hover:bg-zinc-900 rounded-lg"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2 px-3 text-sm font-medium text-white bg-indigo-600 rounded-lg"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
