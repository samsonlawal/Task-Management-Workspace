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
    <div className="poppins relative flex min-h-screen w-full flex-col items-center justify-between overflow-hidden bg-zinc-50 px-4 py-8 text-zinc-950 dark:bg-[#111] dark:text-white">
      {/* Header Row: Logo & Back Button */}
      <div className="relative z-10 flex w-full max-w-[1200px] items-center justify-between px-2 sm:px-6">
        <Brand />
        <Link
          href="/"
          className="flex items-center gap-1.5 text-xs text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
        >
          <ArrowLeft size={13} />
          <span>Back to Taskstack</span>
        </Link>
      </div>

      {/* Flat Workspace-Consistent Invitation Card */}
      <div className="relative z-10 my-auto flex w-full max-w-[440px] flex-col items-center gap-6 rounded-xl border border-zinc-200 bg-white p-8 text-center shadow-xl dark:border-zinc-800/80 dark:bg-[#1a1a1a]">
        {/* Envelope Icon */}
        <div className="text-indigo-550 flex h-12 w-12 items-center justify-center rounded-full border border-indigo-500/20 bg-indigo-500/10 dark:text-indigo-400">
          <Mail className="h-6 w-6" />
        </div>

        {/* Invitation Text */}
        <div className="space-y-2">
          <h2 className="text-xl font-medium tracking-tight text-zinc-900 dark:text-white">
            Workspace Invitation
          </h2>
          <p className="mx-auto max-w-[320px] text-[13px] leading-relaxed text-zinc-500 dark:text-zinc-400">
            <span className="font-medium text-zinc-800 dark:text-zinc-200">
              {invitedBy}
            </span>{" "}
            has invited you to join the{" "}
            <span className="mt-0.5 inline-block rounded border border-zinc-200 bg-zinc-100 px-2 py-0.5 text-sm font-medium text-zinc-900 dark:border-zinc-700/30 dark:bg-zinc-800/50 dark:text-white">
              {workspaceName}
            </span>{" "}
            workspace.
          </p>
        </div>

        {/* Login Instructions */}
        <div className="w-full space-y-1.5 rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-xs dark:border-zinc-800 dark:bg-zinc-950/40">
          {/* <p className="text-zinc-550 font-medium dark:text-zinc-500">
            To accept this invitation:
          </p> */}
          <p className="text-zinc-600 dark:text-zinc-400">
            Please log in or sign up using the invited email:
          </p>
          <p className="select-all break-all pt-0.5 text-xs font-medium text-[#563892] dark:text-indigo-400">
            {email || "your invited email"}
          </p>
        </div>

        {/* Action Button */}
        <Link
          href={`/auth/sign-in?email=${encodeURIComponent(email)}`}
          className="active:scale-98 group flex w-full items-center justify-center gap-2 rounded-lg bg-[#563892] px-4 py-2.5 text-xs font-medium text-white transition-all hover:bg-[#482e7b]"
        >
          <span>Login to Accept Invite</span>
          <ArrowRight
            size={14}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </Link>

        {/* Alternate Sign Up Link */}
        <p className="mt-2 text-center text-xs text-zinc-500 dark:text-zinc-400">
          Don't have an account?{" "}
          <Link
            href={`/auth/sign-up?email=${encodeURIComponent(email)}`}
            className="font-medium text-[#563892] transition-colors hover:text-[#482e7b] hover:underline dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            Sign Up
          </Link>
        </p>
      </div>

      {/* Footer */}
      <div className="relative z-10 mb-4">
        <p className="text-zinc-455 select-none text-[11px] tracking-wide dark:text-white/50">
          © {new Date().getFullYear()} @Taskstackhq. All Rights Reserved.
        </p>
      </div>
    </div>
  );
}
