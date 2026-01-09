"use client";

import React, { useEffect, useState } from "react";
import Switch from "../switchWorkSpace";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import AddWorkspace from "../Dialogs/AddWorkspace";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetUserWorkspace,
  useGetSingleWorkspace,
  useGetMembers,
} from "@/hooks/api/workspace";
import { setCurrentWorkspace } from "@/redux/Slices/currentWorkspaceSlice";
import { setWorkspace } from "@/redux/Slices/workspaceSlice";
import { setMembers } from "@/redux/Slices/memberSlice";

import { setTasks } from "@/redux/Slices/taskSlice";

import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "@/utils/localStorage/AsyncStorage";
import Loader from "@/utils/loader";
import { useGetTasks } from "@/hooks/api/tasks";

import { setCurrentUI } from "@/redux/Slices/uiSlice";
import { Settings } from "lucide-react";
import stringToColor from "@/utils/stringToColor";

export default function CurrentWorkspace() {
  return (
    <div className="flex flex-col gap-[24px]">
      <div className="flex w-full flex-col justify-between gap-[8px]">
        {/* <div className="flex w-full"><p>Workspace</p></div> */}
        <div className="flex flex-row items-center gap-[8px] px-[12px]">
          <Workspace />
        </div>
      </div>
      {/* <AddMember /> */}
    </div>
  );
}

