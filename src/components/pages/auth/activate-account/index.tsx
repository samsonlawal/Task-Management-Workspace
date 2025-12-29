"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useActivateUser } from "@/hooks/api/auth";
import AuthPageWrapper from "@/components/layout/auth/auth-page-wrapper";
import SuccessAuth from "@/components/reuseables/SuccessAuth";
import Spinner from "@/components/reuseables/Spinner";
import Brand from "@/components/reuseables/Brand";

const ActivateUser = () => {
  const tokenParams = useSearchParams();
  const token: string | null = tokenParams.get("token");
  const [noToken, setNoToken] = useState<boolean>(false);

  const router = useRouter();

  const { loading, onActivateUser } = useActivateUser();
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
        onActivateUser({
          token,
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
      setNoToken(true);
      // router.replace("/auth/sign-in");
    }
  }, [token]);

  return (
    // <AuthPageWrapper
    //   // showLogo={success?.show ? false : true}
    //   title={success?.show ? undefined : "Email Verification in Progress"}
    //   subtitle={
    //     success?.show
    //       ? undefined
    //       : "We're verifying your email address. Please do not close this window."
    //   }
    // >
    //   {success?.show ? (
    //     <SuccessAuth message={success?.message} />
    //   ) : (
    //     <div className="mt-12 md:mx-auto md:w-[510px]">
    //       {loading ? <Spinner className="mx-auto h-[20px] w-[20px]" /> : null}
    //     </div>
    //   )}
    // </AuthPageWrapper>

    <div className="poppins flex h-[100vh] w-full flex-col items-center justify-center bg-[#111]">
      <Brand />

      <div className="my-10 flex h-[300px] w-[36%] flex-col items-center justify-center gap-4 rounded-md border border-[#565656]/10 bg-[#1a1a1a] py-20 text-white">
        {!success.show ? (
          <div className="flex flex-col items-center justify-center gap-4 text-white">
            <Spinner className="mx-auto h-[30px] w-[40px]" />
            <h1 className="text-[20px] font-medium">
              Activating your account.
            </h1>
            <p className="text-[13px] text-[#fff]/50">
              Please wait while we activate your account
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 text-white">
            <img
              src="/icons/mark.svg"
              alt=""
              className="mx-auto h-[30px] w-[40px]"
            />

            <h1 className="text-[20px] font-medium">Account Activated.</h1>
            <p className="text-[13px] text-[#fff]/50">
              Login and start using the app.
            </p>
          </div>
        )}
      </div>

      <div className="">
        <p className="text-[13px] text-[#fff]/30">
          2025 @Taskstackhq. All Rights Resereved.
        </p>
      </div>
    </div>
  );
};

export { ActivateUser };
