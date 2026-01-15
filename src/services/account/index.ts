import axios from "axios";
import env from "@/config/env";
import { TUpdateDetailsService } from "@/types";
// import { TChangePasswordService } from './types';
// import { TUser } from '@/types';

class Service {
  //   changePassword({ payload }: any) {
  //     return axios.put(env.api.auth + '/change-password', payload);
  //   }

  //   updateUserInfo({ payload, username }: { payload?: TUser; username: string }) {
  //     return axios.put(env.api.profiles + `/${username}/update-profile`, payload);
  //   }

  getProfile(id: string) {
    return axios.get(env.api.profiles + `/profile/${id}`, {
      withCredentials: true,
    });
  }

  updateDetails({ payload }: TUpdateDetailsService) {
    return axios.put(env.api.profiles + `/update-details`, payload, {
      withCredentials: true,
    });
  }

  updateAvatar(formData: FormData) {
    return axios.put(env.api.profiles + `/update-avatar`, formData, {
      withCredentials: true,
    });
  }

  getUserProfile({ id, accessToken }: { id: string; accessToken: string }) {
    return axios.get(env.api.profiles + `/${id}`, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });
  }

  checkUsername(username: string) {
    return axios.post(env.api.profiles + `/check-username`, { username });
  }

  checkEmail(email: string) {
    return axios.post(env.api.profiles + `/check-email`, { email });
  }
}

const accountService = new Service();
export default accountService;
