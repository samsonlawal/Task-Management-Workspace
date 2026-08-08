"use client";

import React from "react";
import { Github, Calendar, CheckCircle2 } from "lucide-react";
// We use lucide-react for now, simulating brand icons where needed.
// Real SVGs for Slack and Notion can be swapped in later if requested.
import { Hash, FileText } from "lucide-react";

export default function ConnectedAccountsPage() {
  const accounts = [
    {
      id: "slack",
      name: "Slack",
      description: "Sync your Slack messages and notifications.",
      connected: true,
      icon: <Hash className="text-[#E01E5A]" size={16} />,
      bg: "bg-[#E01E5A]/10",
    },
    {
      id: "notion",
      name: "Notion",
      description: "Sync your Notion docs and pages.",
      connected: false,
      icon: <FileText className="text-zinc-900 dark:text-[#565656]" size={16} />,
      bg: "bg-zinc-100 dark:bg-[#565656]/10",
    },
    {
      id: "google_calendar",
      name: "Google Calendar",
      description: "Sync your events and scheduling.",
      connected: true,
      icon: <Calendar className="text-blue-500" size={16} />,
      bg: "bg-blue-500/10",
    },
    {
      id: "github",
      name: "GitHub",
      description: "Sync your repositories and issues.",
      connected: false,
      icon: <Github className="text-zinc-900 dark:text-[#565656]" size={16} />,
      bg: "bg-zinc-100 dark:bg-[#565656]/10",
    },
  ];

  return (
    <div className="flex w-full flex-col gap-6 pt-6 pb-20">
      <div>
        <h1 className="text-lg font-medium text-zinc-900 dark:text-white">
          Connected Accounts
        </h1>
      </div>

      <div className="flex flex-col gap-2">
        <div>
          <h2 className="text-[13px] tracking-wider text-zinc-500 dark:text-[#fff]">
            Accounts
          </h2>
          <p className="mb-2 text-xs font-normal tracking-normal text-zinc-500 dark:text-[#fff]/40">
            Connect external apps to sync your data.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          {accounts.map((account, index) => (
            <div
              key={account.id}
              className={`flex items-center justify-between rounded-md border border-[#565656] bg-white p-3.5 dark:border-[#565656]/20 dark:bg-[#565656]/10 ${
                index !== accounts.length - 1
                  ? "border-zinc-200 dark:border-zinc-800/80"
                  : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${account.bg}`}
                >
                  {account.icon}
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-normal text-zinc-900 dark:text-white">
                      {account.name}
                    </span>
                    {account.connected && (
                      <CheckCircle2
                        size={14}
                        className="text-emerald-500"
                        strokeWidth={2.5}
                      />
                    )}
                  </div>
                  <span className="flex flex-row items-center gap-2 text-[11px] text-zinc-500 dark:text-[#fff]/60">
                    {account.description}
                  </span>
                </div>
              </div>
              <button
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                  account.connected
                    ? "border border-zinc-200 text-zinc-600 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-white"
                    : "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
                }`}
              >
                {account.connected ? "Disconnect" : "Connect"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
