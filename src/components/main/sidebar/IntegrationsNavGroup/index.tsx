"use client";

import React, { useState } from "react";
import { Workflow, ChevronDown, ChevronRight } from "lucide-react";
import { showSuccessToast } from "@/utils/toaster";

const SlackIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0">
    <g fill="none" fillRule="evenodd">
      <path
        d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523 2.528 2.528 0 0 1-2.522-2.523 2.528 2.528 0 0 1 2.522-2.52h2.52v2.52zm1.261 0a2.528 2.528 0 0 1 2.52-2.52h5.043a2.528 2.528 0 0 1 2.522 2.52v5.042a2.528 2.528 0 0 1-2.522 2.52H8.824a2.528 2.528 0 0 1-2.52-2.52v-5.042z"
        fill="#36C5F0"
      />
      <path
        d="M8.824 5.043a2.528 2.528 0 0 1-2.52-2.52A2.528 2.528 0 0 1 8.824 0a2.528 2.528 0 0 1 2.52 2.522v2.52h-2.52zm0 1.262a2.528 2.528 0 0 1 2.52 2.52v5.043a2.528 2.528 0 0 1-2.52 2.522H3.782a2.528 2.528 0 0 1-2.52-2.522V8.825a2.528 2.528 0 0 1 2.52-2.52h5.042z"
        fill="#2EB67D"
      />
      <path
        d="M18.958 8.825a2.528 2.528 0 0 1 2.52-2.52 2.528 2.528 0 0 1 2.522 2.52 2.528 2.528 0 0 1-2.522 2.52h-2.52v-2.52zm-1.262 0a2.528 2.528 0 0 1-2.52 2.52h-5.043a2.528 2.528 0 0 1-2.522-2.52V3.783a2.528 2.528 0 0 1 2.522-2.52h5.043a2.528 2.528 0 0 1 2.52 2.52v5.042z"
        fill="#ECB22E"
      />
      <path
        d="M15.176 18.958a2.528 2.528 0 0 1 2.52 2.52 2.528 2.528 0 0 1-2.52 2.522 2.528 2.528 0 0 1-2.522-2.522v-2.52h2.522zm0-1.262a2.528 2.528 0 0 1-2.522-2.52v-5.043a2.528 2.528 0 0 1 2.522-2.52h5.043a2.528 2.528 0 0 1 2.52 2.52v5.043a2.528 2.528 0 0 1-2.52 2.522h-5.043z"
        fill="#E01E5A"
      />
    </g>
  </svg>
);

const GithubIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-4 w-4 shrink-0 fill-current text-slate-900 dark:text-white"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"
    />
  </svg>
);

export default function IntegrationsNavGroup() {
  const [isOpen, setIsOpen] = useState(true);
  const [slackConnected, setSlackConnected] = useState(true);
  const [githubConnected, setGithubConnected] = useState(false);

  const toggleSlack = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextState = !slackConnected;
    setSlackConnected(nextState);
    showSuccessToast({
      message: nextState ? "Connected to Slack!" : "Disconnected from Slack.",
    });
  };

  const toggleGithub = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextState = !githubConnected;
    setGithubConnected(nextState);
    showSuccessToast({
      message: nextState ? "Connected to GitHub!" : "Disconnected from GitHub.",
    });
  };

  return (
    <div className="mt-3 flex flex-col gap-1 pt-3">
      {/* Integrations Header Toggle */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full cursor-pointer flex-row items-center justify-between rounded-[5px] border border-transparent px-2.5 py-2 text-zinc-500 transition-all duration-300"
      >
        <div className="flex items-center gap-[11px] text-zinc-500 transition-all duration-300 hover:text-zinc-900 dark:hover:text-white/80">
          <Workflow strokeWidth={1.5} size={18} />
          <span className="font-normal">Integrations</span>
        </div>
        {isOpen ? (
          <ChevronDown className="h-4 w-4 text-zinc-500 transition-transform duration-1000" />
        ) : (
          <ChevronRight className="h-4 w-4 text-zinc-500 transition-transform duration-1000" />
        )}
      </button>

      {/* Sub-items (Slack & GitHub) */}
      {isOpen && (
        <div className="flex flex-col gap-1 pl-4 pt-1 transition-all duration-200">
          {/* Slack Item */}
          <div
            onClick={toggleSlack}
            className="flex cursor-pointer items-center justify-between rounded-[5px] px-2.5 py-1.5 text-[12px] text-zinc-600 transition-all hover:bg-[#565656]/10 dark:text-zinc-400 dark:hover:text-white"
          >
            <div className="flex items-center gap-2.5">
              <SlackIcon />
              <span>Connect Slack</span>
            </div>
            {/* <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                slackConnected
                  ? "bg-emerald-500/10 text-emerald-500"
                  : "bg-zinc-200 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
              }`}
            >
              {slackConnected ? "Connected" : "Connect"}
            </span> */}
          </div>

          {/* GitHub Item */}
          <div
            onClick={toggleGithub}
            className="flex cursor-pointer items-center justify-between rounded-[5px] px-2.5 py-1.5 text-[12px] text-zinc-600 transition-all hover:bg-[#565656]/10 dark:text-zinc-400 dark:hover:text-white"
          >
            <div className="flex items-center gap-2.5">
              <GithubIcon />
              <span>Connect GitHub</span>
            </div>
            {/* <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                githubConnected
                  ? "bg-emerald-500/10 text-emerald-500"
                  : "bg-zinc-200 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
              }`}
            >
              {githubConnected ? "Connected" : "Connect"}
            </span> */}
          </div>
        </div>
      )}
    </div>
  );
}
