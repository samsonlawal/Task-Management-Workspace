import axios from "axios";
import env from "@/config/env";
// import { TChangePasswordService } from './types';
// import { TUser } from '@/types';

class Service {
  //   changePassword({ payload }: any) {
  //     return axios.put(env.api.auth + '/change-password', payload);
  //   }

  //   updateUserInfo({ payload, username }: { payload?: TUser; username: string }) {
  //     return axios.put(env.api.profiles + `/${username}/update-profile`, payload);
  //   }

  getUserProfile({ id, accessToken }: { id?: string; accessToken?: string }) {
    return axios.get(
      env.api.profiles + `/${id}`,
      !accessToken
        ? undefined
        : {
            headers: {
              Authorization: "Bearer " + accessToken,
            },
          },
    );
  }
}

const accountService = new Service();
export default accountService;
