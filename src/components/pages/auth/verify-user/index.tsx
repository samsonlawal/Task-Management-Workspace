"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { useActivateUser } from "@/hooks/api/auth";
import AuthPageWrapper from "@/components/layout/auth/auth-page-wrapper";
import SuccessAuth from "@/components/reuseables/SuccessAuth";
import Spinner from "@/components/reuseables/Spinner";

const VerifyUser = () => {
  const tokenParams = useSearchParams();
  const token: string | null = tokenParams.get("token");

  const router = useRouter();

  const { loading, onValidateToken } = useActivateUser();
  const [success, setSuccess] = React.useState<{
    message?: string;
    show?: boolean;
  }>({
    message: "",
    show: false,
  });

  // THIS IS ADDED TO ENSURE THE REQUEST DOEST CALL ITSELF TWICE
  const initialFetch = React.useRef(false);
  useEffect(() => {
    if (token && token?.length > 0) {
      if (!initialFetch?.current) {
        initialFetch.current = true;
        onValidateToken({
          payload: token,
          successCallback: () =>
            setSuccess({
              message: "Your email has been verified successfully!",
              show: true,
            }),
          errorCallback: () =>
            setTimeout(() => {
              router.replace("/auth/sign-up");
            }, 3000),
        });
      }
    } else {
      router.replace("/auth/sign-in");
    }
  }, [token]);

  return (
    <AuthPageWrapper
      showLogo={success?.show ? false : true}
      title={success?.show ? undefined : "Email Verification in Progress"}
      subtitle={
        success?.show
          ? undefined
          : "We're verifying your email address. Please do not close this window."
      }
    >
      {success?.show ? (
        <SuccessAuth message={success?.message} />
      ) : (
        <div className="mt-12 md:mx-auto md:w-[510px]">
          {loading ? <Spinner className="mx-auto h-[20px] w-[20px]" /> : null}
        </div>
      )}
    </AuthPageWrapper>
  );
};

export { VerifyUser };
