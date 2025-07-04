import axios from "axios";
import env from "@/config/env";
import { TAddMember, TWorkspace } from "@/types";

class service {
  getWorkspace() {
    return axios.get(env.api.workspaces);
  }

  getUserWorkspace(userId: string) {
    return axios.get(env.api.workspaces + "/user/" + userId);
  }

  getSingleWorkspace(workspaceId: string) {
    return axios.get(env.api.workspaces + "/" + workspaceId);
  }

  getMembers(workspaceId: string) {
    return axios.get(env.api.workspaces + "/" + workspaceId + "/members");
  }

  addMember({
    workspaceId,
    payload,
  }: {
    workspaceId: string;
    payload: TAddMember;
  }) {
    const raw = localStorage.getItem("STACKTASK_PERSISTOR");
    const parsed = raw ? JSON.parse(raw) : null;
    const token = parsed?.accessToken;

    return axios.post(
      env.api.workspaces + "/" + workspaceId + "/members",
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

  createWorkspace(userId: string, { payload }: { payload: TWorkspace }) {
    return axios.post(env.api.workspaces + "/" + userId, payload);
  }
}

const WorkspaceService = new service();
export default WorkspaceService;
