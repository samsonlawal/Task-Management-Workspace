import axios from "axios";
import env from "@/config/env";
import { TNotification } from "@/types";

class service {
  getUserNotifications(userId: string) {
    return axios.get(env.api.notification + "/" + userId);
  }

  MarkAsRead(id: string) {
    return axios.get(env.api.notification + "/read/" + id);
  }

  MarkAllAsRead(userId: string) {
    return axios.get(env.api.notification + "/read-all/" + userId);
  }
}

const NotificationService = new service();
export default NotificationService;
