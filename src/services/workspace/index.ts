import axios from "axios";
import env from "@/config/env";
import { TAddMember, TAddWorkspace, TWorkspace } from "@/types";

class service {
  getWorkspace() {
    return axios.get(env.api.workspaces);
  }

  getUserWorkspace(userId: string) {
    return axios.get(env.api.workspaces + "/user/" + userId);
  }

  getPendingInvites(userId: string) {
    return axios.get(env.api.workspaces + "/invites/" + userId, {
      withCredentials: true,
    });
  }

  acceptInvite({
    membershipId,
    email,
  }: {
    membershipId: string;
    email: string;
  }) {
    return axios.post(
      env.api.workspaces + "/invite/accept/" + membershipId,
      { email },
      {
        withCredentials: true,
      },
    );
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

  editMemberRole({
    workspaceId,
    memberId,
    payload,
  }: {
    workspaceId: string;
    memberId: string;
    payload: { role: string };
  }) {
    return axios.patch(
      env.api.workspaces + "/" + workspaceId + "/members/edit-role/" + memberId,
      payload,
    );
  }

  suspendMember({
    workspaceId,
    memberId,
  }: {
    workspaceId: string;
    memberId: string;
  }) {
    return axios.patch(
      env.api.workspaces + "/" + workspaceId + "/members/suspend/" + memberId,
    );
  }

  removeMember({
    workspaceId,
    memberId,
  }: {
    workspaceId: string;
    memberId: string;
  }) {
    return axios.delete(
      env.api.workspaces + "/" + workspaceId + "/members/remove/" + memberId,
    );
  }

  createWorkspace(userId: string, { payload }: { payload: TAddWorkspace }) {
    return axios.post(env.api.workspaces + "/" + userId, payload);
  }
}

const WorkspaceService = new service();
export default WorkspaceService;
