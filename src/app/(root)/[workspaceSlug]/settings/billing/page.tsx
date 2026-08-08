"use client";

import React from "react";
import { Check } from "lucide-react";

export default function BillingPage() {
  return (
    <div className="poppins flex h-fit w-full flex-col gap-6 pb-24 pt-6 transition-all duration-300 max-w-[700px]">
      <div className="flex h-fit w-full flex-col gap-2 rounded-[14px] border-[1px] border-[#565656]/20 bg-[#fff] transition-all duration-300 dark:bg-[#111]">
        <div className="flex w-full flex-row justify-between border-b-[1px] border-[#565656]/20 px-6 py-6 text-left">
          <div className="flex w-fit flex-col justify-start text-left">
            <h1 className="text-[16px]">Billing & Plans</h1>
            <p className="text-[12px] text-[#565656] dark:text-[#787878]">
              Manage your workspace subscription and payment details.
            </p>
          </div>
        </div>

        <div className="flex w-full flex-col gap-6 px-6 pt-6">
          
          {/* Current Free Plan */}
          <div className="flex flex-col gap-4 rounded-xl border-[1px] border-[#565656]/60 p-5 bg-[#565656]/5 dark:bg-[#565656]/10">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <h2 className="text-[14px] font-medium text-zinc-900 dark:text-white">Free Plan</h2>
                <p className="text-[11px] text-[#565656] dark:text-[#fff]/60">For individuals and small teams.</p>
              </div>
              <span className="rounded-full bg-[#565656]/10 px-2.5 py-1 text-[10px] font-medium text-zinc-600 dark:bg-[#565656]/40 dark:text-[#fff]/80">
                Current Plan
              </span>
            </div>
            <div className="mt-2 flex flex-col gap-2 text-[12px] text-zinc-700 dark:text-[#fff]/70">
              <div className="flex items-center gap-2">
                <Check size={14} className="text-zinc-400" />
                <span>Up to 5 members</span>
              </div>
              <div className="flex items-center gap-2">
                <Check size={14} className="text-zinc-400" />
                <span>Basic task management</span>
              </div>
              <div className="flex items-center gap-2">
                <Check size={14} className="text-zinc-400" />
                <span>Community support</span>
              </div>
            </div>
          </div>

          {/* Paid Plan Details */}
          <div className="flex flex-col gap-4 rounded-xl border-[1px] border-[#565656]/20 p-5 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <h2 className="text-[14px] font-medium text-zinc-900 dark:text-white">Pro Plan</h2>
                <p className="text-[11px] text-[#565656] dark:text-[#fff]/60">For growing teams that need more power.</p>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[14px] font-medium text-zinc-900 dark:text-white">$12</span>
                <span className="text-[10px] text-zinc-500">per user / month</span>
              </div>
            </div>
            <div className="mt-2 flex flex-col gap-2 text-[12px] text-zinc-700 dark:text-[#fff]/70">
              <div className="flex items-center gap-2">
                <Check size={14} className="text-zinc-400 dark:text-[#fff]/80" />
                <span>Unlimited members & workspaces</span>
              </div>
              <div className="flex items-center gap-2">
                <Check size={14} className="text-zinc-400 dark:text-[#fff]/80" />
                <span>Advanced AI Agents</span>
              </div>
              <div className="flex items-center gap-2">
                <Check size={14} className="text-zinc-400 dark:text-[#fff]/80" />
                <span>Custom roles & permissions</span>
              </div>
              <div className="flex items-center gap-2">
                <Check size={14} className="text-zinc-400 dark:text-[#fff]/80" />
                <span>Priority 24/7 support</span>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-4 flex w-full items-center justify-end rounded-b-[14px] p-6 dark:bg-[#1a1a1a]">
          <button className="rounded-md border-[1px] border-[#565656]/60 bg-[white] px-[12px] py-1 text-[11px] font-medium text-[#111] transition-colors duration-300 hover:border-[#565656]/10 hover:bg-[#565656]/10 hover:text-white/50">
            Upgrade to Pro
          </button>
        </div>
      </div>
    </div>
  );
}
