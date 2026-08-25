"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { Check, ArrowRight, Sparkles } from "lucide-react";

export default function Pricing() {
  const { user } = useSelector((state: any) => state.auth);

  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "For individuals and side projects exploring TaskStack.",
      buttonText: "Start Free",
      buttonLink: user ? "/workspaces" : "/auth/sign-up",
      highlight: false,
      features: [
        "1 workspace",
        "Up to 3 team members",
        "Unlimited tasks & lists",
        "Interactive Kanban board",
        "Community support",
      ],
    },
    {
      name: "Pro",
      price: "$12",
      period: "per user / month",
      description: "For fast-moving product teams that need full velocity.",
      buttonText: user ? "Upgrade to Pro" : "Get Started with Pro",
      buttonLink: user ? "/workspaces" : "/auth/sign-up",
      highlight: true,
      features: [
        "Unlimited workspaces",
        "Unlimited team members",
        "Granular role permissions",
        "Activity timeline & comments",
        "Custom workspace slugs",
        "Priority 24/7 support",
      ],
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "tailored billing",
      description: "For scaling organizations requiring dedicated support.",
      buttonText: "Contact Us",
      buttonLink: "/contact",
      highlight: false,
      features: [
        "Everything in Pro",
        "Dedicated account manager",
        "99.9% uptime SLA",
        "Custom webhooks & integrations",
        "Audit log export & compliance",
      ],
    },
  ];

  return (
    <div id="pricing" className="poppins flex min-h-fit w-full flex-col gap-10 py-16 md:py-24">
      {/* Section Header */}
      <div className="flex w-full flex-col items-center text-center gap-2.5">
        <span className="flex w-fit items-center gap-2 rounded-full border border-[#565656]/20 bg-[#565656]/10 px-3 py-1 text-[11px] font-normal text-white/80 transition-colors">
          <Sparkles size={11} className="text-zinc-400" />
          <span>Pricing</span>
        </span>

        <h2 className="text-[24px] font-medium leading-[1.2] tracking-tight text-white md:text-[34px]">
          Predictable pricing. No surprises.
        </h2>

        <p className="text-[13px] font-normal text-white/50 md:text-[14px]">
          Free forever for small projects. Upgrade when your team grows.
        </p>
      </div>

      {/* Unified Flat 3-Column Container */}
      <div className="mx-auto w-full overflow-hidden rounded-[8px] border border-[#565656]/25 bg-[#141414]">
        <div className="grid grid-cols-1 divide-y divide-[#565656]/20 md:grid-cols-3 md:divide-x md:divide-y-0">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col justify-between p-6 md:p-8 ${
                plan.highlight ? "bg-[#181818]" : "bg-[#141414]"
              }`}
            >
              {/* Plan Header */}
              <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between">
                  <span className="text-[15px] font-medium text-white">
                    {plan.name}
                  </span>
                  {plan.highlight && (
                    <span className="rounded-[4px] border border-white/20 bg-white/10 px-2 py-0.5 text-[10px] font-medium text-white">
                      Popular
                    </span>
                  )}
                </div>

                {/* Price */}
                <div className="flex flex-col">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-[32px] font-medium tracking-tight text-white">
                      {plan.price}
                    </span>
                    <span className="text-[11px] font-normal text-zinc-500">
                      {plan.period}
                    </span>
                  </div>
                  <p className="mt-2 text-[12px] font-normal leading-relaxed text-zinc-400">
                    {plan.description}
                  </p>
                </div>

                <div className="my-1 h-px bg-[#565656]/20" />

                {/* Features List */}
                <div className="flex flex-col gap-2.5">
                  <span className="text-[11px] font-normal uppercase tracking-wider text-zinc-500">
                    Includes
                  </span>
                  <ul className="flex flex-col gap-2">
                    {plan.features.map((feat, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 text-[12px] font-normal text-zinc-300"
                      >
                        <Check size={13} className="shrink-0 text-zinc-400" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-8">
                <Link
                  href={plan.buttonLink}
                  className={`flex w-full items-center justify-center gap-2 rounded-[5px] py-2 text-[12px] font-medium transition-all duration-200 ${
                    plan.highlight
                      ? "border border-white bg-white text-zinc-900 hover:bg-white/90"
                      : "border border-[#565656]/30 bg-[#1c1c1c] text-white hover:bg-[#565656]/20"
                  }`}
                >
                  <span>{plan.buttonText}</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
