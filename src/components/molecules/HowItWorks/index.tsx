"use client";

import {
  Bot,
  Plug,
  Layers,
  UsersRound,
  Kanban,
  Activity,
  Sparkles,
} from "lucide-react";

export default function HowItWorks() {
  const features = [
    {
      title: "AI Agents & MCP",
      description:
        "Personalized skills, prompt guidance, and automated task execution with Model Context Protocol.",
      icon: <Bot size={16} className="text-zinc-300" />,
      tags: ["MCP Connectors", "Agent Guidance", "Automation"],
    },
    {
      title: "Developer Integrations",
      description:
        "Direct bi-directional connections to Slack, GitHub, Figma, GitLab, and custom webhooks.",
      icon: <Plug size={16} className="text-zinc-300" />,
      tags: ["Webhooks", "GitHub Sync", "Figma Embeds"],
    },
    {
      title: "Multi-Workspace Hub",
      description:
        "Isolated spaces with custom URL slugs, dedicated assets, and unified management.",
      icon: <Layers size={16} className="text-zinc-300" />,
      tags: ["Custom Slugs", "Multi-Tenant", "Fast Setup"],
    },
    {
      title: "Team & Role Access",
      description:
        "Granular access control with Admin, Member, and Viewer permissions per workspace.",
      icon: <UsersRound size={16} className="text-zinc-300" />,
      tags: ["Admin / Member", "RBAC", "Invite Links"],
    },
    {
      title: "Kanban & List Engine",
      description:
        "Interactive drag-and-drop boards with custom statuses, priority tags, and list filters.",
      icon: <Kanban size={16} className="text-zinc-300" />,
      tags: ["Kanban Boards", "List Views", "Priorities"],
    },
    {
      title: "Activity Timeline",
      description:
        "Real-time team comment threads and chronological change audit logs on every task.",
      icon: <Activity size={16} className="text-zinc-300" />,
      tags: ["Live Feed", "Comment Threads", "Audit Log"],
    },
  ];

  return (
    <div id="features" className="poppins flex min-h-fit w-full flex-col gap-8 py-12 md:py-16">
      {/* Section Header */}
      <div className="flex w-full flex-col items-center text-center gap-2">
        <span className="flex w-fit items-center gap-2 rounded-full border border-[#565656]/20 bg-[#565656]/10 px-3 py-1 text-[11px] font-normal text-white/80 transition-colors">
          <Sparkles size={11} className="text-zinc-400" />
          <span>Core Capabilities</span>
        </span>
        <h2 className="text-[22px] font-medium leading-[1.2] tracking-tight text-white md:text-[30px]">
          Everything your team needs to execute with speed.
        </h2>
        <p className="text-[12px] font-normal text-zinc-400 md:text-[13px]">
          A clean, unified system designed to eliminate workflow friction.
        </p>
      </div>

      {/* Divided Table Matrix Container with Generous Column Spacing */}
      <div className="w-full overflow-hidden rounded-[8px] border border-[#565656]/25 bg-[#141414] shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-4 divide-y divide-[#565656]/20 md:divide-y-0 md:divide-x">
          {features.map((item, idx) => (
            <div
              key={item.title}
              className={`flex flex-col justify-between gap-0 p-6 md:p-7 lg:p-8 transition-colors duration-200 hover:bg-[#181818] ${
                idx >= 3 ? "lg:border-t lg:border-[#565656]/20" : ""
              } ${idx % 2 !== 0 ? "md:border-t md:border-[#565656]/20 lg:border-t-0" : ""}`}
            >
              {/* Top Details */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[5px] border border-[#565656]/25 bg-[#1a1a1a]">
                    {item.icon}
                  </div>
                  <span className="font-mono text-[10px] text-zinc-500">
                    0{idx + 1}
                  </span>
                </div>

                <h3 className="text-[14px] font-medium text-white">
                  {item.title}
                </h3>

                <p className="text-[12px] font-normal leading-relaxed text-zinc-400">
                  {item.description}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-[3px] border border-[#565656]/20 bg-[#1a1a1a] px-2 py-0.5 text-[10px] font-normal text-zinc-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
