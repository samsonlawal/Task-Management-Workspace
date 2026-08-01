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
    <div className="poppins relative flex min-h-screen w-full flex-col items-center justify-between overflow-hidden bg-white dark:bg-[#111] px-4 py-8 text-[#111] dark:text-white">
      {/* Header Row: Logo & Back Button */}
      <div className="relative z-10 flex w-full max-w-[1200px] items-center justify-between px-2 sm:px-6">
        <Brand />
        <Link
          href="/"
          className="flex items-center gap-1.5 text-xs text-[#565656] dark:text-[#fff]/60 transition-colors hover:text-[#111] dark:hover:text-white"
        >
          <ArrowLeft size={13} />
          <span>Back to Taskstack</span>
        </Link>
      </div>

      {/* Flat Workspace-Consistent Invitation Card */}
      <div className="relative z-10 my-auto flex w-full max-w-[440px] flex-col items-center gap-6 rounded-lg border border-[#EEEEEE] bg-white dark:border-[#565656]/20 dark:bg-[#1a1a1a]/50 p-6 text-center shadow-lg">
        {/* Envelope Icon */}
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#609328]/20 bg-[#609328]/10 text-[#609328]">
          <Mail className="h-6 w-6" />
        </div>

        {/* Invitation Text */}
        <div className="space-y-2">
          <h2 className="text-xl font-medium tracking-tight text-[#111] dark:text-white">
            Workspace Invitation
          </h2>
          <p className="mx-auto max-w-[320px] text-[13px] leading-relaxed text-[#565656] dark:text-[#fff]/60">
            <span className="font-medium text-[#111] dark:text-white">
              {invitedBy}
            </span>{" "}
            has invited you to join the{" "}
            <span className="mt-0.5 inline-block rounded border border-[#EEEEEE] bg-[#EEEEEE]/40 dark:border-[#565656]/30 dark:bg-[#111]/40 px-2 py-0.5 text-sm font-medium text-[#111] dark:text-white">
              {workspaceName}
            </span>{" "}
            workspace.
          </p>
        </div>

        {/* Login Instructions */}
        <div className="w-full space-y-1.5 rounded-md border border-[#EEEEEE] bg-[#EEEEEE]/30 dark:border-[#565656]/20 dark:bg-[#111]/30 p-4 text-xs">
          <p className="text-[#565656] dark:text-[#fff]/60">
            Please log in or sign up using the invited email:
          </p>
          <p className="select-all break-all pt-0.5 text-xs font-medium text-[#609328]">
            {email || "your invited email"}
          </p>
        </div>

        {/* Action Button */}
        <Link
          href={`/auth/sign-in?email=${encodeURIComponent(email)}`}
          className="active:scale-98 group flex h-[42px] w-full items-center justify-center gap-2 rounded-lg bg-[#609328] hover:bg-[#609328]/90 px-4 py-2.5 text-sm font-medium text-white transition-all"
        >
          <span>Login to Accept Invite</span>
          <ArrowRight
            size={14}
            className="transition-transform group-hover:translate-x-0.5 text-white"
          />
        </Link>

        {/* Alternate Sign Up Link */}
        <p className="mt-2 text-center text-xs text-zinc-500 dark:text-zinc-400">
          Don't have an account?{" "}
          <Link
            href={`/auth/sign-up?email=${encodeURIComponent(email)}`}
            className="font-medium text-[#609328] transition-colors hover:text-[#609328]/80 hover:underline"
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
