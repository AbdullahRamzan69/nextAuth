"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const [token, setToken] = useState(() => searchParams.get("token") || "");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const urlToken = searchParams.get("token");
    if (!urlToken) return;

    let ignore = false;
    axios
      .post("/api/users/verifyemail", { token: urlToken.trim() })
      .then((response) => {
        if (!ignore) {
          setVerified(true);
          toast.success(response.data?.message || "Email verified successfully!");
        }
      })
      .catch((err: unknown) => {
        if (!ignore) {
          const errorObj = err as { response?: { data?: { error?: string } }; message?: string };
          const msg =
            errorObj.response?.data?.error ||
            errorObj.message ||
            "Email verification failed or token expired";
          setError(msg);
          toast.error(msg);
        }
      });

    return () => {
      ignore = true;
    };
  }, [searchParams]);

  const handleManualVerify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token.trim()) {
      toast.error("Please enter a verification token");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await axios.post("/api/users/verifyemail", {
        token: token.trim(),
      });
      setVerified(true);
      toast.success(response.data?.message || "Email verified successfully!");
    } catch (err: unknown) {
      const errorObj = err as { response?: { data?: { error?: string } }; message?: string };
      const msg =
        errorObj.response?.data?.error ||
        errorObj.message ||
        "Email verification failed or token expired";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 items-center justify-center text-white shadow-lg shadow-sky-500/25 mb-4">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Email Verification
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Confirm your email address to unlock full account access
          </p>
        </div>

        <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-xl">
          {/* Verified State */}
          {verified ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-4">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-white">Email Verified!</h2>
              <p className="text-sm text-zinc-400 mt-2 mb-6">
                Your email has been successfully verified. You now have full access to your account.
              </p>
              <Link
                href="/login"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-md shadow-emerald-500/20 transition"
              >
                <span>Proceed to Sign In</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          ) : (
            <div>
              {/* Error banner if failed */}
              {error && (
                <div className="mb-5 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm flex items-start gap-3">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="font-semibold text-rose-300">Verification Failed</p>
                    <p className="text-xs text-rose-400/90 mt-0.5">{error}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleManualVerify} className="space-y-4">
                <div>
                  <label htmlFor="token" className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                    Verification Token
                  </label>
                  <textarea
                    id="token"
                    name="token"
                    rows={3}
                    required
                    placeholder="Paste your verification token here..."
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    disabled={loading}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white font-mono text-xs placeholder-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition resize-none disabled:opacity-50"
                  />
                  <p className="text-[11px] text-zinc-500 mt-1">
                    If you clicked the email link in Mailtrap, this was filled automatically.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading || !token.trim()}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 shadow-md shadow-indigo-500/25 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Verifying Token...</span>
                    </>
                  ) : (
                    <span>Verify Email</span>
                  )}
                </button>
              </form>

              <div className="mt-6 pt-5 border-t border-zinc-800 text-center text-xs text-zinc-400 flex justify-between">
                <Link href="/login" className="text-indigo-400 hover:text-indigo-300 transition">
                  Back to Sign In
                </Link>
                <Link href="/profile" className="text-zinc-400 hover:text-zinc-200 transition">
                  Go to Profile
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-10 h-10 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}