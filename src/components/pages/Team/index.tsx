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
import stringToColor from "@/utils/stringToColor";

function Team() {
  const members = useSelector(
    (state: RootState) => state.MemberData?.members || [],
  );

  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const [imgError, setImgError] = useState(false);

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
      <div className="flex h-fit items-center justify-between pt-6 transition-all duration-300">
        {/* <div className="flex flex-row items-center justify-between"> */}
        <div className="flex flex-row items-center gap-2">
          <div className="flex flex-1 flex-row items-end gap-4">
            {/* search */}
            <div className="relative w-auto flex-1 rounded-md">
              {/* Search input */}
              <input
                type="text"
                placeholder="Search Users"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-md border-[1px] border-[#565656]/20 bg-transparent py-2.5 pl-8 pr-8 text-xs outline-none placeholder:text-[#565656]/80 focus:border-[#565656] dark:text-[#eee]"
              />

              {/* Magnifier icon */}
              <div className="pointer-events-none absolute left-[1px] top-1/2 flex h-[90%] -translate-y-1/2 items-center justify-center rounded-md px-2 text-gray-400">
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="text-[12px] dark:text-[#565656]/80"
                />
              </div>

              {/* Clear button */}
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <FontAwesomeIcon
                    icon={faXmark}
                    className="text-[12px] dark:text-[#565656]/80"
                  />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="flex w-fit flex-row gap-3">
          <CustomSelect
            options={[
              { label: "All", value: "All" },
              { label: "Active", value: "Active" },
              { label: "Pending", value: "invited" },
            ]}
            placeholder="Filter"
            onChange={handleStatusFilterChange}
          />
          <AddMember />
        </div>
      </div>
      {/* Table */}
      <div className="border-gray- h-full w-[100%] rounded-[8px] border shadow-sm dark:border-[#565656]/20">
        {members ? (
          <div className="h-full w-full rounded-[8px]">
            {/* Header */}
            <div className="grid h-[50px] w-full grid-cols-[20px_50px_2fr_2.5fr_1fr_1fr_0.7fr] items-center justify-center gap-5 rounded-t-[8px] bg-gray-100 px-4 text-sm text-gray-600 dark:bg-[#565656]/20 dark:text-[#787878]">
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
              {/* <div>Job Title</div> */}
              <div>Role</div>
              <div>Status</div>
              <div>Actions</div>
            </div>
            <div className="w-full border-b border-gray-300 dark:border-[#565656]/20" />

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
                const fullname = userData.fullname || userData.name || "none";
                const jobTitle = userData.jobTitle || user.jobTitle || null;
                const role = user.role || "-";
                const status = user.status || "pending";

                console.log(fullname);

                return (
                  <div
                    key={user._id || index}
                    className="dark:text=[#eee] grid w-full grid-cols-[20px_50px_2fr_2.5fr_1fr_1fr_0.7fr] items-center gap-5 border-b border-gray-300 px-4 py-3 text-[13px] font-[400] text-gray-800 dark:border-[#565656]/20 dark:text-[#eee]"
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
                          style={{ backgroundColor: stringToColor(fullname) }}
                        >
                          {fullname.charAt(0).toUpperCase()}
                        </div>
                      ) : (
                        <div
                          className="flex h-6 w-6 items-center justify-center rounded-full text-[13px] font-medium text-[#111] dark:text-white"
                          style={{ backgroundColor: stringToColor("pending") }}
                        >
                          {/* {fullname.charAt(0).toUpperCase()} */}
                        </div>
                      )}
                      <p className="truncate">{fullname}</p>
                    </div>
                    <div className="truncate">{email}</div>
                    {/* <div>{jobTitle}</div> */}
                    <div>{role}</div>
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
                      <FontAwesomeIcon
                        icon={faEllipsisVertical}
                        className="rounded-md px-3 py-2 hover:bg-gray-200"
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex h-40 w-full items-center justify-center border-b border-gray-300 px-4 py-3 text-[13px] text-gray-500">
                No member matches your search criteria.
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between px-4 py-3 text-gray-600 dark:text-[#787878]">
              {/* Showing x of y */}
              <div className="text-[12px]">
                {totalItems > 0 ? (
                  <>
                    Showing {Math.min(startIndex + 1, totalItems)} -{" "}
                    {Math.min(startIndex + itemsPerPage, totalItems)} of{"  "}
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

export default Team;
