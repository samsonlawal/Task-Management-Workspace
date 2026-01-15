import { useState, useEffect } from "react";
import { TUpdateDetailsService } from "@/types";
import { showErrorToast, showSuccessToast } from "@/utils/toaster";
import axios, { AxiosError } from "axios";
import accountService from "@/services/account";

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

export const useUpdateDetails = () => {
  const [loading, setLoading] = useState(false);

  const onUpdateDetails = async (payload: TUpdateDetailsService) => {
    setLoading(true);
    try {
      const res = await accountService.updateDetails(payload);
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

  return { onUpdateDetails, loading };
};

export const useCheckAvailability = () => {
  const [loading, setLoading] = useState(false);

  const onCheckUsername = async (username: string) => {
    try {
      const res = await accountService.checkUsername(username);
      return res.data;
    } catch (error) {
      return { available: false };
    }
  };

  const onCheckEmail = async (email: string) => {
    try {
      const res = await accountService.checkEmail(email);
      return res.data;
    } catch (error) {
      return { available: false };
    }
  };

  return { onCheckUsername, onCheckEmail, loading };
};
