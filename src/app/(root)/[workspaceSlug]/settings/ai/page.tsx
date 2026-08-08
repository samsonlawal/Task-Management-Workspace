"use client";

import React from "react";
import { Plus, Bot } from "lucide-react";

export default function AiAgentsPage() {
  return (
    <div className="flex w-full flex-col gap-6 pt-6 pb-20">
      <div>
        <h1 className="text-lg font-medium text-zinc-900 dark:text-white">
          Agent Personalization
        </h1>
      </div>

      <div className="flex flex-col gap-6">
        {/* Personal Guidance */}
        <div className="flex flex-col gap-2">
          <div className="flex flex-col">
            <h2 className="text-[13px] tracking-wider text-zinc-500 dark:text-[#fff]">
              Guidance
            </h2>
            <p className="mb-2 text-xs font-normal tracking-normal text-zinc-500 dark:text-[#fff]/40">
              Provide personal instruction for your agent&apos;s behavior.
            </p>
          </div>
          <textarea
            className="min-h-[100px] w-full resize-y rounded-md border border-[#565656] bg-white p-3 text-xs text-zinc-900 placeholder:text-zinc-500 focus:border-zinc-300 focus:outline-none focus:ring-1 focus:ring-zinc-300 dark:border-[#565656]/30 dark:bg-[#565656]/5 dark:text-white dark:placeholder:text-[#fff]/40 dark:focus:border-zinc-700 dark:focus:ring-zinc-700 transition-all"
            placeholder="E.g., Always be concise and prefer TypeScript..."
          ></textarea>
        </div>

        {/* Skills */}
        <div className="flex flex-col gap-2">
          <div className="flex flex-col">
            <h2 className="text-[13px] tracking-wider text-zinc-500 dark:text-[#fff]">
              Skills
            </h2>
            <p className="mb-2 text-xs font-normal tracking-normal text-zinc-500 dark:text-[#fff]/40">
              Add specific skills and capabilities to your agent.
            </p>
          </div>
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Add a new skill..."
              className="w-full rounded-md border border-[#565656] bg-white py-2 pl-3 pr-10 text-xs text-zinc-900 placeholder:text-zinc-500 focus:border-zinc-300 focus:outline-none focus:ring-1 focus:ring-zinc-300 dark:border-[#565656]/30 dark:bg-[#565656]/5 dark:text-white dark:placeholder:text-[#fff]/40 dark:focus:border-zinc-700 dark:focus:ring-zinc-700 transition-all"
            />
            <button className="absolute right-1.5 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-md bg-zinc-100 text-zinc-600 transition-colors hover:bg-zinc-200 dark:bg-[#565656]/20 dark:text-[#fff]/60 dark:hover:bg-[#565656]/40 dark:hover:text-white">
              <Plus size={14} />
            </button>
          </div>
        </div>

        {/* MCP Connectors */}
        <div className="flex flex-col gap-2">
          <div className="flex flex-col">
            <h2 className="text-[13px] tracking-wider text-zinc-500 dark:text-[#fff]">
              MCP Connectors
            </h2>
            <p className="mb-2 text-xs font-normal tracking-normal text-zinc-500 dark:text-[#fff]/40">
              Manage your Model Context Protocol connections.
            </p>
          </div>
          
          <div className="flex items-center justify-between rounded-md border border-[#565656] bg-white p-3.5 dark:border-[#565656]/20 dark:bg-[#565656]/5">
            <div className="flex items-center gap-3">
              {/* <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 dark:bg-[#565656]/10 dark:text-[#565656]">
                <Bot size={16} />
              </div> */}
              <div className="flex flex-col">
                {/* <span className="text-[13px] font-normal text-zinc-900 dark:text-white">
                  Local Connector
                </span> */}
                <span className="text-[11px] text-zinc-500 dark:text-[#fff]/80">
                  Not connected
                </span>
              </div>
            </div>
            <button className="flex items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-[#565656]/30 dark:bg-[#565656]/10 dark:text-zinc-300 dark:hover:bg-[#565656]/30">
              <Plus size={14} />
              Add connector
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
