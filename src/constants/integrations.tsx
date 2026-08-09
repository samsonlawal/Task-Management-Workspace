import React from "react";
import { Github, Hash, Calendar, FileText } from "lucide-react";

export const INTEGRATIONS_LIST = [
  {
    id: "slack",
    name: "Slack",
    instruction: "Connect a slack channel to receive notifications about this team.",
    description: "Sync your Slack messages and notifications.",
    connected: false,
    icon: <Hash className="text-[#E01E5A]" size={16} />,
    bg: "bg-[#E01E5A]/10",
    features: [
      "Task is created or modified",
      "New team member joins",
      "Task comments synced to Slack threads"
    ]
  },
  {
    id: "github",
    name: "GitHub",
    instruction: "Connect your GitHub account to sync repositories and issues.",
    description: "Sync your GitHub repositories and issues.",
    connected: false,
    icon: <Github className="text-zinc-900 dark:text-white" size={16} />,
    bg: "bg-zinc-100 dark:bg-zinc-800",
    features: [
      "Link tasks directly to GitHub issues",
      "Create Pull Requests from tasks",
      "Sync task status with PR merges",
      "View commit history on tasks"
    ]
  }
];
