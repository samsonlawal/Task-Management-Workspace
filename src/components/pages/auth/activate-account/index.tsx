"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import { useActivateUser } from "@/hooks/api/auth";
import Brand from "@/components/reuseables/Brand";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ShieldAlert, Loader2, ArrowRight } from "lucide-react";

const ActivateUser = () => {
  const tokenParams = useSearchParams();
  const token: string | null = tokenParams.get("token");
  
  const router = useRouter();
  
  const { loading, onActivateUser } = useActivateUser();
  const [success, setSuccess] = useState<boolean>(false);
  const [errorState, setErrorState] = useState<boolean>(false);
  
  const initialFetch = useRef(false);

  useEffect(() => {
    if (token && token.length > 0) {
      if (!initialFetch.current) {
        initialFetch.current = true;
        onActivateUser({
          token,
          successCallback: () => setSuccess(true),
          errorCallback: () => setErrorState(true),
        });
      }
    } else {
      setErrorState(true);
    }
  }, [token]);

  // Determine active verification state
  const activeState = success ? "success" : (errorState ? "error" : "loading");

  return (
    <div className="poppins relative flex min-h-screen w-full flex-col items-center justify-between bg-zinc-50 dark:bg-[#111] px-4 py-8 text-zinc-950 dark:text-white overflow-hidden">
      {/* Header logo container */}
      <div className="mt-8 relative z-10">
        <Brand />
      </div>

      {/* Main flat activation container */}
      <div className="my-auto relative z-10 w-full max-w-[420px] p-8 rounded-xl bg-white dark:bg-[#1a1a1a] border border-zinc-200 dark:border-zinc-800/80 shadow-xl flex flex-col items-center justify-center min-h-[300px]">
        <AnimatePresence mode="wait">
          {activeState === "loading" && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center gap-5"
            >
              <div className="relative flex items-center justify-center">
                {/* Glow ring spinner effect */}
                <div className="absolute inset-0 rounded-full bg-indigo-500/10 blur-[8px] animate-pulse" />
                <Loader2 className="h-10 w-10 text-[#563892] animate-spin" />
              </div>
              <div className="flex flex-col items-center gap-2">
                <h1 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-white">Verifying credentials</h1>
                <p className="text-[13px] text-zinc-500 dark:text-zinc-400 max-w-[280px] text-center leading-relaxed">
                  Please do not refresh or close this window while we activate your account.
                </p>
              </div>
            </motion.div>
          )}

          {activeState === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 100 }}
              className="flex flex-col items-center gap-6 w-full"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border border-emerald-500/20">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div className="flex flex-col items-center gap-2">
                <h1 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-white">Account Activated</h1>
                <p className="text-[13px] text-zinc-500 dark:text-zinc-400 max-w-[280px] text-center leading-relaxed">
                  Your email has been verified successfully. Let's get you signed in and setup.
                </p>
              </div>
              
              <button
                onClick={() => router.replace("/auth/sign-in")}
                className="mt-2 group flex w-full items-center justify-center gap-2 rounded-lg bg-[#563892] hover:bg-[#482e7b] px-4 py-2.5 text-xs font-semibold text-white transition-all duration-300 active:scale-98"
              >
                <span>Continue to login</span>
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </button>
            </motion.div>
          )}

          {activeState === "error" && (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center gap-6 w-full"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-500/10 text-rose-500 dark:text-rose-400 border border-rose-500/20">
                <ShieldAlert className="h-6 w-6" />
              </div>
              <div className="flex flex-col items-center gap-2">
                <h1 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-white">Verification Failed</h1>
                <p className="text-[13px] text-zinc-500 dark:text-zinc-400 max-w-[300px] text-center leading-relaxed">
                  The verification link is invalid, expired, or has already been used. Please try requesting a new link.
                </p>
              </div>

              <button
                onClick={() => router.replace("/auth/sign-up")}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 px-4 py-2.5 text-xs font-semibold text-zinc-800 dark:text-zinc-200 transition-all active:scale-98"
              >
                <span>Back to Registration</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer footer information */}
      <div className="mb-4 relative z-10">
        <p className="text-[11px] text-zinc-455 dark:text-zinc-650 tracking-wide select-none">
          © {new Date().getFullYear()} @Taskstackhq. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export { ActivateUser };
