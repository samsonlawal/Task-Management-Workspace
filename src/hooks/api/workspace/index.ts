import { useState, useEffect } from "react";
import WorkspaceService from "@/services/workspace";
import { TAddMember, TAddWorkspace, TWorkspace, TWorkspaceData } from "@/types";
import { showErrorToast, showSuccessToast } from "@/utils/toaster";
import axios, { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { setMembers } from "@/redux/Slices/memberSlice";

interface Invite {
  workspaceName: string;
  workspaceId: string;
  role: string;
  inviteExpires: string;
  inviteToken: string;
  email: string;
  membershipId: string;
}

type InviteResponse = {
  data: Invite[];
};

export const useGetWorkspace = () => {
  const [data, setData] = useState<TWorkspace[]>([]);

  const onGetWorksapce = async () => {
    try {
      const res = await WorkspaceService.getWorkspace();
      //   console.log(res?.data);

      setData(res?.data);
    } catch (error: Error | AxiosError | any) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    onGetWorksapce();
  }, []);

  return { onGetWorksapce, data };
};

export const useGetUserWorkspace = (userId: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<TWorkspace[]>([]);

  const onGetUserWorkspace = async (userId: string) => {
    setLoading(true);
    try {
      const res = await WorkspaceService.getUserWorkspace(userId);
      setData(res?.data);
    } catch (error: Error | AxiosError | any) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      onGetUserWorkspace(userId);
    }
  }, [userId]);

  return { onGetUserWorkspace, data, loading };
};

export const useGetPendingInvites = (userId: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<InviteResponse>();

  const onGetPendingInvites = async (userId: string) => {
    setLoading(true);
    try {
      const res = await WorkspaceService.getPendingInvites(userId);
      setData(res?.data);
    } catch (error: Error | AxiosError | any) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      onGetPendingInvites(userId);
    }
  }, [userId]);

  return { onGetPendingInvites, data, loading };
};

export const useAcceptInvite = () => {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const onAcceptInvite = async (membershipId: string) => {
    setLoading(true);
    try {
      console.log("token:", membershipId);

      const res = await WorkspaceService.acceptInvite({ membershipId });
      console.log("api response", res);
      setData(res?.data);
    } catch (error: Error | AxiosError | any) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  // console.log("accpet invites:", data);
  // useEffect(() => {
  //   if (token) {
  //     onAcceptInvite({token: token});
  //   }
  // }, [token]);

  return { onAcceptInvite, data, loading };
};

export const useGetSingleWorkspace = (workspaceId: string) => {
  const [loading, setLoading] = useState<boolean>(false);

  const [data, setData] = useState<any>({});

  const onGetSingleWorkspace = async (workspaceId: string) => {
    setLoading(true);

    try {
      const res = await WorkspaceService.getSingleWorkspace(workspaceId);
      //   console.log(res?.data);

      setData(res?.data);
    } catch (error: Error | AxiosError | any) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (workspaceId) {
      onGetSingleWorkspace(workspaceId);
    }
  }, [workspaceId]);

  return { onGetSingleWorkspace, data, loading };
};

export const useGetMembers = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<[]>([]);
  const dispatch = useDispatch();

  const onGetMembers = async ({
    workspaceId,
    successCallback,
    errorCallback,
  }: {
    workspaceId: string;
    successCallback?: (members: []) => void;
    errorCallback?: (props: { message?: string; description?: string }) => void;
  }) => {
    if (!workspaceId) return;

    setLoading(true);
    try {
      const res = await WorkspaceService.getMembers(workspaceId);

      const members = res?.data || [];
      setData(members);
      dispatch(setMembers(res?.data));
      successCallback?.(members);
    } catch (error: Error | AxiosError | any) {
      const message =
        error?.response?.data?.message || "Failed to fetch members";
      const description = error?.response?.data?.description || "";

      showErrorToast({ message, description });
      errorCallback?.({ message, description });
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, onGetMembers };
};

export const useAddMember = () => {
  const [loading, setLoading] = useState(false);

  const onAddMember = async ({
    workspaceId,
    payload,
    successCallback,
    errorCallback,
  }: {
    workspaceId: string;
    payload: TAddMember;
    successCallback?: (data?: any) => void;
    errorCallback?: (props: { message?: string; description?: string }) => void;
  }) => {
    setLoading(true);

    try {
      const res = await WorkspaceService.addMember({ workspaceId, payload });

      successCallback?.(res?.data);
    } catch (error: Error | AxiosError | any) {
      const errorMessage =
        error?.response?.data?.message || "An error occurred!";
      const errorDescription = error?.response?.data?.description || "";

      showErrorToast({
        message: errorMessage,
        description: errorDescription,
      });

      errorCallback?.({ message: errorMessage, description: errorDescription });
    } finally {
      setLoading(false);
    }
  };

  return { loading, onAddMember };
};

export const useCreateWorkspace = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<TWorkspace[]>([]);

  const OnCreateWorkspace = async ({
    userId,
    payload,
    successCallback,
    errorCallback,
  }: {
    userId: string;
    payload: TAddWorkspace;
    successCallback?: (data?: any) => void;
    errorCallback?: (props: { message?: string; description?: string }) => void;
  }) => {
    setLoading(true);

    try {
      const res = await WorkspaceService.createWorkspace(userId, { payload });
      const workspace = res?.data;
      setData(workspace);

      console.log(workspace);
      successCallback?.(res?.data);
    } catch (error: Error | AxiosError | any) {
      const message =
        error?.response?.data?.message || "Failed to create wrokspace";
      const description = error?.response?.data?.description || "";

      showErrorToast({ message, description });
      errorCallback?.({ message, description });
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, OnCreateWorkspace };
};
