"use client";

import React from "react";
import { Search, Plus, MoreHorizontal } from "lucide-react";

export default function LabelsPage() {
  const labels = [
    { id: 1, name: "Bug", color: "bg-red-500" },
    { id: 2, name: "Feature", color: "bg-blue-500" },
    { id: 3, name: "Enhancement", color: "bg-purple-500" },
    { id: 4, name: "Design", color: "bg-pink-500" },
    { id: 5, name: "Documentation", color: "bg-emerald-500" },
  ];

  return (
    <div className="flex w-full flex-col gap-6 pt-6 pb-20">
      <div>
        <h1 className="text-lg font-medium text-zinc-900 dark:text-white">
          Labels
        </h1>
      </div>

      <div className="flex flex-col gap-2">
        <div>
          <h2 className="text-[13px] tracking-wider text-zinc-500 dark:text-[#fff]">
            Workspace Labels
          </h2>
          <p className="mb-2 text-xs font-normal tracking-normal text-zinc-500 dark:text-[#fff]/40">
            Manage labels to organize your tasks and issues.
          </p>
        </div>

        {/* Actions Bar */}
        <div className="mb-2 flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-[#fff]/40"
            />
            <input
              type="text"
              placeholder="Search labels..."
              className="w-full rounded-md border border-[#565656] bg-white py-1.5 pl-8 pr-3 text-xs text-zinc-900 placeholder:text-zinc-500 focus:border-zinc-300 focus:outline-none focus:ring-1 focus:ring-zinc-300 dark:border-[#565656]/30 dark:bg-[#565656]/10 dark:text-white dark:placeholder:text-[#fff]/40 dark:focus:border-zinc-700 dark:focus:ring-zinc-700 transition-all"
            />
          </div>
          <button className="flex items-center gap-1.5 rounded-md bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-[#fff] dark:text-zinc-900 dark:hover:bg-zinc-200">
            New Label
          </button>
        </div>

        {/* Labels List */}
        <div className="flex flex-col gap-2">
          <div className="px-3.5 text-[11px] font-medium  tracking-wider text-zinc-500 dark:text-[#fff]/40">
            Labels
          </div>
          {labels.map((label, index) => (
            <div
              key={label.id}
              className={`flex items-center justify-between p-3.5 rounded-md border border-[#565656] bg-white dark:border-[#565656]/20 dark:bg-[#565656]/10 ${
                index !== labels.length - 1
                  ? "border-zinc-200 dark:border-zinc-800/80"
                  : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`h-1.5 w-1.5 rounded-full ${label.color}`}></div>
                <span className="text-[13px] font-normal text-zinc-900 dark:text-white">
                  {label.name}
                </span>
              </div>
              
              <button className="flex items-center justify-center rounded-md text-zinc-400 hover:text-zinc-600 dark:text-[#565656] dark:hover:text-[#fff]/60 transition-colors">
                <MoreHorizontal size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
