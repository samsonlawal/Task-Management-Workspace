import { IUserSummary } from "./user";

export type ActivityType =
  | "TASK_CREATED"
  | "STATUS_UPDATED"
  | "PRIORITY_UPDATED"
  | "ASSIGNEE_UPDATED"
  | "DUE_DATE_UPDATED"
  | "TITLE_UPDATED"
  | "DESCRIPTION_UPDATED"
  | "COMMENT_ADDED"
  | "COMMENT_EDITED"
  | "ATTACHMENT_ADDED"
  | "LABEL_UPDATED"
  | string;

export interface IActivity {
  _id: string;
  workspaceId: string;
  taskId?: string;
  actor: IUserSummary;
  actionText: string;
  metadata?: any;
  createdAt: string;
  updatedAt?: string;
  type: ActivityType;
}
