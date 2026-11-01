import Link from "next/link";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function UserProfilePage({ params }: PageProps) {
  const { id } = await params;

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-zinc-900/80 border border-zinc-800 rounded-2xl p-8 backdrop-blur-md shadow-xl text-center">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-indigo-500 to-violet-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 mb-6">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>

        <span className="text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          Dynamic User Route
        </span>

        <h1 className="text-2xl font-bold text-white tracking-tight mt-4">
          User Profile
        </h1>
        <p className="text-xs text-zinc-400 mt-2">
          Loaded dynamically from the URL path segment
        </p>

        <div className="my-6 p-4 rounded-xl bg-zinc-950 border border-zinc-800">
          <p className="text-[11px] uppercase tracking-wider text-zinc-500 font-medium mb-1">
            Dynamic Route Parameter (User ID)
          </p>
          <code className="text-sm font-mono text-indigo-300 break-all select-all">
            {id}
          </code>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/profile"
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md transition"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Dashboard</span>
          </Link>
          <Link
            href="/"
            className="flex-1 inline-flex items-center justify-center px-4 py-2.5 rounded-xl text-sm font-medium text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 transition"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
