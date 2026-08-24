"use client";

import UpgradePlan from "@/components/reuseables/UpgradePlan";
import CurrentWorkspace from "@/components/reuseables/currentWorkspace";
import { useRouter, usePathname, useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUI } from "@/redux/Slices/uiSlice";
import {
  LayoutDashboard,
  CheckCheck,
  UsersRound,
  Bot,
  Settings,
} from "lucide-react";

import IntegrationsNavGroup from "@/components/main/sidebar/IntegrationsNavGroup";

export default function Sidebar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const pathname = usePathname();
  const params = useParams();

  const workspaceSlug = params?.workspaceSlug;
  const workspace = useSelector((state: any) => state.workspace);

  const workspaceIdentifier =
    workspaceSlug || workspace?.slug || workspace?._id;

  return (
    <div className="flex h-full w-full flex-1 flex-col justify-between bg-white py-[14px] dark:bg-[#111]">
      <div className="flex flex-col gap-[34px]">
        <CurrentWorkspace />
        <div className="poppins-regular flex flex-col justify-between gap-1 px-[12px] text-[13px] font-[300] text-[#707070]">
          {(
            [
              {
                label: "Dashboard",
                value: "dashboard",
                icon: <LayoutDashboard strokeWidth={1.5} size={16} />,
                disabled: false,
              },
              {
                label: "Tasks",
                value: "tasks",
                icon: <CheckCheck strokeWidth={1.5} size={16} />,
                disabled: false,
              },
              {
                label: "Team",
                value: "team",
                icon: <UsersRound strokeWidth={1.5} size={16} />,
                disabled: false,
              },
              {
                label: "Agent",
                value: "agent",
                icon: <Bot strokeWidth={1.5} size={16} />,
                disabled: false,
              },
              // {
              //   label: "Notifications",
              //   value: "notification",
              //   icon: <Bell strokeWidth={1.5} size={18} />,

              {
                label: "Settings",
                value: "settings",
                icon: <Settings strokeWidth={1.5} size={16} />,
                disabled: false,
              },
            ] as const
          ).map((link) => {
            const isActive =
              pathname === `/${workspaceIdentifier}/${link.value}`;
            return (
              <span
                key={link.value}
                onClick={() => {
                  if (!link.disabled && workspaceIdentifier) {
                    router.push(`/${workspaceIdentifier}/${link.value}`);
                    dispatch(setCurrentUI(link.value));
                  }
                }}
                className={`flex cursor-pointer flex-row items-center justify-between rounded-[5px] border px-2.5 py-1.5 transition-all duration-300 hover:border-[#565656]/10 hover:bg-[#565656]/10 ${
                  isActive
                    ? "border-[#565656]/10 bg-[#565656]/10 font-medium text-zinc-950 dark:text-white"
                    : "border-transparent text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                } ${link.disabled ? "opacity-70 hover:cursor-not-allowed" : ""}`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-[10px]">{link.icon}</span>
                  <span>{link.label}</span>
                </div>
              </span>
            );
          })}

          <IntegrationsNavGroup />
        </div>
      </div>
      <div className="flex h-fit w-full flex-col gap-[20px] px-[14px]">
        {/* <UpgradePlan /> */}
        <DropdownMenu />
      </div>
    </div>
  );
}

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useLogout } from "@/hooks/api/auth";
import stringToColor from "@/utils/stringToColor";
import ThemeSwitcher from "@/components/reuseables/ThemeSwitcher";


