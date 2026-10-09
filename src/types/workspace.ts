import { IUserSummary } from "./user";
import { ITask } from "./task";

export type WorkspaceRole = "owner" | "admin" | "member" | string;

export interface IWorkspaceMember {
  _id: string;
  workspaceId: string;
  userId: IUserSummary;
  role: WorkspaceRole;
  joinedAt?: string;
}

export interface IWorkspace {
  _id: string;
  name: string;
  slug: string;
  owner: string | IUserSummary;
  members?: IWorkspaceMember[];
  tasks?: ITask[];
  memberCount?: number;
  createdAt: string;
  updatedAt?: string;
}

export interface IWorkspaceResponse {
  workspace: IWorkspace;
  tasks: ITask[];
  members?: IWorkspaceMember[];
  _id?: string;
  name?: string;
  owner?: string | IUserSummary;
}

export interface ICreateWorkspaceInput {
  name: string;
  description?: string;
}

export interface IAddMemberInput {
  email: string;
  role: WorkspaceRole;
  workspaceName?: string;
}

