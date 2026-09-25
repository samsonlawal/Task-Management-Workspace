"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application Error:", error);
  }, [error]);

  return (
    <div className="flex h-[calc(100vh-80px)] w-full flex-col items-center justify-center p-6 bg-[#fff] dark:bg-[#111]">
      <div className="flex w-full max-w-[440px] flex-col items-center gap-4 rounded-[14px] border-[1px] border-[#565656]/20 bg-[#fff] p-8 text-center dark:bg-[#111]">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-500/10 text-red-500">
          <AlertTriangle className="h-5 w-5" />
        </div>
        
        <div className="flex flex-col gap-1">
          <h2 className="text-[14px] font-medium text-[#111] dark:text-[#fff]">
            Something went wrong
          </h2>
          <p className="text-[12px] text-[#565656] dark:text-[#787878]">
            An unexpected error occurred while loading this view.
          </p>
        </div>

        <button
          onClick={() => reset()}
          className="mt-2 flex items-center gap-2 rounded-md border-[1px] border-[#565656]/60 px-[14px] py-1.5 text-[11px] font-medium text-[#111] dark:text-[#fff]/80 transition-colors duration-200 hover:border-[#565656]/20 hover:bg-[#565656]/10"
        >
          <RefreshCw className="h-3 w-3" />
          Try Again
        </button>
      </div>
    </div>
  );
}
