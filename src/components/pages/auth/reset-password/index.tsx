"use client";

import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { showErrorToast, showSuccessToast } from "@/utils/toaster";
import Brand from "@/components/reuseables/Brand";
import { Lock, Loader2, KeyRound, Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useResetPasswordMutation } from "@/redux/api/authApiSlice";

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [email, setEmail] = useState(searchParams.get("email") || "");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [next, setNext] = useState(false);
  const [verifyCode, setVerifyCode] = useState(false);

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !code.trim() || !password.trim()) {
      showErrorToast({ message: "All fields are required." });
      return;
    }

    if (password !== confirmPassword) {
      showErrorToast({ message: "Passwords do not match." });
      return;
    }

    try {
      const res = await resetPassword({ email, code, password }).unwrap();
      showSuccessToast({
        message: res?.message || "Password reset successful! Please log in.",
      });
      router.push("/auth/sign-in");
    } catch (error: any) {
      showErrorToast({
        message: error?.data?.message || "Failed to reset password.",
      });
    }
  };

  const handleNext = () => {
    if (!code.trim()) {
      showErrorToast({
        message: "Please provide the code sent to your email.",
      });
      return;
    }

    setVerifyCode(true);
  };

  return (
    <div className="poppins relative flex min-h-screen w-full flex-col items-center justify-between overflow-hidden bg-white px-4 py-8 text-[#111] dark:bg-[#111] dark:text-white">
      <div className="relative z-10 mt-8">
        <Brand />
      </div>

      <div className="relative z-10 my-auto flex min-h-[380px] w-full max-w-[420px] flex-col justify-center rounded-lg border border-[#EEEEEE] bg-white p-6 shadow-lg dark:border-[#565656]/20 dark:bg-[#1a1a1a]/50">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1 pb-4 text-center">
            <h2 className="text-xl font-medium tracking-tight text-[#111] dark:text-white">
              Reset Password
            </h2>
            <p className="mx-auto max-w-[280px] text-xs leading-relaxed text-[#565656] dark:text-[#fff]/50">
              {!verifyCode
                ? "Enter the code sent to your email address."
                : "Enter your new password and confirm to reset."}
            </p>
          </div>

          {/* Email */}
          {/* <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-[#111] dark:text-white/80">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-[#EEEEEE] bg-[#EEEEEE]/30 py-2 pl-3 pr-10 text-sm text-[#111] placeholder-zinc-400 focus:border-[#fff] focus:outline-none dark:border-[#565656]/20 dark:bg-[#111]/30 dark:text-white"
              />
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-zinc-400">
                <Mail size={16} />
              </div>
            </div>
          </div> */}

          {/* Reset Code */}
          {!verifyCode ? (
            <div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-[#111] dark:text-white/50">
                  6-Digit Code
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    maxLength={6}
                    placeholder="123456"
                    value={code}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value.length > 6) {
                        e.target.value = value.slice(0, 6);
                      }
                      setCode(e.target.value);
                    }}
                    className="w-full rounded-md border border-[#EEEEEE] bg-[#EEEEEE]/30 py-2 pl-3 pr-10 text-sm tracking-widest text-[#111] placeholder-zinc-400 focus:border-zinc-500 focus:outline-none dark:border-[#565656]/20 dark:bg-[#111]/30 dark:text-white dark:focus:border-zinc-400"
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-zinc-400">
                    <KeyRound size={16} />
                  </div>
                </div>
              </div>
              <button
                // type="submit"
                onClick={handleNext}
                disabled={isLoading}
                className="active:scale-98 mt-2 flex h-[42px] w-full items-center justify-center gap-2 rounded-lg bg-white hover:bg-zinc-100 border border-gray-200 shadow-sm px-4 py-2.5 text-sm font-medium text-zinc-900 transition-all disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none"
              >
                <span>Verify Code</span>
                {isLoading && (
                  <Loader2 size={16} className="animate-spin text-zinc-900" />
                )}
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {/* New Password */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-[#111] dark:text-white/80">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-md border border-[#EEEEEE] bg-[#EEEEEE]/30 py-2 pl-3 pr-10 text-sm text-[#111] placeholder-zinc-400 focus:border-zinc-500 focus:outline-none dark:border-[#565656]/20 dark:bg-[#111]/30 dark:text-white dark:focus:border-zinc-400"
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-zinc-400">
                    <Lock size={16} />
                  </div>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-[#111] dark:text-white/80">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full rounded-md border border-[#EEEEEE] bg-[#EEEEEE]/30 py-2 pl-3 pr-10 text-sm text-[#111] placeholder-zinc-400 focus:border-zinc-500 focus:outline-none dark:border-[#565656]/20 dark:bg-[#111]/30 dark:text-white dark:focus:border-zinc-400"
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-zinc-400">
                    <Lock size={16} />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="active:scale-98 mt-2 flex h-[42px] w-full items-center justify-center gap-2 rounded-lg bg-white hover:bg-zinc-100 border border-gray-200 shadow-sm px-4 py-2.5 text-sm font-medium text-zinc-900 transition-all disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none"
              >
                <span>Reset Password</span>
                {isLoading && (
                  <Loader2 size={16} className="animate-spin text-zinc-900" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setVerifyCode(false)}
                className="active:scale-98 mt-2 flex h-[42px] w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-zinc-900 transition-all hover:bg-zinc-100"
              >
                <span>Back to Verify Code</span>
              </button>
            </div>
          )}

          <p className="mt-2 text-center text-xs text-zinc-400">
            <Link
              href="/auth/sign-in"
              className="inline-flex items-center gap-1.5 font-medium text-zinc-900 dark:text-white transition-colors hover:underline"
            >
              <ArrowLeft size={14} />
              <span>Back to Sign In</span>
            </Link>
          </p>
        </form>
      </div>

      <div className="relative z-10 mb-4">
        <p className="select-none text-[11px] tracking-wide text-zinc-600">
          © {new Date().getFullYear()} @Taskstackhq. All Rights Reserved.
        </p>
      </div>
    </div>
  );
}
