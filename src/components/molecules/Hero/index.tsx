"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { ArrowRight, Sparkles } from "lucide-react";
import Navbar from "@/components/molecules/Navbar";

export default function Hero() {
  const { user } = useSelector((state: any) => state.auth);

  return (
    <div className="poppins relative flex h-fit w-full flex-col items-center justify-between">
      {/* Subtle Ambient Background Glow */}
      <div className="pointer-events-none absolute -top-20 left-1/2 -z-10 h-[350px] w-[600px] -translate-x-1/2 rounded-full bg-purple-600/10 blur-[120px] md:h-[450px] md:w-[800px]" />

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="flex h-full w-full flex-col items-center justify-center gap-8 pt-4 md:h-fit md:gap-10">
        <div className="flex w-full flex-col items-center justify-center gap-4 pt-6 md:gap-5">
          {/* Badge */}
          <div className="flex items-center gap-2 rounded-full border border-[#565656]/20 bg-[#565656]/10 px-3 py-1 text-[11px] font-normal text-white/90 shadow-sm transition-colors hover:border-[#565656]/40 hover:bg-[#565656]/20">
            <span className="flex h-1.5 w-1.5 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-white/70">Autonomous AI Agents</span>
            <span className="text-white/30">•</span>
            <span className="text-white/90">Powered by MCP & Smart Guidance</span>
            <Sparkles size={11} className="text-purple-300" />
          </div>

          <h1 className="text-center text-[30px] font-medium leading-[1.15] tracking-tight text-white md:w-[720px] md:text-[48px]">
            A clearer way for teams to <br className="hidden sm:inline" />
            <span className="text-white">
              manage work effortlessly.
            </span>
          </h1>

          <div className="flex h-fit w-full flex-col items-center justify-between gap-5 md:w-[600px]">
            <p className="text-center text-[13px] font-normal leading-relaxed text-zinc-400 md:text-[14px]">
              Everything your team needs to plan, assign, and finish work
              without the chaos and unnecessary complexity.
            </p>

            <div className="flex items-center gap-2.5">
              <Link
                href={user ? "/workspaces" : "/auth/sign-up"}
                className="group flex items-center gap-2 rounded-[5px] border border-white bg-white px-4 py-2 text-[12px] font-medium text-zinc-950 transition-all duration-200 hover:bg-white/90 active:scale-98"
              >
                <span>{user ? "Go to Workspace" : "Get Started Free"}</span>
                <ArrowRight
                  size={12}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </Link>
              <Link
                href="#pricing"
                className="flex items-center gap-1.5 rounded-[5px] border border-[#565656]/30 bg-[#1c1c1c] px-4 py-2 text-[12px] font-medium text-white transition-all duration-200 hover:bg-[#565656]/20"
              >
                <span>View Pricing</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Hero Task UI Preview */}
        <div className="relative mt-2 flex w-full items-center justify-center">
          <div className="w-full overflow-hidden rounded-[8px] border border-[#565656]/25 bg-[#141414] p-1.5 shadow-2xl md:p-2">
            <img
              src="/icons/task-ui-hero.svg"
              alt="TaskStack App Interface Preview"
              className="w-full rounded-[6px] object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
