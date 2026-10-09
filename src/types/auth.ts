import { IUser } from "./user";

export interface ILoginInput {
  email: string;
  password: string;
}

export interface IRegisterInput {
  fullname: string;
  email: string;
  username: string;
  password: string;
}

export interface IForgotPasswordInput {
  email: string;
}

export interface IResetPasswordInput {
  email?: string;
  code?: string;
  password?: string;
  new_password?: string;
  confirm_new_password?: string;
  otp?: number | null;
}


export interface IAuthResponse {
  user: IUser;
  token?: string;
  message?: string;
}
