"use client";

import React, { useState } from "react";
import { useForgotPassword } from "@/hooks/api/auth";
import { showErrorToast, showSuccessToast } from "@/utils/toaster";
import Brand from "@/components/reuseables/Brand";
import { CheckCircle2, ArrowLeft, Loader2, Mail } from "lucide-react";
import Link from "next/link";
import {
  useForgotPasswordMutation,
  useResetPasswordMutation,
} from "@/redux/api/authApiSlice";
import { redirect } from "next/navigation";
import router from "next/router";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  // const { loading, onForgotPassword } = useForgotPassword();

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(email);
    if (!email.trim()) {
      showErrorToast({ message: "Email is required." });
      return;
    }

    try {
      const res = await forgotPassword(email).unwrap();

      showSuccessToast({
        message: "🚀 Reset code sent successfully!",
      });
      // setSuccess(true);
      router.push(`/auth/reset-password?email=${encodeURIComponent(email)}`);
    } catch (error: any) {
      showErrorToast({
        message: error?.data?.message || "Failed to send reset code.",
      });
    }
  };

  return (
    <div className="poppins relative flex min-h-screen w-full flex-col items-center justify-between overflow-hidden bg-white px-4 py-8 text-[#111] dark:bg-[#111] dark:text-white">
      {/* Header Logo */}
      <div className="relative z-10 mt-8">
        <Brand />
      </div>

      {/* Forgot Password Card Container */}
      <div className="relative z-10 my-auto flex min-h-[320px] w-full max-w-[420px] flex-col justify-center rounded-lg border border-[#EEEEEE] bg-white p-6 shadow-lg dark:border-[#565656]/20 dark:bg-[#1a1a1a]/50">
        {success ? (
          <div className="flex flex-col items-center space-y-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#fff]/20 bg-[#fff]/10 text-[#fff]">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-medium tracking-tight text-[#111] dark:text-white">
                Check your inbox
              </h2>
              <p className="mx-auto max-w-[280px] text-xs leading-relaxed text-[#565656] dark:text-[#fff]/50">
                We have sent secure password recovery instructions to{" "}
                <span className="font-semibold text-[#111] dark:text-white">
                  {email}
                </span>
                .
              </p>
            </div>
            <Link
              href={`/auth/reset-password?email=${encodeURIComponent(email)}`}
              className="active:scale-98 mt-2 flex h-[42px] w-full items-center justify-center gap-2 rounded-lg bg-[#fff] px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-[#fff]/90"
            >
              <ArrowLeft size={14} />
              <span></span>
            </Link>
          </div>
        ) : (
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1 text-center">
              <h2 className="text-xl font-medium tracking-tight text-[#111] dark:text-white">
                Forgot Password?
              </h2>
              <p className="mx-auto max-w-[280px] text-xs leading-relaxed text-[#565656] dark:text-[#fff]/50">
                Enter your email address below and we'll send you a link to
                reset your password
              </p>
            </div>

            {/* Email Input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[#111] dark:text-white/80">
                Email
              </label>
              <div className="relative">
                <input
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md border border-[#EEEEEE] bg-[#EEEEEE]/30 py-2.5 pl-3 pr-10 text-sm text-[#111] placeholder-zinc-400 transition-colors focus:border-zinc-500 focus:outline-none dark:border-[#565656]/20 dark:bg-[#111]/30 dark:text-white dark:focus:border-zinc-400"
                />
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-zinc-400">
                  <Mail size={16} />
                </div>
              </div>
            </div>

            {/* Submit Button */}

            <button
              type="submit"
              disabled={isLoading}
              className="active:scale-98 mt-4 flex h-[42px] w-full items-center justify-center gap-2 rounded-lg bg-white hover:bg-zinc-100 border border-gray-200 shadow-sm px-4 py-2.5 text-sm font-medium text-zinc-900 transition-all disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none"
            >
              <span>Send Reset Link</span>
              {isLoading && (
                <Loader2 size={16} className="animate-spin text-zinc-900" />
              )}
            </button>

            <p className="mt-2 text-center text-xs text-zinc-400">
              Remember your password?{" "}
              <Link
                href="/auth/sign-in"
                className="font-medium text-zinc-900 dark:text-white transition-colors hover:underline"
              >
                Sign In
              </Link>
            </p>
          </form>
        )}
      </div>

      {/* Footer */}
      <div className="relative z-10 mb-4">
        <p className="select-none text-[11px] tracking-wide text-zinc-600">
          © {new Date().getFullYear()} @Taskstackhq. All Rights Reserved.
        </p>
      </div>
    </div>
  );
}
