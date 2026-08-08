"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setSidebar } from "@/redux/Slices/uiSlice";
import type { RootState } from "@/redux/store";

import {
  User,
  Sliders,
  Shield,
  Link2,
  Tag,
  Puzzle,
  Bot,
  Building2,
  CreditCard,
  Lock,
  Users,
  UsersRound,
  ArrowLeft,
  PanelLeft,
} from "lucide-react";

interface SettingsNavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}
interface SettingsNavSection {
  title: string;
  items: SettingsNavItem[];
}

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const params = useParams();
  const workspaceSlug = (params?.workspaceSlug as string) || "";

  const sidebarState = useSelector(
    (state: RootState) => state.ui.isSidebarOpen,
  );

  const [isSettingsSidebar, setIsSettingsSidebar] = useState(true);

  function toggleSettingsSideBar() {
    setIsSettingsSidebar((prev) => !prev);
  }

  const navSections: SettingsNavSection[] = [
    {
      title: "Personal",
      items: [
        {
          label: "Profile",
          href: `/${workspaceSlug}/settings/profile`,
          icon: <User size={16} />,
        },

        {
          label: "Security & Access",
          href: `/${workspaceSlug}/settings/security`,
          icon: <Shield size={16} />,
        },
        {
          label: "Connected Accounts",
          href: `/${workspaceSlug}/settings/accounts`,
          icon: <Link2 size={16} />,
        },
      ],
    },
    {
      title: "Tasks",
      items: [
        {
          label: "Labels",
          href: `/${workspaceSlug}/settings/labels`,
          icon: <Tag size={16} />,
        },
      ],
    },
    {
      title: "Features",
      items: [
        {
          label: "Integrations",
          href: `/${workspaceSlug}/settings/integrations`,
          icon: <Puzzle size={16} />,
        },
        {
          label: "AI + Agents",
          href: `/${workspaceSlug}/settings/ai`,
          icon: <Bot size={16} />,
        },
      ],
    },
    {
      title: "Admin",
      items: [
        {
          label: "Workspace Settings",
          href: `/${workspaceSlug}/settings/workspace`,
          icon: <Building2 size={16} />,
        },
        {
          label: "Billing",
          href: `/${workspaceSlug}/settings/billing`,
          icon: <CreditCard size={16} />,
        },
        // {
        //   label: "Security",
        //   href: `/${workspaceSlug}/settings/admin-security`,
        //   icon: <Lock size={16} />,
        // },
        {
          label: "Members",
          href: `/${workspaceSlug}/settings/members`,
          icon: <Users size={16} />,
        },
        // {
        //   label: "Teams",
        //   href: `/${workspaceSlug}/settings/teams`,
        //   icon: <UsersRound size={16} />,
        // },
      ],
    },
  ];
  return (
    <div className="poppins flex h-screen w-full overflow-hidden bg-white dark:bg-[#111]">
      {isSettingsSidebar && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={toggleSettingsSideBar}
        />
      )}

      {/* DEDICATED SETTINGS SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-gray-200/80 bg-gray-50/50 p-6 transition-all duration-300 dark:border-zinc-800/80 dark:bg-[#111] lg:static lg:block lg:translate-x-0 ${isSettingsSidebar ? "translate-x-0" : "-translate-x-full"} `}
      >
        <div className="mb-6 px-2">
          <h2 className="text-sm font-medium text-[#111] dark:text-white">
            Settings
          </h2>
        </div>
        {/* Navigation Sections */}
        <nav className="flex-1 space-y-5 overflow-y-auto pr-1">
          {navSections.map((section) => (
            <div key={section.title} className="flex flex-col gap-1">
              <span className="px-2 text-[12px] text-gray-400 dark:text-[#fff]/70">
                {section.title}
              </span>
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-xs font-normal transition-all duration-300 ${
                      isActive
                        ? "border-[#565656]/10 bg-[#565656]/10 text-[#111] dark:text-[#fff]/70"
                        : "text-zinc-600 hover:bg-gray-200/50 hover:text-zinc-900 dark:text-[#fff]/50 dark:hover:bg-[#565656]/10 dark:hover:text-white/50"
                    }`}
                  >
                    <span
                      className={
                        isActive
                          ? "text-[#111] dark:text-[#fff]/60"
                          : "text-gray-400 dark:text-zinc-500"
                      }
                    >
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
      </aside>

      {/* MAIN SETTINGS CONTENT AREA */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <main className="flex flex-1 flex-col overflow-auto bg-white px-8 py-4 dark:bg-[#111] lg:px-12">
          <div className="flex w-full flex-row items-center justify-start gap-2 text-[#565656]">
            <span onClick={toggleSettingsSideBar}>
              <PanelLeft
                size={14}
                className="flex cursor-pointer transition-all duration-300 dark:hover:text-[#fff]/70 lg:hidden"
              />
            </span>
            {/* toggleSettingsSideBar */}
            {/* Back to Workspace Link */}
            <Link
              href={`/${workspaceSlug}/tasks`}
              className="flex w-fit items-center gap-2 rounded-md px-2.5 py-2 text-xs font-medium text-gray-500 transition-colors hover:text-zinc-900 dark:text-[#565656] dark:hover:text-white"
            >
              <ArrowLeft size={14} />
              <span>Settings</span>
            </Link>
          </div>
          <div className="w-full">{children}</div>
        </main>
      </div>
    </div>
  );
}
