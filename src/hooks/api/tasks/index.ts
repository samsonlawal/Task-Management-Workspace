import { useState, useEffect } from "react";
import TaskService from "@/services/tasks";
import { TTask } from "@/types";
import { showErrorToast, showSuccessToast } from "@/utils/toaster";

import axios, { AxiosError } from "axios";

export const useGetTasks = () => {
  const [data, setData] = useState<TTask[]>([]);

  const onGetTasks = async () => {
    try {
      const res = await TaskService.getTasks();
      // console.log(res?.data);

      setData(res?.data);
    } catch (error: Error | AxiosError | any) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    onGetTasks();
  }, []);

  return { onGetTasks, data };
};

export const useCreateTask = () => {
  const [loading, setLoading] = useState(false);

  const handleCreateTask = async ({
    payload,
    successCallback,
    errorCallback,
  }: {
    payload: TTask;
    successCallback?: (data?: any) => void;
    errorCallback?: () => void;
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
      errorCallback?.();
    } finally {
      setLoading(false);
    }
  };

  return { loading, handleCreateTask };
};
