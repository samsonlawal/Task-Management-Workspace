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

  updateTask(id: string, { payload }: { payload: TAddTask }) {
    const raw = localStorage.getItem("STACKTASK_PERSISTOR");
    const parsed = raw ? JSON.parse(raw) : null;
    const token = parsed?.accessToken;

    return axios.patch(
      env.api.tasks + "/" + id,
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

  deleteTask(id: string) {
    const raw = localStorage.getItem("STACKTASK_PERSISTOR");
    const parsed = raw ? JSON.parse(raw) : null;
    const token = parsed?.accessToken;

    return axios.delete(
      env.api.tasks + "/" + id,
      !token
        ? undefined
        : {
            headers: {
              Authorization: "Bearer " + token,
            },
          },
    );
  }

  // promoteTask(id: string) {
  //   const raw = localStorage.getItem("STACKTASK_PERSISTOR");
  //   const parsed = raw ? JSON.parse(raw) : null;
  //   const token = parsed?.accessToken;

  //   return axios.patch(
  //     env.api.tasks + "/promote/" + id,
  //     // payload,
  //     !token
  //       ? undefined
  //       : {
  //           headers: {
  //             Authorization: "Bearer " + token,
  //           },
  //         },
  //   );
  // }

  promoteTask(id: string) {
    const raw = localStorage.getItem("STACKTASK_PERSISTOR");
    const parsed = raw ? JSON.parse(raw) : null;
    const token = parsed?.accessToken;

    return axios.patch(
      env.api.tasks + "/promote/" + id,
      {}, // Empty request body (or null/undefined)
      !token
        ? undefined
        : {
            headers: {
              Authorization: "Bearer " + token,
            },
          },
    );
  }

  demoteTask(id: string) {
    const raw = localStorage.getItem("STACKTASK_PERSISTOR");
    const parsed = raw ? JSON.parse(raw) : null;
    const token = parsed?.accessToken;

    return axios.patch(
      env.api.tasks + "/demote/" + id,
      {},
      !token
        ? undefined
        : {
            headers: {
              Authorization: "Bearer " + token,
            },
          },
    );
  }

  markAsDone(id: string) {
    const raw = localStorage.getItem("STACKTASK_PERSISTOR");
    const parsed = raw ? JSON.parse(raw) : null;
    const token = parsed?.accessToken;

    return axios.patch(
      env.api.tasks + "/done/" + id,
      {},
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
