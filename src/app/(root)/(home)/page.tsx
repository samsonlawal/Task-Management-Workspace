"use client";

import { useSelector } from "react-redux";
import Hero from "@/components/molecules/Hero";
import HowItWorks from "@/components/molecules/HowItWorks";
import Integrations from "@/components/molecules/Integrations";
import Pricing from "@/components/molecules/Pricing";
import FAQs from "@/components/molecules/FAQs";
import Contact from "@/components/molecules/Contact";
import Footer from "@/components/molecules/Footer";

export default function Home() {
  const { user, isLoggedIn } = useSelector((state: any) => state.auth);

  return (
    <div className="relative max-screen-wrapper poppins flex min-h-screen w-full flex-col items-center justify-between overflow-hidden bg-[#111]">
      {/* Background Grid Pattern with Subtle Radial Fade */}
      <div className="pointer-events-none absolute inset-0 -z-0 h-full w-full bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_75%_55%_at_50%_15%,#000_50%,transparent_100%)] opacity-80" />

      {/* Secondary Ambient Accent Glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-purple-600/5 blur-[140px]" />

      <div className="relative z-10 max-screen-inner flex flex-col gap-12 md:gap-20">
        <Hero />
        <Integrations />
        <HowItWorks />
        <Pricing />
        <FAQs />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
