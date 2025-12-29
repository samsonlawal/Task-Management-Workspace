"use client";

import { useSelector } from "react-redux";
// import "../../ripple.css";
import Brand from "@/components/reuseables/Brand";

export default function Hero() {
  const { user, isLoggedIn } = useSelector((state: any) => state.auth);

  return (
    <div className="poppins flex h-fit w-full flex-col items-center justify-between">
      {/* Navbar */}
      <div className="flex h-[80px] w-full items-center justify-between">
        <div className="w-[205px]">
          <Brand />
        </div>
        <div className="flex flex-row items-center gap-6 text-[14px] text-white">
          <span className="cursor-pointer transition-all duration-300 hover:text-white/60">
            How it works
          </span>
          <span className="cursor-pointer transition-all duration-300 hover:text-white/60">
            Features
          </span>
          <span className="cursor-pointer transition-all duration-300 hover:text-white/60">
            Pricing
          </span>
          <span className="cursor-pointer transition-all duration-300 hover:text-white/60">
            FAQs
          </span>
        </div>

        <div className="flex w-[205px] flex-row items-center justify-end gap-6">
          {user ? (
            <div className="flex flex-col items-center gap-2">
              <a
                href="/workspaces"
                className="rounded-[4px] border border-[#565656]/20 bg-[white] px-[24px] py-[8px] text-[13px] font-medium text-[#111] transition-colors duration-300 hover:bg-[white]/80"
              >
                Workspaces
              </a>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="flex gap-3">
                <a
                  href="/auth/sign-in"
                  className="rounded-[4px] border border-[#565656]/20 bg-[#565656]/10 px-[24px] py-[8px] text-[13px] font-medium text-white transition-colors duration-300 hover:bg-[#565656]/20"
                >
                  Login
                </a>

                <a
                  href="/auth/sign-up"
                  className="rounded-[4px] border border-[#565656]/20 bg-[white] px-[24px] py-[8px] text-[13px] font-medium text-[#111] transition-colors duration-300 hover:bg-[white]/90"
                >
                  Sign Up
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hero Section */}
      <div className="flex h-fit w-full flex-col items-center justify-between gap-10">
        <div className="flex w-full flex-row items-start justify-center gap-20 pt-20">
          <h1 className="text-[44px] font-regular leading-[1.1] text-white">
            A clearer way for
            <br />
            teams to manage work.
          </h1>

          <div className="flex h-fit w-[430px] flex-col items-start justify-between gap-4">
            <p className="text-[16px] text-[#CDCDCD]">
              Everything your team needs to plan, assign, and finish work
              without unnecessary complexity.
            </p>
            <button className="flex items-center gap-2 rounded-[4px] border border-[#565656]/20 bg-[#565656]/10 px-[24px] py-[10px] text-[14px] font-regular text-white transition-colors duration-300 hover:bg-[#565656]/20">
              Get Started
              <img
                src="/icons/caret-right.svg"
                alt=""
                className="h-[16px] w-[16px]"
              />
            </button>
          </div>
        </div>

        <div className="flex w-full items-center justify-center">
          <img src="/icons/task-ui-hero.svg" alt="" className="w-[85%]" />
        </div>
      </div>
    </div>
  );
}
