import axios from "axios";
import env from "@/config/env";
import {
  TLoginService,
  TRegisterService,
  TActivateAccountService,
  TForgotPasswordService,
  TResetPasswordService,
} from "./types";

class service {
  login({ payload }: TLoginService) {
    return axios.post(env.api.auth + "/login", payload, {
      withCredentials: true,
    });
  }

  register({ payload }: TRegisterService) {
    return axios.post(env.api.auth + "/register", payload);
  }

  activateAccount(token: String) {
    return axios.get(env.api.auth + `/activate-account?token=${token}`);
  }

  forgotPassword({ payload }: TForgotPasswordService) {
    return axios.post(env.api.auth + `/forgot-password`, payload);
  }

  resetPassword({ payload }: TResetPasswordService) {
    return axios.post(env.api.auth + `/reset-password`, payload);
  }
}

const AuthService = new service();
export default AuthService;
