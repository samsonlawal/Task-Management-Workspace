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

  // Fixed useEffect - only fetch data when user changes
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
        <MenuButton className="inline-flex w-full items-center gap-2 rounded-md border-[1px] bg-white px-2 py-1.5 text-black transition-all duration-300 hover:bg-gray-100 focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white">
          <div
            className="flex w-full flex-row items-center gap-[8px]"
            onClick={() => openWorkspaceDialog()}
          >
            {workspaceData?.name ? (
              <>
                <span className="poppins-medium flex h-[29px] w-[29px] items-center justify-center rounded-[5px] bg-[#A8A8A8] text-white">
                  {workspaceData?.name.charAt(0).toUpperCase()}
                </span>
                <div className="flex flex-col items-start -space-y-1">
                  <p className="poppins-medium text-[13px]">
                    {workspaceData?.name}
                  </p>
                  <p className="poppins-medium text-[10px] font-normal text-[#707070]">
                    {workspaceData?.memberCount}
                    {" Members"}
                  </p>
                </div>
              </>
            ) : (
              <div className="flex h-[29px] items-center">
                <Loader loaderSize={10} />
              </div>
            )}
          </div>{" "}
          <FontAwesomeIcon
            icon={faChevronDown}
            className="fa-xs text-gray-500"
          />
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom start"
          className="poppins-medium flex min-h-[300px] w-[260px] origin-top-right flex-col justify-between rounded-md border-[1px] border-gray-300/60 bg-gray-100 px-3 py-4 text-sm/6 text-black shadow-[0px_4px_10px_rgba(0,0,0,0.001),0px_-2px_5px_rgba(0,0,0,0.001)] transition duration-300 ease-out [--anchor-gap:8px] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          <div className="flex flex-col gap-[10px]">
            {/* <MenuItem> */}
            <p className="px-2 pb-2 text-[14px] text-[#707070]">
              Switch Workspace
            </p>
            {/* </MenuItem> */}

            <div className="flex h-[180px] flex-col gap-[10px] overflow-y-auto rounded-sm">
              {workspacingLoading && !filteredWorkspaces ? (
                <div className="flex h-full w-full items-center justify-center">
                  <Loader loaderSize={50} />
                </div>
              ) : (
                <div className="h-full">
                  {workspaces && workspaces.length > 0 ? (
                    filteredWorkspaces.map((workspace: any, index: any) => (
                      <MenuItem key={index}>
                        <div
                          className="flex cursor-pointer flex-row items-center gap-[12px] rounded-[4px] py-1 pl-2 hover:bg-gray-200/70"
                          onClick={() => switchWorkspace(workspace?._id)}
                        >
                          <div className="flex h-[32px] w-[32px] items-center justify-center rounded-[5px] bg-[#A8A8A8] text-[13px] text-white">
                            {workspace?.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex flex-col -space-y-[8px]">
                            <p className="text-[14px]">{workspace?.name}</p>
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
        </MenuItems>
      </Menu>
    </div>
  );
}
