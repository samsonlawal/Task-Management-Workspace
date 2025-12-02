"use client";
import React from "react";
import AuthPageHeader from "./auth-page-header";
import CustomSvg from "@/components/reuseables/CustomSVG";
import Link from "next/link";

function AuthPageWrapper({
  children,
  title = "",
  subtitle = "",
}: {
  children?: React.ReactNode;
  title?: string;
  subtitle?: string;
}) {
  return (
    <>
      <div className="flex min-h-screen w-full flex-col items-center gap-[30px] bg-[#111111] px-5 pt-[30px] lg:h-screen lg:overflow-x-hidden">
        <div
          className="poppins relative mx-auto flex w-full max-w-[1200px] flex-1 flex-col items-center justify-start gap-[30px] bg-contain bg-left-bottom bg-no-repeat lg:flex-row lg:overflow-x-hidden"
          style={{
            backgroundSize: "500px 390px",
          }}
        >
          <img
            src="/icons/map-base.png"
            className="pointer-events-none absolute bottom-0 left-0"
            alt="bg"
          />

          <div className="flex h-full max-h-[600px] w-full flex-1 flex-col md:max-w-[600px]">
            <Link href="/">
              <CustomSvg
                id="logo-long"
                className="h-[25px] w-[140px] fill-[white]"
              />
            </Link>
            <p className="mt-[80px] text-[clamp(48px,calc(60/1200*100vw),60px)] font-bold leading-[1.1] text-white max-lg:hidden">
              Connect great designs with great designers
            </p>
          </div>
          <div className="relative flex h-full w-full flex-1 shrink-0 flex-col items-center justify-center rounded-[32px] bg-white px-[24px] py-[30px] md:max-h-[600px] md:max-w-[600px]">
            <AuthPageHeader title={title} subtitle={subtitle} />
            {children}
          </div>
        </div>
        <div className="mx-auto flex w-full max-w-[1200px] flex-wrap items-center justify-between gap-[30px] border-t-[1px] border-t-[#292929] py-[25px] text-white">
          <p className="flex flex-wrap items-center gap-2 text-sm md:text-base">
            <span>© 2025 Taskstack.</span> <span>All rights reserved.</span>
          </p>

          {/* <div className="flex items-center justify-between gap-[32px] text-sm md:text-base">
            <Link className="hover:underline" href="/legal/privacy-policy">
              Privacy Policy
            </Link>
            <Link className="hover:underline" href="/legal/cookies">
              Cookie Policy
            </Link>
            <Link className="hover:underline" href="/legal/terms-and-conditions">
              Terms & Conditions
            </Link>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default AuthPageWrapper;
