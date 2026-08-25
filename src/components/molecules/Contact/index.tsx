"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Contact() {
  const { user } = useSelector((state: any) => state.auth);

  return (
    <div className="poppins flex h-fit w-full flex-col items-center justify-center py-16 md:py-24">
      <div className="relative flex w-full flex-col items-center justify-between overflow-hidden rounded-[8px] border border-[#565656]/25 bg-[#141414] p-8 md:flex-row md:p-12 shadow-xl">
        {/* Ambient background glow */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-[250px] w-[250px] rounded-full bg-purple-600/10 blur-[100px]" />
        
        {/* LHS Content */}
        <div className="relative z-10 flex flex-col gap-3.5 text-center md:text-left md:max-w-[480px]">
          <div className="flex w-fit items-center gap-2 self-center md:self-start rounded-full border border-[#565656]/20 bg-[#565656]/10 px-3 py-1 text-[11px] font-normal text-white/80 transition-colors">
            <Sparkles size={11} className="text-zinc-400" />
            <span>Get Started</span>
          </div>

          <h2 className="text-[24px] font-medium leading-[1.2] tracking-tight text-white md:text-[34px]">
            Ready to streamline your team's workflow?
          </h2>
          
          <p className="text-[13px] font-normal leading-relaxed text-zinc-400 md:text-[14px]">
            Set up your workspace in under 2 minutes, invite your team, and start shipping work faster together.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5 self-center md:self-start">
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
              href="/contact"
              className="flex items-center gap-1.5 rounded-[5px] border border-[#565656]/30 bg-[#1c1c1c] px-4 py-2 text-[12px] font-medium text-white transition-all duration-200 hover:bg-[#565656]/20"
            >
              <span>Contact Sales</span>
            </Link>
          </div>
        </div>

        {/* RHS Graphic */}
        <div className="relative z-10 hidden items-center justify-center md:flex md:w-[280px]">
          <img
            src="/icons/molecules.svg"
            alt="Molecules Graphic"
            className="w-full max-w-[240px] object-contain opacity-70 transition-opacity hover:opacity-90"
          />
        </div>
      </div>
    </div>
  );
}
