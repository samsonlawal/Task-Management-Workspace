import { useState, useEffect } from "react";
import TaskService from "@/services/tasks";
import { TLogin, TRegister } from "@/types";
import { showErrorToast, showSuccessToast } from "@/utils/toaster";
import { useDispatch } from "react-redux";
import { clearAuthState, setAuthState } from "@/redux/Slices/authSlice";
import { deleteFromLocalStorage } from "@/utils/localStorage/AsyncStorage";

import env from "@/config/env";

import axios, { AxiosError } from "axios";
import AuthService from "@/services/auth";
import accountService from "@/services/account";
import { useRouter } from "next/navigation";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export const useGetUserProfile = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  //   const dispatch = useDispatch();

  const onGetUserProfile = async (id: string) => {
    setLoading(true);
    try {
      const res = await accountService.getProfile(id);
      setData(res?.data);
    } catch (error: Error | AxiosError | any) {
      showErrorToast({
        message: "An error occured!",
        description: error?.response?.data?.message || "An error occured!",
      });
    } finally {
      setLoading(false);
    }
  };

  return { onGetUserProfile, data, loading };
};

export const useUploadAvatar = () => {
  const [loading, setLoading] = useState(false);

  const onUploadAvatar = async (formData: FormData) => {
    setLoading(true);
    try {
      const res = await accountService.updateAvatar(formData);
      console.log(res.data);
      showSuccessToast({
        message: "Avatar updated successfully!",
        description: res?.data?.message || "Avatar updated successfully!",
      });
    } catch (error: Error | AxiosError | any) {
      console.log(error);
      showErrorToast({
        message: "An error occured!",
        description: error?.response?.data?.message || "An error occured!",
      });
    } finally {
      setLoading(false);
    }
  };

  return { onUploadAvatar, loading };
};
