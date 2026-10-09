export interface IUser {
  _id: string;
  fullname: string;
  email: string;
  username: string;
  profileImage?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IUserSummary {
  _id: string;
  fullname: string;
  email: string;
  username?: string;
  profileImage?: string;
}

export interface IUpdateUserDetailsInput {
  fullname?: string;
  email?: string;
  username?: string;
}
