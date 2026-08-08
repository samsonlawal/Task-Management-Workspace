"use client";

import React from "react";
import { ChevronRight, Figma, Trello, Gitlab } from "lucide-react";

export default function IntegrationsPage() {
  const integrations = [
    {
      id: "figma",
      name: "Figma",
      icon: <Figma className="text-[#F24E1E]" size={16} />,
      bg: "bg-[#F24E1E]/10",
    },
    {
      id: "trello",
      name: "Trello",
      icon: <Trello className="text-[#0052CC]" size={16} />,
      bg: "bg-[#0052CC]/10",
    },
    {
      id: "gitlab",
      name: "GitLab",
      icon: <Gitlab className="text-[#FC6D26]" size={16} />,
      bg: "bg-[#FC6D26]/10",
    },
  ];

  return (
    <div className="flex w-full flex-col gap-6 pt-6 pb-20">
      <div>
        <h1 className="text-lg font-medium text-zinc-900 dark:text-white">
          Integrations
        </h1>
      </div>

      <div className="flex flex-col gap-2">
        <div>
          <h2 className="text-[13px] tracking-wider text-zinc-500 dark:text-[#fff]">
            Third-Party Apps
          </h2>
          <p className="mb-2 text-xs font-normal tracking-normal text-zinc-500 dark:text-[#fff]/40">
            Manage your third-party integrations.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          {integrations.map((integration, index) => (
            <div
              key={integration.id}
              className={`flex cursor-pointer items-center justify-between rounded-md border border-[#565656] bg-white p-3.5 transition-colors hover:bg-zinc-50 dark:border-[#565656]/20 dark:bg-[#565656]/10 dark:hover:bg-[#565656]/20 ${
                index !== integrations.length - 1
                  ? "border-zinc-200 dark:border-zinc-800/80"
                  : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${integration.bg}`}
                >
                  {integration.icon}
                </div>
                <span className="text-[13px] font-normal text-zinc-900 dark:text-white">
                  {integration.name}
                </span>
              </div>
              <ChevronRight
                size={16}
                className="text-zinc-400 transition-transform group-hover:translate-x-1 dark:text-[#565656]"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
