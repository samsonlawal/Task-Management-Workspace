import { useState, useEffect } from "react";
import TaskService from "@/services/tasks";
import { TTask, TAddTask, TSingleTask } from "@/types";
import { showErrorToast, showSuccessToast } from "@/utils/toaster";

import axios, { AxiosError } from "axios";
import { setTasks } from "@/redux/Slices/taskSlice";
import { useDispatch } from "react-redux";

// export const useGetTasks = () => {
//   const [data, setData] = useState<TTask[]>([]);

//   const onGetTasks = async () => {
//     try {
//       const res = await TaskService.getTasks();
//       console.log(res?.data);

//       setData(res?.data);
//     } catch (error: Error | AxiosError | any) {
//       console.error("Error fetching tasks:", error);
//     }
//   };

//   useEffect(() => {
//     onGetTasks();
//   }, []);

//   return { onGetTasks, data };
// };

export const useGetTasks = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<TTask[]>([]);
  const dispatch = useDispatch();

  const onGetTasks = async ({
    workspaceId,
    successCallback,
    errorCallback,
  }: {
    workspaceId: string;
    successCallback?: (tasks: TTask[]) => void;
    errorCallback?: (props: { message?: string; description?: string }) => void;
  }) => {
    if (!workspaceId) return;

    setLoading(true);
    try {
      const res = await TaskService.getTasks(workspaceId);

      const tasks = res?.data?.tasks || [];
      setData(tasks);
      dispatch(setTasks(res?.data?.tasks));
      successCallback?.(tasks);
    } catch (error: Error | AxiosError | any) {
      const message = error?.response?.data?.message || "Failed to fetch tasks";
      const description = error?.response?.data?.description || "";

      showErrorToast({ message, description });
      errorCallback?.({ message, description });
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, onGetTasks };
};

export const useGetSingleTask = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<TSingleTask | null | undefined>(null);
  const dispatch = useDispatch();
  const OnGetSingleTask = async ({
    id,
    successCallback,
    errorCallback,
  }: {
    id?: string;
    successCallback?: (task: TSingleTask | null | undefined) => void;
    errorCallback?: (props: { message?: string; description?: string }) => void;
  }) => {
    if (!id) return;

    setLoading(true);
    try {
      const res = await TaskService.getSingleTask(id);

      const task = res?.data?.task || [];
      setData(task);
      // dispatch(setCurrentTask(res?.data));
      successCallback?.(task);
      console.log(task);
    } catch (error: Error | AxiosError | any) {
      const message =
        error?.response?.data?.message || "Failed to fetch single task";
      const description = error?.response?.data?.description || "";

      showErrorToast({ message, description });
      errorCallback?.({ message, description });
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, OnGetSingleTask };
};

export const useCreateTask = () => {
  const [loading, setLoading] = useState(false);

  const onCreateTask = async ({
    payload,
    successCallback,
    errorCallback,
  }: {
    payload: TAddTask;
    successCallback?: (data?: any) => void;
    errorCallback?: (props: { message?: string; description?: string }) => void;
  }) => {
    setLoading(true);

    try {
      const res = await TaskService.createTask({ payload });

      successCallback?.(res?.data);
    } catch (error: Error | AxiosError | any) {
      showErrorToast({
        message: error?.response?.data?.message || "An error occurred!",
        description: error?.response?.data?.description || "",
      });
    } finally {
      setLoading(false);
    }
  };

  return { loading, onCreateTask };
};


