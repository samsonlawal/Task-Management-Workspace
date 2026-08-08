"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faMagnifyingGlass,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import AddMember from "../../reuseables/Dialogs/AddMember";
import { CustomSelect } from "../../reuseables/TeamSelect";
import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar } from "@/redux/Slices/uiSlice";
import { PanelLeft } from "lucide-react";
import { RootState } from "@/redux/store";
import Loader from "@/utils/loader";
import stringToColor from "@/utils/stringToColor";
import AddTask from "@/components/reuseables/Dialogs/EditTask";
import Notification from "@/components/reuseables/Notification";
import TeamMenu from "./TeamMenu";
import { useGetMembers } from "@/hooks/api/workspace";
import { useGetMembersQuery } from "@/redux/api/memberApiSlice";

function Team() {
  const dispatch = useDispatch();
  // const members = useSelector(
  //   (state: RootState) => state.MemberData?.members || [],
  // );

  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState("Status");
  const [roleFilter, setRoleFilter] = useState("Role");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const [imgError, setImgError] = useState(false);

  const { currentWorkspaceId } = useSelector(
    (state: any) => state.currentWorkspace,
  );

  const { data: membersData, isLoading: membersLoading } = useGetMembersQuery(
    {
      workspaceId: currentWorkspaceId,
    },
    { skip: !currentWorkspaceId },
  );

  const members =
    membersData?.members ||
    membersData?.data ||
    (Array.isArray(membersData) ? membersData : []);

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
  };

  const handleRoleFilterChange = (value: string) => {
    setRoleFilter(value);
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentPageUserIds = currentItems.map((user: any) => user._id);
    if (e.target.checked) {
      // Merge current page users into selectedUsers (avoid duplicates)
      setSelectedUsers((prev) => [
        ...new Set([...prev, ...currentPageUserIds]),
      ]);
    } else {
      // Remove current page users
      setSelectedUsers((prev) =>
        prev.filter((id) => !currentPageUserIds.includes(id)),
      );
    }
  };

  const handleSelectUser = (
    e: React.ChangeEvent<HTMLInputElement>,
    userId: string,
  ) => {
    if (e.target.checked) {
      setSelectedUsers((prev) => [...prev, userId]);
    } else {
      setSelectedUsers((prev) => prev.filter((id) => id !== userId));
    }
  };

  const filteredUsers = members?.filter((user: any) => {
    if (!user) return false;

    // Normalize data access to handle both direct properties and nested userId properties
    const fullname = user.userId?.fullname || user.fullname || "";
    const email = user.userId?.email || user.email || "";
    const jobTitle = user.userId?.jobTitle || user.jobTitle || "";
    const status = user.status?.toLowerCase() || "";
    const role = user.role?.toLowerCase() || "";

    const matchesSearch =
      fullname.toLowerCase().includes(search.toLowerCase()) ||
      email.toLowerCase().includes(search.toLowerCase()) ||
      jobTitle.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "Status" || status === statusFilter.toLowerCase();

    const matchesRole =
      roleFilter === "Role" || role === roleFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesRole;
  });

  // Calculate the range of items to display
  const totalItems = filteredUsers?.length || 0;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems =
    filteredUsers?.slice(startIndex, startIndex + itemsPerPage) || [];

  // Pagination logic
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // const handleEditRole = (
  //   userId: string,
  //   currentRole: string,
  //   email: string,
  // ) => {
  //   setEditRoleState({
  //     isOpen: true,
  //     userId,
  //     currentRole,
  //     email,
  //     workspaceId: currentWorkspaceId,
  //   });

  //   console.log(currentWorkspaceId);
  // };

  return (
    <div className="flex h-fit w-full flex-col gap-2 pb-8">
      <div className="sticky top-0 w-full bg-[white] px-4 dark:bg-[#111] lg:px-8">
        <div className="poppins flex w-full items-center justify-between border-[#565656]/10 py-[7px]">
          <div className="flex flex-row items-center">
            <button
              onClick={() => dispatch(toggleSidebar())}
              className="mr-2 flex px-1 text-[#707070] transition-all duration-300 hover:text-[#111] dark:hover:text-white lg:hidden lg:p-2"
              title="Toggle Navigation Sidebar"
            >
              <PanelLeft size={18} strokeWidth={1.6} />
            </button>
            <h2 className="text-xl text-[#111] dark:text-white">Team</h2>
          </div>
          <div className="flex flex-row items-center justify-center gap-3">
            <Notification />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 px-4 lg:px-8">
        <div className="flex h-fit flex-row items-center justify-between gap-3 pt-6 transition-all duration-300">
          {/* search */}
          <div className="relative max-w-[300px] flex-1 rounded-md">
            {/* Search input */}
            <input
              type="text"
              placeholder="Search Users"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-[36px] w-full rounded-lg border border-zinc-300 bg-transparent py-2 pl-9 pr-8 text-[12px] outline-none transition-all placeholder:text-zinc-400 focus:border-[#fff] dark:border-zinc-800 dark:text-[#eee] dark:placeholder:text-zinc-500 dark:focus:border-[#fff]"
            />

            {/* Magnifier icon */}
            <div className="pointer-events-none absolute left-3 top-1/2 flex -translate-y-1/2 items-center justify-center text-zinc-400 dark:text-zinc-500">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="text-[11px]"
              />
            </div>

            {/* Clear button */}
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-2 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 focus:outline-none dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
              >
                <FontAwesomeIcon icon={faXmark} className="text-[11px]" />
              </button>
            )}
          </div>

          <AddMember />
        </div>
        {/* Table */}
        <div className="h-full w-full overflow-hidden rounded-[8px] bg-transparent">
          {members ? (
            <div className="w-full overflow-x-auto">
              <div className="w-full md:min-w-[800px]">
                {/* Header */}
                <div className="grid h-[40px] w-full grid-cols-[1.5fr_0.8fr_0.8fr_20px] items-center justify-center gap-2 px-3 text-[13px] font-medium text-gray-500 dark:text-[#787878] md:grid-cols-[0.8fr_1.2fr_0.4fr_0.5fr_0.5fr_0.4fr_20px] md:gap-5 md:px-4">
                  {/* <div>ID</div> */}
                  <div className="">Name</div>
                  <div className="hidden md:block">Email</div>
                  {/* <div>Job Title</div> */}
                  <div className="">Role</div>
                  <div className="hidden md:block">Last active</div>
                  <div className="hidden md:block">Date added</div>
                  <div className="">Status</div>
                  <div className=""></div>
                </div>

                {/* Body */}
                {currentItems.length > 0 ? (
                  currentItems.map((user: any, index: number) => {
                    // Normalize data access
                    const userData = user.userId || {};
                    const imageSrc =
                      userData.profileImage?.trim() ||
                      user.profileImage?.trim() ||
                      null;

                    const email = userData.email || user.email;
                    const fullname = userData.fullname || userData.name || "-";
                    const jobTitle = userData.jobTitle || user.jobTitle || null;
                    const role = user.role || "-";
                    const status = user.status || "pending";

                    return (
                      <div
                        key={user._id || index}
                        className="grid w-full grid-cols-[1.5fr_0.8fr_0.8fr_20px] items-center gap-2 px-3 py-3 text-[13px] font-[400] text-gray-800 dark:text-[#eee] md:grid-cols-[0.8fr_1.2fr_0.4fr_0.5fr_0.5fr_0.4fr_20px] md:gap-5 md:px-4"
                      >
                        {/* <div className="">{startIndex + index + 1}</div> */}
                        <div className="flex flex-row items-center gap-2">
                          {imageSrc !== "none" ? (
                            <img
                              src={imageSrc}
                              alt="user"
                              className="h-6 w-6 rounded-full object-cover"
                              onError={() => setImgError(true)}
                            />
                          ) : fullname !== "none" ? (
                            <div
                              className="flex h-6 w-6 items-center justify-center rounded-full text-[13px] font-medium text-[#111] dark:text-white"
                              style={{
                                backgroundColor: stringToColor(fullname),
                              }}
                            >
                              {fullname.charAt(0).toUpperCase()}
                            </div>
                          ) : (
                            <div
                              className="flex h-6 w-6 items-center justify-center rounded-full text-[13px] font-medium text-[#111] dark:text-white"
                              style={{
                                backgroundColor: stringToColor("pending"),
                              }}
                            >
                              {/* {fullname.charAt(0).toUpperCase()} */}
                            </div>
                          )}
                          <p className="truncate">{fullname}</p>
                        </div>
                        <div className="hidden truncate md:block">{email}</div>
                        {/* <div>{jobTitle}</div> */}
                        <div>{role}</div>
                        <div className="hidden md:block">Jan 3, 2026</div>
                        <div className="hidden md:block">Jan 3, 2026</div>
                        <div>
                          <div
                            className={`flex w-[70px] flex-row items-center justify-center gap-1 rounded-full py-1 ${
                              status.toLowerCase() === "active"
                                ? "bg-[#66FF00]/20 text-[green] dark:bg-[#66FF00]/10"
                                : "bg-[#565656]/20 text-[#565656] dark:bg-[#565656]/20 dark:text-[#fff]/50"
                            }`}
                          >
                            <div
                              className={`h-1.5 w-1.5 rounded-full ${
                                status.toLowerCase() === "active"
                                  ? "animate-pulse bg-[green]"
                                  : "bg-[#565656]/10 dark:bg-[#787878]"
                              }`}
                            ></div>
                            <p className="text-[11px] capitalize">{status}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-center">
                          {/* <FontAwesomeIcon
                        icon={faEllipsisVertical}
                        className="rounded-md px-3 py-2 hover:bg-gray-200 dark:hover:bg-[#565656]/20"
                      /> */}
                          <TeamMenu
                            userId={user._id}
                            userEmail={email}
                            currentRole={role}
                            userName={fullname}
                            // onSuccess={() =>
                            //   onGetMembers({ workspaceId: currentWorkspaceId })
                            // }
                          />
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="flex h-40 w-full items-center justify-center px-4 py-3 text-[13px] text-gray-500"></div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between px-4 py-3 text-gray-600 dark:text-[#787878]">
                  {/* Showing x of y */}
                  <div className="text-[12px]">
                    {totalItems > 0 ? (
                      <>
                        Showing {Math.min(startIndex + 1, totalItems)} -{" "}
                        {Math.min(startIndex + itemsPerPage, totalItems)} of
                        {"  "}
                        {totalItems}
                      </>
                    ) : (
                      "No results"
                    )}
                  </div>

                  {/* Pagination */}
                  <div className="flex items-center gap-3 text-[12px]">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="rounded-md bg-gray-200 px-3 py-1 hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-[#565656]/20 dark:text-[#fff]/50 dark:hover:bg-[#565656]/10"
                    >
                      Prev
                    </button>
                    <span>
                      {currentPage} / {totalPages}
                    </span>
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages || totalItems === 0}
                      className="rounded-md bg-gray-200 px-3 py-1 hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-[#565656]/20 dark:text-[#fff]/50 dark:hover:bg-[#565656]/10"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Loader loaderSize={50} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Team;
