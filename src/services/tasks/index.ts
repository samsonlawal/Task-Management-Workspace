import axios from "axios";
import env from "@/config/env";
import { TAddTask, TTask } from "@/types";
import { getFromLocalStorage } from "@/utils/localStorage/AsyncStorage";

class service {
  getTasks(workspaceId: string) {
    return axios.get(env.api.tasks + "/" + workspaceId);
  }

  getSingleTask(id: string) {
    return axios.get(env.api.tasks + "/single/" + id);
  }

  createTask({ payload }: { payload: TAddTask }) {
    const raw = localStorage.getItem("STACKTASK_PERSISTOR");
    const parsed = raw ? JSON.parse(raw) : null;
    const token = parsed?.accessToken;

    return axios.post(
      env.api.tasks,
      payload,
      !token
        ? undefined
        : {
            headers: {
              Authorization: "Bearer " + token,
            },
          },
    );
  }
}

const TaskService = new service();
export default TaskService;
