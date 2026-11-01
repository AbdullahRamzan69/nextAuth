import Link from "next/link";

export default function Home() {
  const features = [
    {
      title: "Secure Registration",
      desc: "Robust account creation with Bcrypt password hashing, input validation, and automatic verification email dispatch.",
      href: "/signup",
      cta: "Try Signup",
      badge: "Auth",
      icon: (
        <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      ),
    },
    {
      title: "JWT Authentication",
      desc: "Instant login with username or email, issuing signed HTTP-only cookies for maximum XSS protection.",
      href: "/login",
      cta: "Try Login",
      badge: "Session",
      icon: (
        <svg className="w-6 h-6 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
        </svg>
      ),
    },
    {
      title: "Protected Profile",
      desc: "Displays authenticated user details, dynamic routing (/profile/[id]), verification badge, and one-click logout.",
      href: "/profile",
      cta: "View Profile",
      badge: "Dashboard",
      icon: (
        <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      title: "Email Verification",
      desc: "One-click email validation via token query params or manual entry, integrated with Mailtrap sandbox.",
      href: "/verifyemail",
      cta: "Verify Email",
      badge: "Security",
      icon: (
        <svg className="w-6 h-6 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: "Forgot Password",
      desc: "Self-service password recovery flow that dispatches secure time-expiring reset tokens to the registered inbox.",
      href: "/forgotpassword",
      cta: "Reset Link",
      badge: "Recovery",
      icon: (
        <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
    },
    {
      title: "Password Reset",
      desc: "Complete password updating page with token validation, new password confirmation, and direct login redirect.",
      href: "/resetpassword",
      cta: "Set New Password",
      badge: "Reset",
      icon: (
        <svg className="w-6 h-6 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
    },
  ];

  return (
    <div className="relative overflow-hidden flex flex-col items-center">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-indigo-600/20 via-violet-600/10 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Hero Section */}
      <section className="w-full max-w-6xl mx-auto px-4 pt-16 pb-12 sm:pt-24 sm:pb-16 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-6 tracking-wide uppercase">
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
          Production-Ready Next.js Authentication
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-4xl leading-tight">
          Complete Fullstack Authentication{" "}
          <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
            Built for Scale
          </span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-zinc-400 max-w-2xl leading-relaxed">
          Clean, modern frontend and secure backend architecture featuring JWT authentication,
          MongoDB persistence, Nodemailer email verification, and self-service password recovery.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/signup"
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 shadow-lg shadow-indigo-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Create Account</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
          <Link
            href="/login"
            className="px-6 py-3.5 rounded-xl font-semibold text-zinc-200 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 transition-all hover:text-white"
          >
            Sign In
          </Link>
          <Link
            href="/profile"
            className="px-6 py-3.5 rounded-xl font-semibold text-zinc-400 hover:text-zinc-200 bg-transparent hover:bg-zinc-900/50 border border-zinc-800/60 transition-all"
          >
            My Profile
          </Link>
        </div>

        {/* Tech Stack Pills */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2 text-xs text-zinc-400">
          <span className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-lg">Next.js 16 App Router</span>
          <span className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-lg">React 19</span>
          <span className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-lg">TypeScript</span>
          <span className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-lg">Tailwind CSS</span>
          <span className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-lg">MongoDB &amp; Mongoose</span>
          <span className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-lg">JWT &amp; HTTP-only Cookies</span>
          <span className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-lg">Nodemailer (Mailtrap)</span>
        </div>
      </section>

      {/* Feature / Flows Grid */}
      <section className="w-full max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Integrated Authentication Modules
          </h2>
          <p className="mt-2 text-zinc-400 text-sm sm:text-base">
            Every screen and endpoint is fully wired with real-time feedback and state handling.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat) => (
            <div
              key={feat.title}
              className="group relative flex flex-col justify-between p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700/80 hover:bg-zinc-900 transition-all duration-200 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-zinc-800/80 border border-zinc-700/50">
                    {feat.icon}
                  </div>
                  <span className="text-[11px] font-medium tracking-wide uppercase px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700/50">
                    {feat.badge}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white group-hover:text-indigo-300 transition-colors">
                  {feat.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                  {feat.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800/60">
                <Link
                  href={feat.href}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 group-hover:translate-x-0.5 transition-all"
                >
                  <span>{feat.cta}</span>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Security Architecture Section */}
      <section className="w-full max-w-6xl mx-auto px-4 py-12 mb-12">
        <div className="rounded-2xl bg-gradient-to-br from-zinc-900 via-zinc-900/90 to-zinc-950 border border-zinc-800 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              End-to-End Security Architecture
            </h3>
            <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
              Passwords are salted and hashed using bcryptjs. User sessions are verified server-side with cryptographic JWT tokens stored in strict HTTP-only cookies. Email tokens expire in 1 hour to prevent replay attacks.
            </p>
            <div className="mt-4 flex flex-wrap gap-4 text-xs text-zinc-300">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Bcrypt Salting (10 Rounds)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-indigo-400" />
                <span>HTTP-Only Lax Cookies</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-violet-400" />
                <span>Time-Expirable Tokens</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Link
              href="/signup"
              className="text-center px-6 py-3 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md transition"
            >
              Get Started Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
