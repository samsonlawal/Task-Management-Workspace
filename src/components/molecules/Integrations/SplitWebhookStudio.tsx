"use client";

import { useState } from "react";
import { Copy } from "lucide-react";

/**
 * SplitWebhookStudio Component
 * Preserved for future usage as requested.
 */
export default function SplitWebhookStudio() {
  const [selectedTool, setSelectedTool] = useState<string>("GitHub");
  const [copiedPayload, setCopiedPayload] = useState<boolean>(false);

  const tools = [
    {
      name: "GitHub",
      category: "VCS",
      badge: "PR Auto-Close",
      payload: `{\n  "event": "pull_request.merged",\n  "repo": "taskstack/core",\n  "pr": 142,\n  "action": "task.close",\n  "task_id": "TSK-204"\n}`,
      icon: (
        <svg className="h-4 w-4 shrink-0 fill-white" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      ),
    },
    {
      name: "Slack",
      category: "Messaging",
      badge: "Slash Commands",
      payload: `{\n  "event": "slash_command",\n  "command": "/task",\n  "text": "Auth token refresh",\n  "user": "@lawal",\n  "status": "created"\n}`,
      icon: (
        <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none">
          <path
            d="M6 15a2 2 0 1 1-2-2h2v2zm1 0a2 2 0 0 1 2-2 2 2 0 0 1 2 2v5a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-5zM9 6a2 2 0 1 1 2-2v2H9zm0 1a2 2 0 0 1 2 2 2 2 0 0 1-2 2H4a2 2 0 0 1-2-2 2 2 0 0 1 2-2h5zm9 3a2 2 0 1 1 2 2h-2V10zm-1 0a2 2 0 0 1-2 2 2 2 0 0 1-2-2V5a2 2 0 0 1 2-2 2 2 0 0 1 2 2v5zm-3 9a2 2 0 1 1-2 2v-2h2zm0-1a2 2 0 0 1-2-2 2 2 0 0 1 2-2h5a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-5z"
            fill="#E01E5A"
          />
        </svg>
      ),
    },
    {
      name: "Figma",
      category: "Design",
      badge: "Live Embeds",
      payload: `{\n  "event": "file_comment.created",\n  "file_key": "x9aF8s0K",\n  "component": "Sidebar_v2",\n  "synced_task": "TSK-190"\n}`,
      icon: (
        <svg className="h-4 w-4 shrink-0" viewBox="0 0 38 57" fill="none">
          <path
            d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z"
            fill="#1ABCFE"
          />
          <path
            d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z"
            fill="#0ACF83"
          />
          <path
            d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z"
            fill="#FF7262"
          />
          <path
            d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z"
            fill="#F24E1E"
          />
          <path
            d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z"
            fill="#A259FF"
          />
        </svg>
      ),
    },
    {
      name: "GitLab",
      category: "VCS",
      badge: "CI/CD Trigger",
      payload: `{\n  "event": "pipeline_success",\n  "project_id": 8942,\n  "ref": "main",\n  "deploy_status": "live"\n}`,
      icon: (
        <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="#FC6D26">
          <path d="M23.955 13.587l-1.342-4.135-2.664-8.189c-.135-.423-.73-.423-.867 0L16.418 9.45H7.582L4.918 1.263c-.136-.423-.731-.423-.867 0L1.387 9.452.045 13.587a.972.972 0 0 0 .353 1.087l11.602 8.43 11.602-8.43a.972.972 0 0 0 .353-1.087" />
        </svg>
      ),
    },
  ];

  const activeToolObj = tools.find((t) => t.name === selectedTool) || tools[0];

  const handleCopyPayload = () => {
    navigator.clipboard.writeText(activeToolObj.payload);
    setCopiedPayload(true);
    setTimeout(() => setCopiedPayload(false), 2000);
  };

  return (
    <div className="w-full py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 w-full">
        {/* Left: App Directory */}
        <div className="lg:col-span-6 grid grid-cols-2 gap-2.5">
          {tools.map((tool) => (
            <button
              key={tool.name}
              onClick={() => setSelectedTool(tool.name)}
              className={`flex items-center justify-between rounded-[6px] border p-3 text-left transition-all ${
                selectedTool === tool.name
                  ? "border-white bg-[#1c1c1c]"
                  : "border-[#565656]/20 bg-[#141414] hover:bg-[#181818]"
              }`}
            >
              <div className="flex items-center gap-2.5">
                {tool.icon}
                <span className="text-[12px] font-medium text-white">{tool.name}</span>
              </div>
              <span className="text-[9px] font-mono text-zinc-500">{tool.badge}</span>
            </button>
          ))}
        </div>

        {/* Right: Live Payload Inspector */}
        <div className="lg:col-span-6 flex flex-col justify-between gap-3 rounded-[8px] border border-[#565656]/25 bg-[#141414] p-5">
          <div className="flex items-center justify-between border-b border-[#565656]/20 pb-3">
            <div className="flex items-center gap-2">
              {activeToolObj.icon}
              <span className="text-[13px] font-medium text-white">{activeToolObj.name} Webhook Listener</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyPayload}
                className="flex items-center gap-1 rounded border border-[#565656]/30 bg-[#1c1c1c] px-2 py-0.5 text-[10px] text-zinc-300 hover:text-white"
              >
                <Copy size={10} />
                <span>{copiedPayload ? "Copied" : "Copy"}</span>
              </button>
              <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                200 OK • 18ms
              </span>
            </div>
          </div>
          <pre className="font-mono text-[11px] text-zinc-300 bg-[#111] p-3 rounded-[5px] overflow-x-auto border border-[#565656]/20">
            {activeToolObj.payload}
          </pre>
          <div className="flex items-center justify-between text-[11px] text-zinc-500 pt-2 border-t border-[#565656]/15">
            <span>Auto-sync enabled for workspace</span>
            <span className="text-white font-medium">Active →</span>
          </div>
        </div>
      </div>
    </div>
  );
}
