import { ReactNode } from "react";

// Priority Styles Configuration
export const PRIORITY_STYLES: Record<
  string,
  { bg: string; text: string; fill: string; dot: string }
> = {
  High: {
    bg: "bg-[#CF1414]/20",
    text: "text-[#A21E1E]",
    fill: "fill-[#CF1414]",
    dot: "bg-red-500", // Fallback/Basic
  },
  Medium: {
    bg: "bg-[#EEC642]/20",
    text: "text-[#8F7727]",
    fill: "fill-[#EEC642]",
    dot: "bg-yellow-500",
  },
  Low: {
    bg: "bg-[#64BC21]/20",
    text: "text-[#4C7D26]",
    fill: "fill-[#64BC21]",
    dot: "bg-green-500",
  },
  // Lowercase fallback mapping
  high: {
    bg: "bg-[#CF1414]/20",
    text: "text-[#A21E1E]",
    fill: "fill-[#CF1414]",
    dot: "bg-red-500",
  },
  medium: {
    bg: "bg-[#EEC642]/20",
    text: "text-[#8F7727]",
    fill: "fill-[#EEC642]",
    dot: "bg-yellow-500",
  },
  low: {
    bg: "bg-[#64BC21]/20",
    text: "text-[#4C7D26]",
    fill: "fill-[#64BC21]",
    dot: "bg-green-500",
  },
};

// Status Styles Configuration
export const STATUS_STYLES: Record<
  string,
  {
    label: string;
    bg: string;
    text: string;
    dot: string;
    darkBg: string;
    darkText: string;
    darkDot: string;
  }
> = {
  todo: {
    label: "To Do",
    bg: "bg-[#14CF14]/30",
    text: "text-[#129312]",
    dot: "bg-[#129312]",
    darkBg: "dark:bg-[#14CF14]/20",
    darkText: "dark:text-[#129312]",
    darkDot: "dark:bg-[#129312]",
  },
  "in-progress": {
    label: "In Progress",
    bg: "bg-[#4314CF]/30",
    text: "text-[#4314CF]",
    dot: "bg-[#1E30A2]",
    darkBg: "dark:bg-[#4314CF]/20",
    darkText: "dark:text-[#6A7DFA]",
    darkDot: "dark:bg-[#6A7DFA]",
  },
  "in-review": {
    label: "In Review",
    bg: "bg-[#CFB314]/30",
    text: "text-[#B59017]",
    dot: "bg-[#B59017]",
    darkBg: "dark:bg-[#CFB314]/20",
    darkText: "dark:text-[#B59017]",
    darkDot: "dark:bg-[#B59017]",
  },
  done: {
    label: "Done",
    bg: "bg-[#111]",
    text: "text-[#fff]",
    dot: "bg-[#fff]",
    darkBg: "dark:bg-[#565656]/10",
    darkText: "dark:text-[#565656]",
    darkDot: "dark:bg-[#565656]",
  },
};

export const getPriorityStyles = (priority: string = "Low") => {
  return PRIORITY_STYLES[priority] || PRIORITY_STYLES["Low"];
};

export const getStatusStyles = (status: string = "todo") => {
  const normalizedStatus = status?.toLowerCase() || "todo";
  return STATUS_STYLES[normalizedStatus] || STATUS_STYLES["todo"];
};
