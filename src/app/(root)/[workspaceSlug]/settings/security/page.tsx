"use client";

import React, { useEffect } from "react";
import { Monitor, Smartphone, MoreVertical } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";
import { apiSlice } from "@/redux/api/apiSlice";
import { useGetSessionsQuery, useDeleteSessionMutation } from "@/redux/api/sessionApiSlice";
import { useLogoutMutation } from "@/redux/api/authApiSlice"
import { showErrorToast, showSuccessToast } from "@/utils/toaster";
import { clearAuthState } from "@/redux/Slices/authSlice";

export default function SecurityAndAccessPage() {
  const user = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();
  const router = useRouter();

  const userId = user?.user._id || user?.user.id;
  const { data: sessionsData, isLoading, refetch } = useGetSessionsQuery({ skip: !userId });
  
  const [deleteSession] = useDeleteSessionMutation();
  const [logout] = useLogoutMutation();


 const sessions = [...(sessionsData?.data || sessionsData || [])].sort((a: any, b: any) => {
   const aIsCurrent = a._id === user?.sessionId;
   const bIsCurrent = b._id === user?.sessionId;
  
   if (aIsCurrent && !bIsCurrent) return -1;
   if (!aIsCurrent && bIsCurrent) return 1;
  
   return 0;
 });

  useEffect(() => {
    console.log(sessions);
    console.log(user);

  }, [sessions, user])

  const handleRevoke = async (sessionId: string) => {
    try {
      console.log(sessionId)
      await deleteSession({ sessionId: sessionId }).unwrap();
      showSuccessToast({ message: "Session revoked successfully" });
    } catch (error: any) {
      const message = error?.data?.message || "Failed to revoke session";
      showErrorToast({ message });
    }
  };

  const handleLogout = async () => {
    try {
      await logout().unwrap()
      dispatch(clearAuthState());
      dispatch(apiSlice.util.resetApiState());
      router.push('/')
    } catch(error: any) {
      const message = error?.data?.message || "Failed to revoke session";
      showErrorToast({ message });
    }
  }

  return (
    <div className="flex w-full flex-col gap-6 pt-6 pb-20">
      <div>
        <h1 className="text-lg font-medium text-zinc-900 dark:text-white">
          Security & Access
        </h1>
      </div>

      <div className="flex flex-col gap-2">
        <div>
        <h2 className="text-[13px] tracking-wider text-zinc-500 dark:text-[#fff]">
           Sessions
        </h2>
          <p className="text-xs text-zinc-500 dark:text-[#fff]/40 mb-2 font-normal tracking-normal">
          Manage your logged-in devices and sessions.
        </p>
        </div>

        {isLoading ? (
          <div className="text-sm text-zinc-500">Loading sessions...</div>
        ) : (
          <div className="flex flex-col gap-2">
            {sessions.length === 0 ? (
              <div className="text-sm text-zinc-500 py-8 text-center">No active sessions found.</div>
            ) : (
              sessions.map((session: any, index: number) => {

                const isCurrent = user?.sessionId === session._id;

                const isMobile = session.deviceInfo?.toLowerCase().includes("android") || session.deviceInfo?.toLowerCase().includes("iphone");
                const IconComponent = isMobile ? Smartphone : Monitor;

                return (
                  <div
                    key={session._id || session.id || index}
                    className={`flex items-center justify-between p-3.5 rounded-md border border-zinc-200 bg-white dark:border-[#565656]/10 dark:bg-[#565656]/10`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 dark:bg-[#565656]/10">
                        <IconComponent className="text-zinc-600 dark:text-[#565656]" size={16} />
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="text-[12px] font-normal text-zinc-900 dark:text-white">
                            {session.deviceInfo || "Unknown Device"}
                          </span>
                        </div>
                        <span className="text-[11px] flex flex-row items-center gap-2 text-zinc-500 dark:text-[#fff]/60">
                          {isCurrent && (
                          <span className="flex flex-row items-center justify-center gap-1">
                            <div
                              className="h-1 w-1 rounded-full bg-emerald-500"
                              title="Current Session"
                            />
                            <p className="text-emerald-500">current session</p>
                          </span>
                          )}
                          {session.location || "Unknown Location"}
                        </span>
                      </div>
                    </div>
                    {!isCurrent && (
                      <button
                        onClick={() => handleRevoke(session._id)}
                        className="rounded-md px-3 py-1.5 text-xs font-medium transition-colors text-red-700 hover:bg-red-50 dark:text-red-500 dark:hover:bg-red-950/30"
                      >
                        Revoke access
                      </button>
                    )}
                    {isCurrent && (
                       <button
                        // disabled
                        onClick={handleLogout}
                        className="rounded-md px-3 py-1.5 text-xs font-medium transition-colors text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white opacity-50 cursor-not-allowed"
                       >
                         Log out
                       </button>
                    )}
                  </div>
                )
              })
            )}
          </div>
        )}
      </div>
    </div>
  )
}
