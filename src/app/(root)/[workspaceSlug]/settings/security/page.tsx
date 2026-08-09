"use client";

import React from "react";
import { Monitor, Smartphone, MoreVertical } from "lucide-react";

export default function SecurityAndAccessPage() {
  const sessions = [
    {
      id: 1,
      device: "MacBook Pro - Chrome",
      location: "San Francisco, CA",
      isCurrent: true,
      icon: <Monitor className="text-zinc-600 dark:text-[#565656]" size={16} />,
    },
    {
      id: 2,
      device: "Chrome on Android",
      location: "San Francisco, CA",
      isCurrent: false,
      icon: <Smartphone className="text-zinc-600 dark:text-[#565656]" size={16} />,
    },
  ];

  return (
    <div className="flex w-full flex-col gap-6 pt-6 pb-20">
      <div>
        <h1 className="text-lg font-medium text-zinc-900 dark:text-white">
          Security & Access
        </h1>
      
      </div>

      <div className="flex flex-col gap-2">
        <div>
        <h2 className="text-[13px] tracking-wider text-zinc-500 dark:text-[#fff]">
           Sessions
        </h2>
          <p className="text-xs text-zinc-500 dark:text-[#fff]/40 mb-2 font-normal tracking-normal">
          Manage your logged-in devices and sessions.
        </p>
        </div>

        <div className="flex flex-col gap-2">
          {sessions.map((session, index) => (
            <div
              key={session.id}
              className={`flex items-center justify-between p-3.5 rounded-md border border-zinc-200 bg-white dark:border-[#565656]/20 dark:bg-[#565656]/10`}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 dark:bg-[#565656]/10">
                  {session.icon}
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-normal text-zinc-900 dark:text-white">
                      {session.device}
                    </span>
                    
                  </div>
                  <span className="text-[11px] flex flex-row items-center gap-2  text-zinc-500 dark:text-[#fff]/60">
                    
                    {session.isCurrent && (
                     <>
                       <div
                        className="h-1 w-1 rounded-full bg-emerald-500"
                        title="Current Session"
                      />
                      <p className="text-emerald-500">current session</p>
                     </>
                    )}
                    {session.location}
                  </span>
                </div>
              </div>
              <button
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  session.isCurrent
                    ? "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
                    : "text-red-700 hover:bg-red-50 dark:text-red-500 dark:hover:bg-red-950/30"
                }`}
              >
                {session.isCurrent ? "Log out" : "Revoke access"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )}
