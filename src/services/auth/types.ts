export type TRegisterService = {
  payload: {
    fullname: string;
    email: string;
    username: string;
    password: string;
    // terms: boolean;
  };

  // assignee: TAssignee;
  // workspace_id: string;
  // deadline: string;
};

export type TLoginService = {
  payload: {
    email: string;
    password: string;
  };
};
