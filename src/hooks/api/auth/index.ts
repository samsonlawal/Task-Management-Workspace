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
// For logout to set the initial state to the empty
const INITIAL_APP_STATE = env.auth.INITIAL_APP_STATE;

export const useLogin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const router = useRouter();

  const auth = useSelector((state: any) => state.auth);

  useEffect(() => {
    console.log("Auth state:", auth);
  }, [auth]);

  // For logout to set the initial state to the empty
  // const INITIAL_APP_STATE = env.auth.INITIAL_APP_STATE;

  const onLogin = async ({
    payload,
    successCallback,
    errorCallback,
  }: {
    payload: { email: string; password: string };
    successCallback?: () => void;
    errorCallback?: (props: { message?: string; description?: string }) => void;
  }) => {
    setLoading(true);

    try {
      const login_res = await AuthService.login({ payload });
      const profile_res = await accountService.getUserProfile({
        id: login_res?.data?.user?._id,
        accessToken: login_res?.data?.token,
      });

      const user = {
        ...profile_res?.data,
      };
      const accessToken = login_res?.data.token;

      dispatch(
        setAuthState({
          accessToken,
          //    refreshToken,
          //    expiresIn,
          user,
        }),
      );

      showSuccessToast({
        message: "Login success 🚀",
        description: login_res?.data?.description || "",
      });
      router.push("/profile");
      setLoading(false);
    } catch (error: Error | AxiosError | any) {
      errorCallback?.({
        message: error?.response?.data?.message || "An error occured!",
        description: error?.response?.data?.description || "",
      });
      setLoading(false);
    } finally {
    }
  };

  return { onLogin, loading };
};

export const useRegister = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const onRegister = async ({
    payload,
    successCallback,
    errorCallback,
  }: {
    payload: {
      fullname: string;
      username: string;
      email: string;
      password: string;
    };
    successCallback?: (message: string) => void;
    errorCallback?: (props: { message?: string; description?: string }) => void;
  }) => {
    setLoading(true);

    try {
      const register_res = await AuthService.register({ payload });
      console.log(register_res?.data?.message);
      successCallback?.(register_res?.data?.message);
    } catch (error: Error | any) {
      let message = "An error occured!";

      console.log("error?.response?.data", error?.response?.data);
      if (typeof error?.response?.data === "string") message = error?.response;

      if (typeof error?.response?.data === "string")
        message = error?.response?.data;
      if (
        typeof error?.response?.data === "object" &&
        Object.keys(error?.response?.data)?.length
      ) {
        message =
          error?.response?.data[Object.keys(error?.response?.data)?.[0]];
      }
      errorCallback?.({ message });
    } finally {
      setLoading(false);
    }
  };

  return { onRegister, loading };
};

export function useLogout() {
  // const updateAppState = useUpdateAuthContext();
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(clearAuthState());
    deleteFromLocalStorage({ key: env.auth.PERSIST_AUTH_KEY });
  };

  return { onLogout };
}
