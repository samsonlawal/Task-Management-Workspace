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
    <div className="poppins relative flex min-h-screen w-full flex-col items-center justify-between bg-[#0a0a0a] px-4 py-8 text-white overflow-hidden">
      {/* Glow Backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-indigo-600/10 blur-[100px] sm:blur-[130px] pointer-events-none" />

      {/* Header logo container */}
      <div className="mt-8 relative z-10">
        <Brand />
      </div>

      {/* Main glassmorphic activation container */}
      <div className="my-auto relative z-10 w-full max-w-[420px] p-8 rounded-2xl bg-zinc-900/40 backdrop-blur-md border border-zinc-800/80 shadow-2xl flex flex-col items-center justify-center min-h-[300px]">
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
                <Loader2 className="h-10 w-10 text-indigo-500 animate-spin" />
              </div>
              <div className="flex flex-col items-center gap-2">
                <h1 className="text-xl font-semibold tracking-tight">Verifying credentials</h1>
                <p className="text-[13px] text-zinc-400 max-w-[280px] text-center leading-relaxed">
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
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div className="flex flex-col items-center gap-2">
                <h1 className="text-xl font-semibold tracking-tight">Account Activated</h1>
                <p className="text-[13px] text-zinc-400 max-w-[280px] text-center leading-relaxed">
                  Your email has been verified successfully. Let's get you signed in and setup.
                </p>
              </div>
              
              <button
                onClick={() => router.replace("/auth/sign-in")}
                className="mt-2 group flex w-full items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-xs font-semibold text-black transition-all duration-300 hover:bg-zinc-200 active:scale-98"
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
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
                <ShieldAlert className="h-6 w-6" />
              </div>
              <div className="flex flex-col items-center gap-2">
                <h1 className="text-xl font-semibold tracking-tight">Verification Failed</h1>
                <p className="text-[13px] text-zinc-400 max-w-[300px] text-center leading-relaxed">
                  The verification link is invalid, expired, or has already been used. Please try requesting a new link.
                </p>
              </div>

              <button
                onClick={() => router.replace("/auth/sign-up")}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 px-4 py-2.5 text-xs font-semibold text-zinc-200 transition-all active:scale-98 border border-zinc-700/50"
              >
                <span>Back to Registration</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer footer information */}
      <div className="mb-4 relative z-10">
        <p className="text-[11px] text-zinc-600 tracking-wide select-none">
          © {new Date().getFullYear()} @Taskstackhq. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export { ActivateUser };
