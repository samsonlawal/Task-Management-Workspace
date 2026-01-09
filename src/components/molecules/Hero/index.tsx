"use client";

import Navbar from "@/components/molecules/Navbar";

export default function Hero() {
  return (
    <div className="poppins flex h-fit w-full flex-col items-center justify-between">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="flex h-[500px] w-full flex-row items-center justify-between gap-20 md:gap-10">
        <div className="flex w-full flex-col items-center justify-center gap-4 pt-10 md:flex-col md:items-start md:gap-6">
          <h1 className="text-center text-[34px] font-regular leading-[1.1] text-white md:w-[520px] md:text-start md:text-[44px]">
            A clearer way for teams to manage work.
          </h1>

          <div className="flex h-fit w-full flex-col items-center justify-between gap-4 md:w-[430px] md:items-start">
            <p className="text-center text-[16px] text-[#CDCDCD] md:text-start">
              Everything your team needs to plan, assign, and finish work
              without unnecessary complexity.
            </p>
            <button className="flex items-center gap-2 rounded-[4px] border border-[#565656]/20 bg-[#565656]/10 px-[24px] py-[10px] text-[14px] font-regular text-white transition-colors duration-300 hover:bg-[#565656]/20">
              Get 14-days Free Today
              {/* <img
                src="/icons/caret-right.svg"
                alt=""
                className="h-[16px] w-[16px]"
              /> */}
            </button>
          </div>
        </div>

        <div className="flex w-full items-center justify-center">
          <img
            src="/icons/task-ui-hero.svg"
            alt=""
            className="w-[100%] md:w-[75%]"
          />
        </div>
      </div>
    </div>
  );
}
