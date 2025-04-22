import axios from "axios";
import env from "@/config/env";
import { TTask } from "@/types";

class service {
  getTasks() {
    return axios.get(env.api.tasks);
  }

  createTask({ payload }: { payload: TTask }) {
    return axios.post(env.api.tasks, payload);
  }
}

const TaskService = new service();
export default TaskService;
