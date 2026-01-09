"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Brand from "@/components/reuseables/Brand";

export default function Navbar() {
  const { user } = useSelector((state: any) => state.auth);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="relative flex h-[80px] w-full items-center justify-between">
      <div className="w-[205px]">
        <Brand />
      </div>

      {/* Desktop Menu */}
      <div className="hidden flex-row items-center gap-6 text-[14px] text-white md:flex">
        <span className="cursor-pointer transition-all duration-300 hover:text-white/60">
          How it works
        </span>
        <span className="cursor-pointer transition-all duration-300 hover:text-white/60">
          Features
        </span>
        <span className="cursor-pointer transition-all duration-300 hover:text-white/60">
          Pricing
        </span>
        {/* <span className="cursor-pointer transition-all duration-300 hover:text-white/60">
          Products
        </span>
        <span className="cursor-pointer transition-all duration-300 hover:text-white/60">
          Integrations
        </span> */}
        <span className="cursor-pointer transition-all duration-300 hover:text-white/60">
          FAQs
        </span>
      </div>

      {/* Desktop Auth */}
      <div className="hidden w-[205px] flex-row items-center justify-end gap-6 md:flex">
        {user ? (
          <div className="flex flex-col items-center gap-2">
            <Link
              href="/workspaces"
              className="rounded-[4px] border border-[#565656]/20 bg-[white] px-[16px] py-[8px] text-[13px] font-medium text-[#111] transition-colors duration-300 hover:bg-[white]/80"
            >
              Workspaces
            </Link>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="flex gap-3">
              <Link
                href="/auth/sign-in"
                className="rounded-[4px] border border-[#565656]/20 bg-[#565656]/10 px-[24px] py-[8px] text-[13px] font-medium text-white transition-colors duration-300 hover:bg-[#565656]/20"
              >
                Login
              </Link>

              <Link
                href="/auth/sign-up"
                className="rounded-[4px] border border-[#565656]/20 bg-[white] px-[24px] py-[8px] text-[13px] font-medium text-[#111] transition-colors duration-300 hover:bg-[white]/90"
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Hamburger */}
      <div className="flex text-white md:hidden">
        <button onClick={toggleMenu} aria-label="Toggle menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="absolute left-0 top-[80px] z-50 flex w-full flex-col border-b border-[#333] bg-[#111] p-6 text-white shadow-xl md:hidden">
          <div className="flex flex-col gap-6 text-[14px]">
            <span className="cursor-pointer transition-all duration-300 hover:text-white/60">
              How it works
            </span>
            <span className="cursor-pointer transition-all duration-300 hover:text-white/60">
              Features
            </span>
            <span className="cursor-pointer transition-all duration-300 hover:text-white/60">
              Pricing
            </span>
            {/* <span className="cursor-pointer transition-all duration-300 hover:text-white/60">
              Products
            </span>
            <span className="cursor-pointer transition-all duration-300 hover:text-white/60">
              Integrations
            </span> */}
            <span className="cursor-pointer transition-all duration-300 hover:text-white/60">
              FAQs
            </span>

            <div className="h-[1px] w-full bg-[#333]"></div>

            {user ? (
              <div className="flex flex-col gap-2">
                <Link
                  href="/workspaces"
                  className="flex w-full justify-center rounded-[4px] border border-[#565656]/20 bg-[white] px-[24px] py-[12px] text-[13px] font-medium text-[#111] transition-colors duration-300 hover:bg-[white]/80"
                >
                  Workspaces
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <Link
                  href="/auth/sign-in"
                  className="flex w-full justify-center rounded-[4px] border border-[#565656]/20 bg-[#565656]/10 px-[24px] py-[12px] text-[13px] font-medium text-white transition-colors duration-300 hover:bg-[#565656]/20"
                >
                  Login
                </Link>

                <Link
                  href="/auth/sign-up"
                  className="flex w-full justify-center rounded-[4px] border border-[#565656]/20 bg-[white] px-[24px] py-[12px] text-[13px] font-medium text-[#111] transition-colors duration-300 hover:bg-[white]/90"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
