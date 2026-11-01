import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ToastProvider from "@/components/ToastProvider";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AuthFlow | Fullstack Authentication System",
  description: "Secure Next.js Authentication with JWT, MongoDB, Mailtrap Email Verification, and Password Reset",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-100 selection:bg-indigo-500/30 selection:text-indigo-200">
        <ToastProvider />
        <Navbar />
        <main className="flex-1 flex flex-col">{children}</main>
        <footer className="border-t border-zinc-900 bg-zinc-950 py-6 text-center text-xs text-zinc-500">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p>AuthFlow &copy; {new Date().getFullYear()} — Built with Next.js, TypeScript &amp; MongoDB</p>
            <div className="flex gap-4 text-zinc-400">
              <span className="hover:text-zinc-200 transition">JWT Authentication</span>
              <span>&bull;</span>
              <span className="hover:text-zinc-200 transition">Email Verification</span>
              <span>&bull;</span>
              <span className="hover:text-zinc-200 transition">Password Recovery</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