function DropdownMenu() {
  const { user, isLoggedIn } = useSelector((state: any) => state.auth);
  const router = useRouter();
    const params = useParams();
  const workspaceSlug = params?.workspaceSlug;
  const workspace = useSelector((state: any) => state.workspace);

  const workspaceIdentifier =
    workspaceSlug || workspace?.slug || workspace?._id;


  const { onLogout } = useLogout();
  function handleLogout() {
    onLogout();
    router.push("/");
  }


  const userMenuItems = [
  {
    label: "Profile",
    icon: "/icons/menu/user1.svg",
    path: `/${workspaceIdentifier}/profile`,
  },
  {
    label: "Settings",
    icon: "/icons/menu/menucog.svg",
    path: `/${workspaceIdentifier}/settings`,
  },
  {
    label: "Help",
    icon: "/icons/menu/help.svg",
    path: `/${workspaceIdentifier}/help`, // Update this if help is global (e.g. just "/help")
  },
];

  return (
    <div className="flex h-[50px] w-full flex-row items-center justify-center gap-6 text-right md:z-30">
      <Menu>
        <MenuButton className="flex w-full items-center justify-center gap-2 rounded-md border-[1px] border-[#565656]/10 px-2 py-[8px] text-black transition-colors duration-500 hover:bg-[#565656]/20">
          <div className="flex w-full flex-row items-center gap-[8px]">
            {user?.profileImage === "none" ? (
              <span
                className="flex h-[20px] font-medium w-[20px] items-center justify-center rounded-sm text-[14px] text-white"
                style={{ backgroundColor: stringToColor(user?.fullname) }}
              >
                {user?.fullname.charAt(0).toUpperCase()}
              </span>
            ) : (
              <span className="flex h-[24px] w-[24px] items-center justify-center rounded-full">
                <img
                  src={user?.profileImage}
                  alt=""
                  className="mx-auto rounded-full"
                />
              </span>
            )}
            <div className="flex flex-col items-start -space-y-[5px] leading-5 text-[#111] dark:text-white">
              <p className="text-[12px] poppins">{user?.fullname}</p>
              {/* <p className="text-[10px] text-[#707070]">{user?.email}</p> */}
            </div>
          </div>
          <img
            src="/icons/dcaret.svg"
            alt=""
            className="w-2.5 cursor-pointer pr-1"
          />
        </MenuButton>

        <MenuItems
          transition
          anchor="top start"
          className="z-50 flex min-h-fit w-[220px] origin-top-left flex-col justify-between gap-1 rounded-[8px] border-[1px] border-[#565656]/20 bg-white px-3 py-[14px] text-sm/6 text-white shadow-[0px_4px_10px_rgba(0,0,0,0.001),0px_-2px_5px_rgba(0,0,0,0.001)] transition duration-100 ease-out [--anchor-gap:10px] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 dark:bg-[#111]"
        >
          <div className="flex flex-col gap-[0px]">
            {userMenuItems.map((item) => (
            <MenuItem key={item.label}>
              <div
                onClick={() => {
                  if (workspaceIdentifier) {
                    router.push(item.path);
                  }
                }}
                className="flex cursor-pointer flex-row items-center gap-3 rounded-[8px] px-3 py-1.5 hover:bg-[#565656]/10"
              >
                <img src={item.icon} alt={item.label} className="w-[16px]" />
                <p className="poppins font-normal text-[12px] text-[#111] dark:text-white">
                  {item.label}
                </p>
              </div>
            </MenuItem>
          ))}

            <div className="flex cursor-pointer flex-row items-center justify-between gap-3 rounded-[8px] px-3 py-1">
              <div className="flex flex-row items-center gap-3">
                <img src="/icons/menu/lamp.svg" alt="" className="w-[16px]" />
                <p className="poppins text-[12px] text-[#111] dark:text-white">
                  Theme
                </p>
              </div>

              <ThemeSwitcher />
            </div>
            <div className="my-1 h-px bg-[#565656]/20" />
            {/* <MenuItem> */}
            <div
              onClick={() => handleLogout()}
              className="flex cursor-pointer flex-row items-center gap-3 rounded-[8px] px-3 py-1.5 hover:bg-[#D32F2F]/20"
            >
              <img src="/icons/menu/exit.svg" alt="" className="w-[16px]" />
              <p className="poppins text-[13px] text-[#111] dark:text-white">
                Logout
              </p>
            </div>
            {/* </MenuItem> */}
          </div>
        </MenuItems>
      </Menu>
    </div>
  );
}
