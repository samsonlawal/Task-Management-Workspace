"use client";

import { useState } from "react";
import Link from "next/link";
import Brand from "@/components/reuseables/Brand";
import { ArrowRight, Check, Github, Twitter } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail("");
    }
  };

  const footerLinks = {
    product: [
      { name: "AI Agents & MCP", href: "#features" },
      { name: "Developer Integrations", href: "#integrations" },
      { name: "Pricing & Plans", href: "#pricing" },
    ],
    resources: [
      { name: "Documentation", href: "#faqs" },
      { name: "FAQs", href: "#faqs" },
      { name: "System Status", href: "#" },
      { name: "Release Notes", href: "#" },
      { name: "Community", href: "#" },
    ],
    company: [
      { name: "About Us", href: "#" },
      { name: "Security & Trust", href: "#" },
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
    ],
  };

  return (
    <footer className="poppins w-full pt-14 pb-10 text-white">
      <div className="flex flex-col gap-10">
        {/* Main Grid: Brand Summary + Navigation Columns */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-5">
          {/* Brand Info & Community Social Links (2 cols on md) */}
          <div className="flex flex-col gap-2 md:col-span-2">
            <Brand />
            <p className="text-[12px] font-normal leading-relaxed text-zinc-400 max-w-[320px]">
              Engineered for speed, clarity, and precision. The modern task & workspace management platform for high-velocity teams.
            </p>

            {/* Social & Community Icon-only Buttons */}
            <div className="flex items-center gap-2 pt-1">
              <Link
                href="https://discord.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-7 w-7 items-center justify-center rounded-[5px] bg-[#141414] text-zinc-400 transition-colors hover:text-white"
                aria-label="Discord Community"
              >
                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              </Link>

              <Link
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-7 w-7 items-center justify-center rounded-[5px] bg-[#141414] text-zinc-400 transition-colors hover:text-white"
                aria-label="GitHub Repository"
              >
                <Github size={14} />
              </Link>

              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-7 w-7 items-center justify-center rounded-[5px] bg-[#141414] text-zinc-400 transition-colors hover:text-white"
                aria-label="Twitter X"
              >
                <Twitter size={14} />
              </Link>
            </div>
          </div>

          {/* Product Links */}
          <div className="flex flex-col gap-3">
            <span className="text-[11px] font-medium uppercase tracking-wider text-white">
              Product
            </span>
            <ul className="flex flex-col gap-2.5 text-[12px]">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-zinc-400 transition-colors hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div className="flex flex-col gap-3">
            <span className="text-[11px] font-medium uppercase tracking-wider text-white">
              Resources
            </span>
            <ul className="flex flex-col gap-2.5 text-[12px]">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-zinc-400 transition-colors hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Legal Links */}
          <div className="flex flex-col gap-3">
            <span className="text-[11px] font-medium uppercase tracking-wider text-white">
              Company
            </span>
            <ul className="flex flex-col gap-2.5 text-[12px]">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-zinc-400 transition-colors hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright on Left, Newsletter Input on Right */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-[#565656]/20 pt-6 text-[11px] text-zinc-500 md:flex-row">
          <div className="flex items-center gap-3">
            <span>© {new Date().getFullYear()} TaskStack Inc. All rights reserved.</span>
          </div>

          {/* Newsletter Input where 'All Systems Operational' used to be */}
          <form
            onSubmit={handleSubscribe}
            className="flex w-full max-w-[340px] items-center gap-1.5 rounded-[6px] border border-[#565656]/25 bg-[#141414] p-1 transition-colors focus-within:border-zinc-400"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter work email for updates..."
              className="w-full bg-transparent px-2.5 py-1 text-[11px] text-white placeholder:text-zinc-500 focus:outline-none"
              required
            />
            <button
              type="submit"
              className="flex shrink-0 items-center gap-1 rounded-[4px] bg-white px-2.5 py-2 text-[11px] font-medium text-zinc-950 transition-all hover:bg-white/90 active:scale-98"
            >
              {subscribed ? (
                <>
                  <Check size={11} className="text-emerald-600" />
                  <span>Subscribed</span>
                </>
              ) : (
                <>
                  <span>Subscribe</span>
                  <ArrowRight size={10} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
}
