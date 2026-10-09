import { IUserSummary } from "./user";

export type TaskPriority = "low" | "medium" | "high" | string;
export type TaskStatus = "to-do" | "in-progress" | "in-review" | "done" | string;

export interface ILabel {
  _id: string;
  name: string;
  icon?: string;
  color?: string;
}

export interface ITask {
  _id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  workspace_id?: string;
  assignee?: IUserSummary;
  createdBy?: string;
  label?: ILabel;
  deadline?: string;
  attachments?: any[];
  commentCount?: number;
  createdAt: string;
  updatedAt?: string;
}

export interface ICreateTaskInput {
  title: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  workspace_id: string;
  assignee?: string;
  label?: string;
  deadline?: string;
  attachments?: any[];
}
