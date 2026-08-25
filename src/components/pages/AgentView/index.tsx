"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "@/redux/Slices/uiSlice";
import { PanelLeft, Send, Sparkles, Paperclip, Mic, ListTodo, Zap, Users } from "lucide-react";

export default function AgentView() {
  const dispatch = useDispatch();
  const [prompt, setPrompt] = useState("");

  return (
    <div className="poppins flex h-full w-full flex-col bg-[#fff] dark:bg-[#111]">
      {/* Navbar / Header */}
      <div className="sticky top-0 w-full bg-[white] dark:bg-[#111]">
        <div className="poppins flex w-full items-center justify-between border-b-[1px] border-[#565656]/10 px-4 py-[7px] lg:px-8">
          <div className="flex flex-row items-center justify-center gap-2">
            <button
              onClick={() => dispatch(toggleSidebar())}
              className="flex px-1 text-[#707070] transition-all duration-300 hover:text-[#111] dark:hover:text-white lg:hidden lg:p-2"
            >
              <PanelLeft size={18} strokeWidth={1.6} />
            </button>
            <div className="flex items-center gap-2">
              <h2 className="poppins-normal text-md text-[#111] dark:text-white lg:text-xl">
                Agent
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area - Centered Chat Interface */}
      <div className="flex flex-1 flex-col items-center justify-center px-8">
        <div className="w-full max-w-xl text-center">
          <h1 className="mb-2 text-2xl font-medium text-[#111] dark:text-white">
            How can I help you today?
          </h1>
          <p className="mb-8 text-[13px] text-[#707070] dark:text-[#fff]/50">
            Ask me to summarize tasks, create tickets, or manage your workspace.
          </p>
          
          <div className="relative mx-auto w-full text-left">
            <div className="group relative flex w-full flex-col rounded-2xl border-[1px] border-[#565656]/20 bg-white/50 p-2 shadow-sm backdrop-blur-md transition-all focus-within:border-[#111]/20 focus-within:shadow-md dark:border-[#565656]/30 dark:bg-[#1a1a1a]/50 dark:focus-within:border-white/30">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ask your agent anything..."
                rows={1}
                className="w-full resize-none bg-transparent px-3 py-2 text-[12px] text-[#111] placeholder:text-[#565656]/60 focus:outline-none font-light dark:text-white dark:placeholder:text-[#fff]/40 tracking-wide"
                style={{ minHeight: "44px", maxHeight: "200px" }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    // Handle send logic
                  }
                }}
              />
              <div className="flex w-full items-center justify-between px-2 pb-1 pt-2">
                <div className="flex items-center gap-1">
                  <button className="flex h-8 w-8 items-center justify-center rounded-full text-[#565656] transition-colors hover:bg-black/5 hover:text-black dark:text-[#fff]/50 dark:hover:bg-white/10 dark:hover:text-white">
                    <Paperclip size={16} strokeWidth={2} />
                  </button>
                  <button className="flex h-8 w-8 items-center justify-center rounded-full text-[#565656] transition-colors hover:bg-black/5 hover:text-black dark:text-[#fff]/50 dark:hover:bg-white/10 dark:hover:text-white">
                    <Mic size={16} strokeWidth={2} />
                  </button>
                </div>
                <button
                  disabled={!prompt.trim()}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-[#111] text-white transition-all hover:bg-black/80 disabled:opacity-30 dark:bg-white dark:text-[#111] dark:hover:bg-zinc-200"
                >
                  <Send size={14} className={prompt.trim() ? "translate-x-[1px] translate-y-[1px]" : ""} />
                </button>
              </div>
            </div>
            
            {/* Suggestion Chips */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              {[
                { icon: <ListTodo size={14} />, text: "Summarize my tasks" },
                { icon: <Zap size={14} />, text: "What's my top priority?" },
                { icon: <Users size={14} />, text: "Check team workload" }
              ].map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => setPrompt(chip.text)}
                  className="flex items-center gap-1.5 rounded-lg border border-[#565656]/10 bg-[#565656]/5 px-3 py-1.5 text-[12px] text-[#565656] transition-colors hover:bg-[#565656]/10 hover:text-black dark:border-[#565656]/20 dark:bg-[#565656]/10 dark:text-[#fff]/60 dark:hover:bg-[#565656]/30 dark:hover:text-white"
                >
                  {/* {chip.icon} */}
                  <span>{chip.text}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