function Workspace() {
  const dispatch = useDispatch();
  const [filteredWorkspaces, setFilteredWorkspaces] = useState<any>([]);

  const { user } = useSelector((state: any) => state.auth);
  const { currentWorkspace } = useSelector(
    (state: any) => state.currentWorkspace,
  );

  const [current, setCurrent] = useState<
    "tasks" | "dashboard" | "team" | "settings"
  >("tasks");

  // Use the unified hook
  const { data: taskData, onGetTasks, loading: tasksLoading } = useGetTasks();

  const {
    data: workspaces,
    onGetUserWorkspace,
    loading: workspacingLoading,
  } = useGetUserWorkspace(user?.id);

  const {
    data: memberData,
    onGetMembers,
    loading: membersLoading,
  } = useGetMembers();

  const {
    data: workspaceData,
    onGetSingleWorkspace,
    loading: singleWorkspaceLoading,
  } = useGetSingleWorkspace(currentWorkspace);

  // only fetch data when user changes
  useEffect(() => {
    if (user) {
      onGetUserWorkspace(user?._id);

      getFromLocalStorage({
        key: "CurrentWorkspaceId",
        cb: (id: string) => {
          if (id) {
            dispatch(setCurrentWorkspace(id));
            onGetSingleWorkspace(id);

            // Add success callback to ensure proper handling
            onGetTasks({
              workspaceId: id,
              successCallback: (tasks) => {
                console.log("Initial tasks loaded:", tasks);
              },
            });

            onGetMembers({ workspaceId: id });
          }
        },
      });
    }
  }, [user]); // Only depend on user

  function openWorkspaceDialog() {
    onGetUserWorkspace(user?._id);
    setFilteredWorkspaces(
      workspaces?.filter((workspace) => workspace._id !== workspaceData?._id) ||
        [],
    );
  }

  function switchWorkspace(id: string) {
    if (workspaceData) {
      saveToLocalStorage({
        key: "WorkspaceData",
        value: workspaceData,
      });
      dispatch(setWorkspace(workspaceData));
    }

    onGetUserWorkspace(user?._id);
    onGetSingleWorkspace(id);
    dispatch(setCurrentWorkspace(id));

    // Add success callback for workspace switching
    onGetTasks({
      workspaceId: id,
      successCallback: (tasks) => {
        console.log("Tasks loaded after workspace switch:", tasks);
      },
    });

    onGetMembers({ workspaceId: id });

    setFilteredWorkspaces(
      workspaces?.filter((workspace) => workspace._id !== id) || [],
    );
  }

  // FIXED: Simplified useEffect to prevent clearing
  useEffect(() => {
    if (workspaceData) {
      dispatch(setCurrentWorkspace(workspaceData?._id));
      dispatch(setWorkspace(workspaceData));
    }

    if (memberData) {
      dispatch(setMembers(memberData));
    }

    // Only dispatch tasks if we have tasks data
    if (taskData && taskData.length > 0) {
      console.log("Dispatching tasks to Redux:", taskData);
      dispatch(setTasks(taskData));
    }
  }, [workspaceData, memberData, taskData, dispatch]);

  return (
    <div className="w-full text-left">
      <Menu>
        <MenuButton className="inline-flex w-full items-center gap-2 rounded-md border-[1px] border-[#565656]/10 bg-[#565656]/10 px-2 py-1.5 text-black transition-all duration-300 hover:bg-[#565656]/20 focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white">
          <div
            className="poppins flex w-full flex-row items-center gap-[8px] text-white"
            onClick={() => openWorkspaceDialog()}
          >
            {workspaceData?.name ? (
              <>
                <span
                  className="poppins-medium flex h-[29px] w-[29px] items-center justify-center rounded-[5px] text-white"
                  style={{
                    backgroundColor: stringToColor(workspaceData?.name),
                  }}
                >
                  {workspaceData?.name.charAt(0).toUpperCase()}
                </span>
                <div className="flex flex-col items-start -space-y-1">
                  <p className="poppins-medium text-[13px] text-[#111] dark:text-white">
                    {workspaceData?.name}
                  </p>
                  <p className="poppins text-[10px] font-normal text-[#707070]">
                    {workspaceData?.memberCount} Member
                    {workspaceData?.memberCount === 1 ? "" : "s"}
                  </p>
                </div>
              </>
            ) : (
              <div className="flex h-[29px] items-center">
                <Loader loaderSize={10} />
              </div>
            )}
          </div>{" "}
          <img src="/icons/dcaret.svg" alt="" className="w-1.5" />
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom start"
          className="poppins-medium flex min-h-fit w-[260px] origin-top-right flex-col justify-between gap-2 rounded-md border-[1px] border-[#565656]/10 bg-[#1a1a1a] px-3 py-2 text-sm/6 text-white shadow-[0px_4px_10px_rgba(0,0,0,0.001),0px_-2px_5px_rgba(0,0,0,0.001)] transition duration-300 ease-out [--anchor-gap:8px] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          {/* {" "}
          {workspaceData._id && (
            <MenuItem>
              <div
                className={`border-red flex cursor-pointer flex-row items-center justify-start gap-[11px] rounded-[5px] border px-2 py-2 transition-all duration-300 hover:border-[#565656]/10 hover:bg-gray-300/50 ${current === "settings" ? "border border-[#565656]/10 bg-[#565656]/10" : "border-none"}`}
                onClick={() => {
                  dispatch(setCurrentUI("settings"));
                  setCurrent("settings");
                }}
              >
                <Settings strokeWidth={1.5} size={18} />
                Settings
              </div>
            </MenuItem>
          )} */}
          <div className="flex flex-col gap-[4px]">
            {/* <MenuItem> */}
            {workspaceData._id ? (
              <p className="px-2 text-[13px] text-[#707070]">
                Switch Workspace
              </p>
            ) : (
              <p className="px-2 text-[13px] text-[#707070]">
                Select Workspace
              </p>
            )}
            {/* </MenuItem> */}

            <div className="flex h-fit flex-col gap-[10px] overflow-y-auto rounded-sm">
              {workspacingLoading && !filteredWorkspaces ? (
                <div className="flex h-full w-full items-center justify-center">
                  <Loader loaderSize={50} />
                </div>
              ) : (
                <div className="flex h-full flex-col gap-1">
                  {workspaces && workspaces.length > 0 ? (
                    filteredWorkspaces.map((workspace: any, index: any) => (
                      <MenuItem key={index}>
                        <div
                          className="flex cursor-pointer flex-row items-center gap-[12px] rounded-[4px] border border-[#1a1a1a] pl-2 hover:border-[#565656]/10 hover:bg-[#565656]/10"
                          onClick={() => switchWorkspace(workspace?._id)}
                        >
                          <div
                            className="flex h-[32px] w-[32px] items-center justify-center rounded-[5px] text-[13px] text-white"
                            style={{
                              backgroundColor: stringToColor(workspace?.name),
                            }}
                          >
                            {workspace?.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex flex-col -space-y-[8px]">
                            <p className="text-[13px]">{workspace?.name}</p>
                            {/* Add number of users to the returend dara */}
                            <p className="text-[10px] font-normal text-[#707070]">
                              {workspace?.memberCount} Member
                              {workspace?.memberCount > 1 ? "s" : ""}
                            </p>
                          </div>
                        </div>
                      </MenuItem>
                    ))
                  ) : (
                    <div>
                      <p>No workspace available.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <MenuItem>
            <AddWorkspace />
          </MenuItem>
          <div></div>
        </MenuItems>
      </Menu>
    </div>
  );
}
