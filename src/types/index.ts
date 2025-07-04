export type TAssignee = {
  id: string;
  name?: string;
  fullname?: string;
  email: string;
  profileImage: string;
};

export type TAddAssignee = {
  email: string;
};

export type TTask = {
  description: string;
  status?: string;
  priority: string;
  assignee: TAssignee;
  workspace_id: string;
  createdAt: string;
};

export type TSingleTask = {
  description: string;
  status?: string;
  priority: string;
  assignee: TAssignee;
  workspace_id: string;
  createdAt: string;
  id: string;
  deadline: string;
  name?: string;
};

export type TAddTask = {
  description: string;
  status: string;
  priority: string;
  assignee?: string;
  workspace_id: string;
  // createdAt: string;
  deadline: string;
};

export type TAddMember = {
  email: string;
  role: string;
};

export type TUser = {
  _id: string;
  fullname: string;
  email: string;
  username: string;
  profileImage?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type TRegister = {
  fullname: string;
  email: string;
  username: string;
  password: string;

  // assignee: TAssignee;
  // workspace_id: string;
  // deadline: string;
};

export type TLogin = {
  email: string;
  password: string;
};

export type TAddWorkspace = {
  name: string;
  description?: string;
};

export type TWorkspace = {
  name: string;
  owner: string;
  memberCount: number;
  _id: string;
};

type Workspace = {
  name: string; // Make sure this exists in your type
  id: string;
  // other properties...
};

export type TWorkspaceData = {
  workspace: Workspace;
  members: Record<string, any>;
  tasks: Record<string, any>;
  name: string;
};
