"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faMagnifyingGlass,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import AddMember from "../Dialogs/AddMember";
import { CustomSelect } from "../select";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Loader from "@/utils/loader";

function Dashboard() {
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

  return (
    <div className="flex h-fit w-full flex-col gap-2 px-8 transition-all duration-300">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-4">
          <div className="flex flex-1 flex-row items-end gap-4">
            {/* search */}
            <div className="relative w-auto flex-1 rounded-md border-[1px] border-gray-300">
              {/* Search input */}
              <input
                type="text"
                placeholder="Search Users"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-md bg-white py-2 pl-8 pr-8 text-sm outline-none"
              />

              {/* Magnifier icon */}
              <div className="pointer-events-none absolute left-[1px] top-1/2 flex h-[90%] -translate-y-1/2 items-center justify-center rounded-md px-2 text-gray-400">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </div>

              {/* Clear button */}
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              )}
            </div>
          </div>

          <CustomSelect
            options={[
              { label: "All", value: "All" },
              { label: "Active", value: "Active" },
              { label: "Pending", value: "invited" },
            ]}
            placeholder="Filter"
            onChange={handleStatusFilterChange}
          />
        </div>

        <div className="flex w-fit flex-row gap-5">
          <AddMember />
        </div>
      </div>
      {/* Table */}
      <div className="h-full w-[100%] rounded-[8px] border border-gray-300 shadow-sm">
        {members ? (
          <div className="h-full w-full rounded-[8px]">
            {/* Header */}
            <div className="grid h-[50px] w-full grid-cols-[20px_50px_2fr_2.5fr_2fr_1fr_1fr_0.7fr] items-center justify-center gap-5 rounded-t-[8px] bg-gray-100 px-4 text-sm font-medium text-gray-600">
              <div className="flex items-center justify-center">
                <input
                  type="checkbox"
                  checked={
                    currentItems.length > 0 &&
                    currentItems.every((user: any) =>
                      selectedUsers.includes(user._id),
                    )
                  }
                  onChange={handleSelectAll}
                  className="h-4 w-4"
                />
              </div>
              <div>ID</div>
              <div>Full Name</div>
              <div>Email</div>
              <div>Job Title</div>
              <div>Role</div>
              <div>Status</div>
              <div>Actions</div>
            </div>
            <div className="w-full border-b border-gray-300" />

            {/* Body */}
            {currentItems.length > 0 ? (
              currentItems.map((user: any, index: number) => {
                // Normalize data access
                const userData = user.userId || {};
                const imageSrc =
                  userData.profileImage ||
                  user.profileImage ||
                  "/default-avatar.png";
                const email = userData.email || user.email || "No email";
                const fullname = userData.fullname || userData.name || "-";
                const jobTitle = userData.jobTitle || user.jobTitle || "-";
                const role = user.role || "-";
                const status = user.status || "pending";

                return (
                  <div
                    key={user._id || index}
                    className="grid w-full grid-cols-[20px_50px_2fr_2.5fr_2fr_1fr_1fr_0.7fr] items-center gap-5 border-b border-gray-300 px-4 py-3 text-sm font-[300] text-gray-800"
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user._id)}
                        onChange={(e) => handleSelectUser(e, user._id)}
                        className="h-4 w-4"
                      />
                    </div>
                    <div className="">{startIndex + index + 1}</div>
                    <div className="flex flex-row items-center gap-2">
                      <img
                        src={imageSrc}
                        alt="User"
                        className="h-7 w-7 rounded-full object-cover"
                      />
                      {fullname}
                    </div>
                    <div>{email}</div>
                    <div>{jobTitle}</div>
                    <div>{role}</div>
                    <div>
                      <div
                        className={`flex w-[70px] flex-row items-center justify-center gap-1 rounded-sm py-1 ${
                          status.toLowerCase() === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        <div
                          className={`h-2 w-2 rounded-full ${
                            status.toLowerCase() === "active"
                              ? "bg-green-800"
                              : "bg-gray-500"
                          }`}
                        ></div>
                        {status}
                      </div>
                    </div>
                    <div className="flex items-center justify-center">
                      <FontAwesomeIcon
                        icon={faEllipsisVertical}
                        className="rounded-md px-3 py-2 hover:bg-gray-200"
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex h-40 w-full items-center justify-center border-b border-gray-300 px-4 py-3 text-gray-500">
                No members match your search criteria
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between px-4 py-3">
              {/* Showing x of y */}
              <div className="text-sm text-gray-600">
                {totalItems > 0 ? (
                  <>
                    Showing {Math.min(startIndex + 1, totalItems)} to{" "}
                    {Math.min(startIndex + itemsPerPage, totalItems)} of{" "}
                    {totalItems}
                  </>
                ) : (
                  "No results"
                )}
              </div>

              {/* Pagination */}
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="rounded-md bg-gray-200 px-3 py-1 hover:bg-gray-300 disabled:opacity-50"
                >
                  Prev
                </button>
                <span>
                  {currentPage} / {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages || totalItems === 0}
                  className="rounded-md bg-gray-200 px-3 py-1 hover:bg-gray-300 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        ) : (
          <Loader loaderSize={50} />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
