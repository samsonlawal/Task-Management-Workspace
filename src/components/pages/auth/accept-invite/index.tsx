"use client";

import { useSearchParams, useRouter } from "next/navigation";
import React from "react";
import Brand from "@/components/reuseables/Brand";
import { Mail, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AcceptInvite() {
  const searchParams = useSearchParams();
  const invitedBy = searchParams.get("invitedBy") || "A teammate";
  const workspaceName = searchParams.get("workspace") || "Workspace";
  const email = searchParams.get("email") || "";

  return (
    <div className="poppins relative flex min-h-screen w-full flex-col items-center justify-between bg-zinc-50 dark:bg-[#111] px-4 py-8 text-zinc-950 dark:text-white overflow-hidden">
      {/* Header Row: Logo & Back Button */}
      <div className="w-full max-w-[1200px] flex items-center justify-between px-2 sm:px-6 relative z-10">
        <Brand />
        <Link
          href="/"
          className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
        >
          <ArrowLeft size={13} />
          <span>Back to Taskstack</span>
        </Link>
      </div>

      {/* Flat Workspace-Consistent Invitation Card */}
      <div className="my-auto relative z-10 w-full max-w-[440px] p-8 rounded-xl bg-white dark:bg-[#1a1a1a] border border-zinc-200 dark:border-zinc-800/80 shadow-xl flex flex-col items-center text-center gap-6">
        {/* Envelope Icon */}
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-550 dark:text-indigo-400 border border-indigo-500/20">
          <Mail className="h-6 w-6" />
        </div>

        {/* Invitation Text */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-white">
            Workspace Invitation
          </h2>
          <p className="text-[13px] text-zinc-500 dark:text-zinc-400 max-w-[320px] mx-auto leading-relaxed">
            <span className="font-semibold text-zinc-800 dark:text-zinc-200">{invitedBy}</span> has invited you to join the{" "}
            <span className="font-bold text-zinc-900 dark:text-white text-sm bg-zinc-100 dark:bg-zinc-800/50 px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-700/30 inline-block mt-0.5">{workspaceName}</span> workspace.
          </p>
        </div>

        {/* Login Instructions */}
        <div className="w-full bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 text-xs space-y-1.5">
          <p className="text-zinc-550 dark:text-zinc-500 font-medium">To accept this invitation:</p>
          <p className="text-zinc-600 dark:text-zinc-400">
            Please log in or sign up using the invited email:
          </p>
          <p className="font-semibold text-[#563892] dark:text-indigo-400 break-all select-all pt-0.5 text-xs">
            {email || "your invited email"}
          </p>
        </div>

        {/* Action Button */}
        <Link
          href={`/auth/sign-in?email=${encodeURIComponent(email)}`}
          className="group flex w-full items-center justify-center gap-2 rounded-lg bg-[#563892] hover:bg-[#482e7b] px-4 py-2.5 text-xs font-semibold text-white transition-all active:scale-98"
        >
          <span>Login to Accept Invite</span>
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
        </Link>

        {/* Alternate Sign Up Link */}
        <p className="text-center text-xs text-zinc-500 dark:text-zinc-400 mt-2">
          Don't have an account?{" "}
          <Link
            href={`/auth/sign-up?email=${encodeURIComponent(email)}`}
            className="text-[#563892] dark:text-indigo-400 hover:text-[#482e7b] dark:hover:text-indigo-300 font-medium transition-colors hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>

      {/* Footer */}
      <div className="mb-4 relative z-10">
        <p className="text-[11px] text-zinc-455 dark:text-zinc-650 tracking-wide select-none">
          © {new Date().getFullYear()} @Taskstackhq. All Rights Reserved.
        </p>
      </div>
    </div>
  );
}
