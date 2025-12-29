"use client";

import { useSelector } from "react-redux";
import Hero from "@/components/molecules/Hero";
import HowItWorks from "@/components/molecules/HowItWorks";

export default function Home() {
  const { user, isLoggedIn } = useSelector((state: any) => state.auth);

  return (
    <div className="max-screen-wrapper poppins flex h-fit w-full flex-col items-center justify-between bg-[#111]">
      <div className="max-screen-inner">
        <Hero />
        <HowItWorks />
      </div>
    </div>
  );
}
