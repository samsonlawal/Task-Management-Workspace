import { useEffect, useState } from "react";
import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import { TNotification } from "@/types";
import { BellOff, X } from "lucide-react";
import { formatTimeAgo } from "@/utils/formatTimeAgo";
import { useSelector } from "react-redux";
import {
  useGetUserNotifications,
  useReadNotification,
  useReadAllNotification,
} from "@/hooks/api/Notification";

const typeToIcon: Record<number, string> = {
  1: "/icons/notification/assigned.svg",
  2: "/icons/notification/chat.svg",
  3: "/icons/notification/mention.svg",
  4: "/icons/notification/edit.svg",
  5: "/icons/notification/calendar.svg",
  6: "/icons/notification/flag.svg",
};

export default function Notification() {
  const { user } = useSelector((state: any) => state.auth);
  const [activeTab, setActiveTab] = useState<"all" | "unread">("all");

  const {
    loading: notificationLoading,
    onGetUserNotification,
    data: notificationData,
  } = useGetUserNotifications();

  useEffect(() => {
    if (user) {
      onGetUserNotification(user?._id);
    }
  }, [user]);

  const { loading: onReadLoading, onReadNotification } = useReadNotification();
  const { loading: onReadAllLoading, onReadAllNotification } =
    useReadAllNotification();

  async function handleRead(id: string) {
    await onReadNotification(id);
    onGetUserNotification(user?._id);
  }

  async function handleReadAll() {
    await onReadAllNotification(user?._id);
    onGetUserNotification(user?._id);
  }

  const hasUnread: boolean = Array.isArray(notificationData) && notificationData.some(
    (notification) => !notification.isRead,
  );

  const filteredNotifications = Array.isArray(notificationData)
    ? notificationData.filter((notif) => {
        if (activeTab === "unread") return !notif.isRead;
        return true;
      })
    : [];

  return (
    <div className="poppins flex h-[50px] w-fit flex-row items-center justify-center gap-6 text-left">
      <Menu as="div" className="relative">
        {({ open, close }) => (
          <>
            <MenuButton className="focus:outline-none">
              <div className="group relative w-fit bg-[#565656]/10 p-2 rounded-sm transition-colors hover:bg-[#565656]/15 dark:bg-[#565656]/20 dark:hover:bg-[#565656]/30">
                <img
                  src="/icons/bell-line.svg"
                  alt="Notifications"
                  className="h-[18px] w-[18px] cursor-pointer"
                />
                {hasUnread && (
                  <span className="absolute -right-[1px] -top-[1px] h-2.5 w-2.5 rounded-full border-2 border-white bg-red-500 dark:border-[#111] transition-all duration-300"></span>
                )}
              </div>
            </MenuButton>

            <MenuItems
              transition
              className="fixed inset-0 z-50 flex h-screen w-screen origin-top-right flex-col bg-white text-sm/6 text-black shadow-2xl transition duration-100 ease-out focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 dark:bg-[#111] sm:absolute sm:inset-auto sm:right-0 sm:mt-3 sm:h-auto sm:w-[458px] sm:max-h-[550px] sm:rounded-xl sm:border sm:border-zinc-200 sm:dark:border-[#fff]/10 sm:shadow-[0px_4px_25px_rgba(0,0,0,0.08)] overflow-hidden"
            >
              <div className="flex flex-col h-full sm:h-auto dark:bg-[#111]">
                {/* Header */}
                <div className="flex w-full flex-row items-center justify-between px-6 py-5">
                  <p className="text-[20px] font-semibold dark:text-[#fff]">Notifications</p>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleReadAll()}
                      className="rounded-[6px] bg-[#F3F3F3] dark:bg-zinc-800 text-[#4E4E4E] dark:text-zinc-300 hover:bg-[#e8e8e8] dark:hover:bg-zinc-700 px-[14px] py-[6px] text-[12px] font-medium transition-colors"
                    >
                      Mark all as read
                    </button>
                    {/* Mobile Close Button */}
                    <button
                      onClick={close}
                      className="p-1.5 text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 sm:hidden focus:outline-none rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>

                {/* Tabs */}
                <div className="poppins flex flex-row gap-5 border-b border-zinc-100 dark:border-zinc-800/60 px-6">
                  <button
                    onClick={() => setActiveTab("all")}
                    className={`pb-2.5 text-[12px] font-semibold border-b-2 transition-colors focus:outline-none ${
                      activeTab === "all"
                        ? "border-zinc-800 dark:border-[#fff] text-zinc-950 dark:text-[#fff]"
                        : "border-transparent text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                    }`}
                  >
                    All Updates
                  </button>

                  <button
                    onClick={() => setActiveTab("unread")}
                    className={`pb-2.5 text-[12px] font-semibold border-b-2 transition-colors focus:outline-none ${
                      activeTab === "unread"
                        ? "border-zinc-800 dark:border-[#fff] text-zinc-950 dark:text-[#fff]"
                        : "border-transparent text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                    }`}
                  >
                    Unread
                  </button>
                </div>

                {/* Notification List Container */}
                <div className="flex-1 overflow-y-auto scrollbar-hide sm:h-[350px] sm:flex-none">
                  {filteredNotifications.length > 0 ? (
                    filteredNotifications.map((notif: TNotification) => (
                      <div
                        key={notif._id}
                        className={`poppins flex min-h-[72px] py-3.5 cursor-pointer flex-row items-start gap-3 border-b border-zinc-100 dark:border-zinc-800/30 px-6 transition-all hover:bg-zinc-50/50 dark:hover:bg-zinc-800/10 ${
                          !notif.isRead
                            ? "bg-zinc-50/60 dark:bg-zinc-900/40 border-l-2 border-l-sky-500 pl-[22px]"
                            : "border-l-2 border-l-transparent pl-[22px]"
                        }`}
                        onClick={() => handleRead(notif._id)}
                      >
                        {/* Icon Container */}
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#565656]/5 dark:bg-[#fff]/5">
                          <img src={typeToIcon[notif.type]} alt="" className="h-4.5 w-4.5" />
                        </div>

                        {/* Message & Time */}
                        <div className="flex flex-1 flex-row justify-between items-start gap-4">
                          <div className="flex flex-col">
                            <p className={`text-[13px] leading-relaxed ${
                              !notif.isRead
                                ? "font-medium text-zinc-900 dark:text-zinc-100"
                                : "font-normal text-zinc-600 dark:text-zinc-400"
                            }`}>
                              {notif.message}
                            </p>
                            <p className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-1">
                              {formatTimeAgo(notif.createdAt)}
                            </p>
                          </div>

                          {/* Unread Status Dot */}
                          {!notif.isRead && (
                            <span className="h-2 w-2 mt-1.5 shrink-0 rounded-full bg-sky-500"></span>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    /* Fallback when empty */
                    <div className="flex h-[300px] sm:h-[350px] flex-col items-center justify-center p-6 text-zinc-400 dark:text-zinc-500">
                      <BellOff size={40} strokeWidth={1.5} className="text-zinc-300 dark:text-zinc-700" />
                      <p className="mt-3 text-sm font-medium text-zinc-500 dark:text-zinc-400">
                        No notifications yet
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </MenuItems>
          </>
        )}
      </Menu>
    </div>
  );
}
