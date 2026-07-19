"use client";

import React, { useState } from "react";
import { useForgotPassword } from "@/hooks/api/auth";
import { showErrorToast, showSuccessToast } from "@/utils/toaster";
import Brand from "@/components/reuseables/Brand";
import { CheckCircle2, ArrowLeft, Loader2, Mail } from "lucide-react";
import Link from "next/link";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const { loading, onForgotPassword } = useForgotPassword();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      showErrorToast({ message: "Email is required." });
      return;
    }

    onForgotPassword({
      payload: email,
      successCallback: () => {
        setSuccess(true);
        showSuccessToast({ message: "🚀 Reset link sent successfully!" });
      },
      errorCallback: (msg) => {
        showErrorToast({ message: msg || "Failed to send reset link." });
      },
    });
  };

  return (
    <div className="poppins relative flex min-h-screen w-full flex-col items-center justify-between bg-[#0a0a0a] px-4 py-8 text-white overflow-hidden">
      {/* Radial Glow Backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-indigo-600/10 blur-[100px] sm:blur-[130px] pointer-events-none" />

      {/* Header Logo */}
      <div className="mt-8 relative z-10">
        <Brand />
      </div>

      {/* Glassmorphic Forgot Password Card */}
      <div className="my-auto relative z-10 w-full max-w-[420px] p-8 rounded-2xl bg-zinc-900/40 backdrop-blur-md border border-zinc-800/80 shadow-2xl flex flex-col justify-center min-h-[320px]">
        {success ? (
          <div className="space-y-6 flex flex-col items-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-semibold tracking-tight text-white">Check your inbox</h2>
              <p className="text-xs text-zinc-400 max-w-[280px] mx-auto leading-relaxed">
                We have sent secure password recovery instructions to <span className="font-semibold text-zinc-200">{email}</span>.
              </p>
            </div>
            <Link
              href="/auth/sign-in"
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-white hover:bg-zinc-200 px-4 py-2.5 text-xs font-semibold text-black transition-all active:scale-98"
            >
              <ArrowLeft size={14} />
              <span>Return to login</span>
            </Link>
          </div>
        ) : (
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="flex flex-col text-center gap-1">
              <h2 className="text-xl font-semibold tracking-tight text-white">Forgot Password?</h2>
              <p className="text-xs text-zinc-400 max-w-[280px] mx-auto leading-relaxed">
                Enter your email address below and we'll send you a link to reset your password
              </p>
            </div>

            {/* Email Input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-zinc-300">Email</label>
              <div className="relative">
                <input
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-zinc-850 bg-zinc-900/50 pl-3 pr-10 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none transition-colors"
                />
                <div className="absolute inset-y-0 right-3 flex items-center text-zinc-400 pointer-events-none">
                  <Mail size={16} />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-white hover:bg-zinc-200 px-4 py-2.5 text-sm font-semibold text-black transition-all active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Send Reset Link</span>
              {loading && <Loader2 size={16} className="animate-spin text-black" />}
            </button>

            <p className="text-center text-xs text-zinc-400 mt-2">
              Remember your password?{" "}
              <Link
                href="/auth/sign-in"
                className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors hover:underline"
              >
                Sign In
              </Link>
            </p>
          </form>
        )}
      </div>

      {/* Footer */}
      <div className="mb-4 relative z-10">
        <p className="text-[11px] text-zinc-600 tracking-wide select-none">
          © {new Date().getFullYear()} @Taskstackhq. All Rights Reserved.
        </p>
      </div>
    </div>
  );
}
