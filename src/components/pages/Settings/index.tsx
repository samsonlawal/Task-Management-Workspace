"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faMagnifyingGlass,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import AddMember from "../../reuseables/Dialogs/AddMember";
import { CustomSelect } from "../../reuseables/select";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Loader from "@/utils/loader";

function Settings() {
  const members = useSelector(
    (state: RootState) => state.MemberData?.members || [],
  );

  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  useEffect(() => {
    console.log("Members:", members);
  }, [members]);

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
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
    if (!user) return false; // guard against undefined users

    // Normalize data access to handle both direct properties and nested userId properties
    const fullname = user.userId?.fullname || user.fullname || "";
    const email = user.userId?.email || user.email || "";
    const jobTitle = user.userId?.jobTitle || user.jobTitle || "";
    const status = user.status?.toLowerCase() || "";

    const matchesSearch =
      fullname.toLowerCase().includes(search.toLowerCase()) ||
      email.toLowerCase().includes(search.toLowerCase()) ||
      jobTitle.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || status === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
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

  const [enabled, setEnabled] = useState(false);

  return (
    <div className="flex h-fit w-full max-w-[814px] flex-col gap-2 overflow-auto px-9 pb-24 pt-10 transition-all duration-300 scrollbar-hide">
      <div className="flex flex-col">
        <h1 className="text-[18px] font-semibold">Workspace Settings</h1>
        <p className="text-[14px] text-[#565656]">
          Manage settings & preferences for your workspace.
        </p>
      </div>

      <div className="flex flex-col gap-10 pt-10">
        <div className="flex flex-col gap-2">
          {/* text */}
          <div className="flex flex-col">
            <h1 className="text-[14px] font-medium">General</h1>
            <p className="text-[12px] text-[#565656]">Basic workspace info.</p>
          </div>
          {/* Actions and data */}
          <div className="flex flex-col gap-[20px] rounded-[14px] border-[0.5px] border-[#565656]/10 bg-[#F4F4F4] px-6 py-5">
            <div className="flex flex-row items-center justify-start gap-4">
              <span className="flex h-[50px] w-[50px] items-center justify-center rounded-[8px] bg-[#563892] font-semibold text-white">
                T
              </span>
              <div className="flex flex-col">
                <p className="text-[14px]">Name</p>
                <p className="text-[12px] text-[#565656]">taskstack</p>
              </div>
            </div>
            {/* <div className="h-[1px] bg-[#565656]/10" /> */}

            {/* text */}
            <div className="flex flex-col">
              <h1 className="text-[14px]">Description</h1>
              <p className="text-[12px] text-[#565656]">
                Add a short description to help others understand what this
                workspace is about.
              </p>
            </div>
            <div className="h-[1px] bg-[#565656]/10" />

            <div className="flex flex-row justify-between">
              <div className="flex flex-col">
                <h1 className="text-[14px]">members & Roles</h1>
                <p className="text-[12px] text-[#565656]">8 Members</p>
              </div>
              <button className="rounded-[6px] border-[1px] border-[#565656] px-[12px] py-2 text-[12px] font-medium text-[#565656] transition-colors duration-300 hover:border-[#565656] hover:bg-[#565656] hover:text-white">
                Manage members
              </button>
            </div>
          </div>
        </div>

        {/* Permissons */}
        <div className="flex flex-col gap-2">
          {/* text */}
          <div className="flex flex-col">
            <h1 className="text-[14px] font-medium">Permissions</h1>
            <p className="text-[12px] text-[#565656]">
              Define access levels and control sensitive actions.
            </p>
          </div>
          {/* Actions and data */}
          <div className="flex flex-col gap-[20px] rounded-[14px] border-[0.5px] border-[#565656]/10 bg-[#F4F4F4] px-6 py-5">
            {/* text */}

            <div className="flex flex-row justify-between">
              <div className="flex flex-col">
                <h1 className="text-[14px]">Delete Tasks</h1>
                <p className="text-[12px] text-[#565656]">
                  Prevent accidental loss of important tasks.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEnabled(!enabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full py-1 transition-colors ${enabled ? "bg-blue-600" : "bg-gray-300"}`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${enabled ? "translate-x-6" : "translate-x-1"}`}
                />
              </button>
            </div>
            <div className="h-[1px] bg-[#565656]/10" />
            <div className="flex flex-row justify-between">
              <div className="flex flex-col">
                <h1 className="text-[14px]">Create and edit tasks</h1>
                <p className="text-[12px] text-[#565656]">
                  Limit who can start new projects to keep things organized.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEnabled(!enabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full py-1 transition-colors ${enabled ? "bg-blue-600" : "bg-gray-300"}`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${enabled ? "translate-x-6" : "translate-x-1"}`}
                />
              </button>
            </div>
            <div className="h-[1px] bg-[#565656]/10" />
            <div className="flex flex-row justify-between">
              <div className="flex flex-col">
                <h1 className="text-[14px]">Invite new members</h1>
                <p className="text-[12px] text-[#565656]">
                  Allow members to invite/add new members?
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEnabled(!enabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full py-1 transition-colors ${enabled ? "bg-blue-600" : "bg-gray-300"}`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${enabled ? "translate-x-6" : "translate-x-1"}`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Danger */}
        <div className="flex flex-col gap-2">
          {/* text */}
          <div className="flex flex-col">
            <h1 className="text-[14px] font-medium">Danger Zone</h1>
            <p className="text-[12px] text-[#565656]/80">
              Permanently delete your workspace or remove yourself from it.{" "}
              <span className="text-[#111]">
                These actions cannot be undone.
              </span>
            </p>
          </div>
          {/* Actions and data */}
          <div className="flex flex-col gap-[20px] rounded-[14px] border-[0.5px] border-[#BC0000]/10 bg-[#BC0000]/10 px-6 py-5">
            {/* text */}

            <div className="flex flex-row justify-between">
              <div className="flex flex-col">
                <h1 className="text-[14px]">Leave Workspace</h1>
                <p className="text-[12px] text-[#565656]">
                  You will lose access to this workspace. You can only rejoin if
                  someone invites you again.
                </p>
              </div>
              <button className="h-fit w-[90px] rounded-[6px] border-[1px] border-[#BC0000] py-2 text-[12px] font-medium text-[#BC0000] transition-colors duration-300 hover:border-[#BC0000] hover:bg-[#BC0000] hover:text-white">
                Leave
              </button>
            </div>
            <div className="h-[1px] bg-[#BC0000]/20" />
            <div className="flex flex-row justify-between">
              <div className="flex flex-col">
                <h1 className="text-[14px]">Delete workspace</h1>
                <p className="text-[12px] text-[#565656]">
                  You will lose access to this workspace. You can only rejoin if
                  someone invites you again.
                </p>
              </div>
              <button className="h-fit w-[90px] rounded-[6px] border-[1px] border-[#BC0000] px-[24px] py-2 text-[12px] font-medium text-[#BC0000] transition-colors duration-300 hover:border-[#BC0000] hover:bg-[#BC0000] hover:text-white">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
