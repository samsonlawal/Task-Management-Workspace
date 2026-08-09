"use client";

import React, { useState } from "react";
import { Github, Calendar, CheckCircle2, Hash, FileText } from "lucide-react";
import { useDispatch } from "react-redux";
import { openIntegrationModal } from "@/redux/Slices/modalSlice";
import { INTEGRATIONS_LIST } from "@/constants/integrations";

export default function ConnectedAccountsPage() {
  const dispatch = useDispatch();

  const accounts = INTEGRATIONS_LIST;

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
              className={`flex items-center justify-between rounded-md border border-zinc-200 bg-white p-3.5 dark:border-[#565656]/20 dark:bg-[#565656]/10`}
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
                onClick={() => !account.connected && dispatch(openIntegrationModal(account))}
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
