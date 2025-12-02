// import { Cross1Icon, CrossCircledIcon } from '@radix-ui/react-icons';
import React, { useEffect } from "react";

function Alert({
  message,
  type = "error",
  onClose,
}: {
  message: string;
  type?: "success" | "error";
  onClose?: any;
}) {
  const noMessage =
    !message ||
    !message?.length ||
    !message?.trim()?.length ||
    typeof message !== "string";

  useEffect(() => {
    if (!noMessage) {
      setTimeout(() => {
        onClose?.();
      }, 4000);
    }
  }, [noMessage]);

  if (noMessage) return null;

  return (
    <div className="relative mb-[24px] flex w-full items-center justify-center gap-[12px] rounded-[4px] bg-[#FFEAEA] px-[30px] py-[8px] text-[#FF0000]">
      <img src="/icons/info-circle-red.svg" alt="error" />
      <span className="text-center text-[13px] leading-[24px]">{message}</span>
      {typeof onClose === "function" ? (
        <button
          className="absolute right-[-5px] top-[-5px]"
          onClick={() => onClose?.()}
        >
          {/* <CrossCircledIcon /> */}
        </button>
      ) : null}
    </div>
  );
}

export default Alert;
