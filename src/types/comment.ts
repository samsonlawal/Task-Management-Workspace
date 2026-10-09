import { IUserSummary } from "./user";

export interface IComment {
  _id: string;
  taskId: string;
  content: string;
  author: IUserSummary;
  createdAt: string;
  updatedAt?: string;
  commenter?: string;
  attachedFileName?: string;
  edited?: boolean;
}

export interface ICreateCommentInput {
  taskId: string;
  author: string;
  content: string;
}
