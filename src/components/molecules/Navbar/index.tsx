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
      <div className="hidden flex-row items-center gap-6 text-[13px] text-zinc-400 md:flex">
        <Link href="#features" className="cursor-pointer transition-colors duration-200 hover:text-white">
          Features
        </Link>
        <Link href="#integrations" className="cursor-pointer transition-colors duration-200 hover:text-white">
          Integrations
        </Link>
        <Link href="#pricing" className="cursor-pointer transition-colors duration-200 hover:text-white">
          Pricing
        </Link>
        <Link href="#faqs" className="cursor-pointer transition-colors duration-200 hover:text-white">
          FAQs
        </Link>
        <Link href="/contact" className="cursor-pointer transition-colors duration-200 hover:text-white">
          Contact
        </Link>
      </div>

      {/* Desktop Auth */}
      <div className="hidden w-[205px] flex-row items-center justify-end gap-3 md:flex">
        {user ? (
          <Link
            href="/workspaces"
            className="rounded-[5px] border border-white bg-white px-3.5 py-1.5 text-[12px] font-medium text-zinc-950 transition-all duration-200 hover:bg-white/90 active:scale-98"
          >
            Workspaces
          </Link>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              href="/auth/sign-in"
              className="rounded-[5px] border border-[#565656]/30 bg-[#1c1c1c] px-3 py-1.5 text-[12px] font-medium text-white transition-all duration-200 hover:bg-[#565656]/20"
            >
              Login
            </Link>

            <Link
              href="/auth/sign-up"
              className="rounded-[5px] border border-white bg-white px-3.5 py-1.5 text-[12px] font-medium text-zinc-950 transition-all duration-200 hover:bg-white/90 active:scale-98"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Hamburger */}
      <div className="flex text-white md:hidden">
        <button onClick={toggleMenu} aria-label="Toggle menu" className="p-1 rounded-[5px] border border-[#565656]/25 bg-[#141414]">
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="absolute left-0 top-[75px] z-50 flex w-full flex-col rounded-[8px] border border-[#565656]/25 bg-[#141414] p-5 text-white shadow-2xl md:hidden">
          <div className="flex flex-col gap-4 text-[13px]">
            <Link href="/" onClick={() => setIsOpen(false)} className="text-zinc-400 transition-colors hover:text-white">
              Home
            </Link>
            <Link href="#features" onClick={() => setIsOpen(false)} className="text-zinc-400 transition-colors hover:text-white">
              Features
            </Link>
            <Link href="#integrations" onClick={() => setIsOpen(false)} className="text-zinc-400 transition-colors hover:text-white">
              Integrations
            </Link>
            <Link href="#pricing" onClick={() => setIsOpen(false)} className="text-zinc-400 transition-colors hover:text-white">
              Pricing
            </Link>
            <Link href="#faqs" onClick={() => setIsOpen(false)} className="text-zinc-400 transition-colors hover:text-white">
              FAQs
            </Link>
            <Link href="/contact" onClick={() => setIsOpen(false)} className="text-zinc-400 transition-colors hover:text-white">
              Contact
            </Link>

            <div className="h-px w-full bg-[#565656]/20 my-1" />

            {user ? (
              <Link
                href="/workspaces"
                onClick={() => setIsOpen(false)}
                className="flex w-full items-center justify-center rounded-[5px] border border-white bg-white py-2 text-[12px] font-medium text-zinc-950"
              >
                Workspaces
              </Link>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  href="/auth/sign-in"
                  onClick={() => setIsOpen(false)}
                  className="flex w-full items-center justify-center rounded-[5px] border border-[#565656]/30 bg-[#1c1c1c] py-2 text-[12px] font-medium text-white"
                >
                  Login
                </Link>

                <Link
                  href="/auth/sign-up"
                  onClick={() => setIsOpen(false)}
                  className="flex w-full items-center justify-center rounded-[5px] border border-white bg-white py-2 text-[12px] font-medium text-zinc-950"
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
