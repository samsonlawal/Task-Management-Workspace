import { useState, useEffect } from "react";
import WorkspaceService from "@/services/workspace";
import { TNotification } from "@/types";
import axios, { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import NotificationService from "@/services/Notification";

export const useGetUserNotifications = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<TNotification[]>([]);

  const onGetUserNotification = async (userId: string) => {
    setLoading(true);
    try {
      const res = await NotificationService.getUserNotifications(userId);
      console.log(res?.data);

      setData(res?.data?.data);
    } catch (error: Error | AxiosError | any) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  return { onGetUserNotification, data, loading };
};

export const useReadNotification = () => {
  const [loading, setLoading] = useState<boolean>(false);
  // const [data, setData] = useState<TNotification[]>([]);

  const onReadNotification = async (id: string) => {
    setLoading(true);
    try {
      const res = await NotificationService.MarkAsRead(id);
      console.log(res?.data);

      // setData(res?.data?.data);
    } catch (error: Error | AxiosError | any) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  return { onReadNotification, loading };
};

export const useReadAllNotification = () => {
  const [loading, setLoading] = useState<boolean>(false);
  // const [data, setData] = useState<TNotification[]>([]);

  const onReadAllNotification = async (userId: string) => {
    setLoading(true);
    try {
      const res = await NotificationService.MarkAllAsRead(userId);
      console.log(res?.data);

      // setData(res?.data?.data);
    } catch (error: Error | AxiosError | any) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  return { onReadAllNotification, loading };
};
