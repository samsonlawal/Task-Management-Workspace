import axios from "axios";
import env from "@/config/env";
import { TLoginService, TRegisterService } from "./types";

class service {
  login({ payload }: TLoginService) {
    return axios.post(env.api.auth + "/login", payload);
  }

  register({ payload }: TRegisterService) {
    return axios.post(env.api.auth + "/register", payload);
  }
}

const AuthService = new service();
export default AuthService;
