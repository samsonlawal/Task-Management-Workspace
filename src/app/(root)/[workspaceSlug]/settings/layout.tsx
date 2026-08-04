"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { name: "Identity & Branding", href: "/workspace/settings/identity-and-branding" },
  { name: "Workflow", href: "/workspace/settings/workflow" },
  { name: "Roles & Permissions", href: "/workspace/settings/roles-and-permissions" },
  { name: "Notification & Integration", href: "/workspace/settings/notification-and-integration" },
  { name: "Billing", href: "/workspace/settings/billing" },
];

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-full flex-col bg-white p-8 text-[#111] dark:bg-[#111] dark:text-white">
      <div className="mb-6 flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">Workspace Settings</h1>
        <p className="text-sm text-[#707070]">
          Manage your workspace preferences and configurations.
        </p>
      </div>

      {/* Tabs */}
      <div className="no-scrollbar mb-8 flex overflow-x-auto border-b border-[#565656]/20">
        {tabs.map((tab) => {
          const isActive = pathname?.includes(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`whitespace-nowrap border-b-2 px-6 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? "border-[#111] text-[#111] dark:border-white dark:text-white"
                  : "border-transparent text-[#707070] hover:border-[#565656]/50 hover:text-[#111] dark:hover:text-white"
              }`}
            >
              {tab.name}
            </Link>
          );
        })}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
