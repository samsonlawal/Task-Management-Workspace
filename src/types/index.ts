export type TAssignee = {
  id: string;
  name: string;
  email: string;
  profileImage: string;
};

export type TTask = {
  description: string;
  status?: string;
  // priority?: string;
  assignee: TAssignee;
  workspace_id: string;
  deadline: string;
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
