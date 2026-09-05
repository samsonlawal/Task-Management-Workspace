import {
  PlusCircle,
  RefreshCw,
  AlertCircle,
  UserPlus,
  Calendar,
  Pencil,
  MessageCircle,
  Paperclip
} from "lucide-react";

export const getActivityIcon = (type: string) => {
 switch (type) {
    case "TASK_CREATED":
      return {
        icon: PlusCircle,
        color: "text-emerald-500 dark:text-emerald-400",
      };
    case "STATUS_UPDATED":
      return {
        icon: RefreshCw,
        color: "text-indigo-500 dark:text-indigo-400", 
      };
    case "PRIORITY_UPDATED":
      return {
        icon: AlertCircle,
        color: "text-amber-500 dark:text-amber-400",
      };
    case "ASSIGNEE_UPDATED":
      return {
        icon: UserPlus,
        color: "text-sky-500 dark:text-sky-400",
      };
    case "DUE_DATE_UPDATED":
      return {
        icon: Calendar,
        color: "text-purple-500 dark:text-purple-400", 
      };
    case "TITLE_UPDATED":
    case "DESCRIPTION_UPDATED":
      return {
        icon: Pencil,
        color: "text-zinc-500 dark:text-zinc-400", 
      };
    case "COMMENT_ADDED":
    case "COMMENT_EDITED":
      return {
        icon: MessageCircle,
        color: "text-teal-500 dark:text-teal-400", 
      };
    case "ATTACHMENT_ADDED":
      return {
        icon: Paperclip,
        color: "text-orange-500 dark:text-orange-400", 
      };
    default:
      return {
        icon: PlusCircle,
        color: "text-zinc-500 dark:text-zinc-400",
      };
  }
}