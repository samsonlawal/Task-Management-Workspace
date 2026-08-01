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
    <div className="poppins relative flex min-h-screen w-full flex-col items-center justify-between bg-white dark:bg-[#111] px-4 py-8 text-[#111] dark:text-white overflow-hidden">
      {/* Header Logo */}
      <div className="mt-8 relative z-10">
        <Brand />
      </div>

      {/* Forgot Password Card Container */}
      <div className="my-auto relative z-10 w-full max-w-[420px] p-6 rounded-lg border border-[#EEEEEE] bg-white dark:border-[#565656]/20 dark:bg-[#1a1a1a]/50 shadow-lg flex flex-col justify-center min-h-[320px]">
        {success ? (
          <div className="space-y-6 flex flex-col items-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#609328]/10 text-[#609328] border border-[#609328]/20">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-medium tracking-tight text-[#111] dark:text-white">Check your inbox</h2>
              <p className="text-xs text-[#565656] dark:text-[#fff]/50 max-w-[280px] mx-auto leading-relaxed">
                We have sent secure password recovery instructions to <span className="font-semibold text-[#111] dark:text-white">{email}</span>.
              </p>
            </div>
            <Link
              href="/auth/sign-in"
              className="mt-2 flex h-[42px] w-full items-center justify-center gap-2 rounded-lg bg-[#609328] hover:bg-[#609328]/90 px-4 py-2.5 text-sm font-medium text-white transition-all active:scale-98"
            >
              <ArrowLeft size={14} />
              <span>Return to login</span>
            </Link>
          </div>
        ) : (
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="flex flex-col text-center gap-1">
              <h2 className="text-xl font-medium tracking-tight text-[#111] dark:text-white">Forgot Password?</h2>
              <p className="text-xs text-[#565656] dark:text-[#fff]/50 max-w-[280px] mx-auto leading-relaxed">
                Enter your email address below and we'll send you a link to reset your password
              </p>
            </div>

            {/* Email Input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[#111] dark:text-white/80">Email</label>
              <div className="relative">
                <input
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md border border-[#EEEEEE] bg-[#EEEEEE]/30 dark:border-[#565656]/20 dark:bg-[#111]/30 pl-3 pr-10 py-2.5 text-sm text-[#111] dark:text-white placeholder-zinc-400 focus:border-[#609328] focus:outline-none transition-colors"
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
              className="mt-4 flex h-[42px] w-full items-center justify-center gap-2 rounded-lg bg-[#609328] hover:bg-[#609328]/90 px-4 py-2.5 text-sm font-medium text-white transition-all active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Send Reset Link</span>
              {loading && <Loader2 size={16} className="animate-spin text-white" />}
            </button>

            <p className="text-center text-xs text-zinc-400 mt-2">
              Remember your password?{" "}
              <Link
                href="/auth/sign-in"
                className="text-[#609328] hover:text-[#609328]/80 font-medium transition-colors hover:underline"
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
