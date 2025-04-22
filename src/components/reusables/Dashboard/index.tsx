"use client";

import { useState } from "react";
import dummyUser from "@/lib/dummyUsers";
import dummyUsers from "@/lib/dummyUsers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faChevronDown,
  faEllipsisVertical,
  faListUl,
  faMagnifyingGlass,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import AddMember from "../Dialogs/AddMember";
import { CustomSelect } from "../select";

function Dashboard() {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const [statusFilter, setStatusFilter] = useState("All");

  const [search, setSearch] = useState("");

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentPageUserIds = currentItems.map((user) => user.id);
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

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const filteredUsers = dummyUsers.filter((user) => {
    const matchesSearch =
      user.fullname.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.jobTitle.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || user.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Calculate the range of items to display
  const totalItems = dummyUsers.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredUsers.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  // Pagination logic
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex h-fit w-full flex-col gap-2 px-8 transition-all duration-300">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-4">
          {/* <FontAwesomeIcon icon={faArrowLeft} /> */}
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
                <FontAwesomeIcon icon={faMagnifyingGlass} />{" "}
              </div>

              {/* Clear button */}
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <FontAwesomeIcon icon={faXmark} />{" "}
                </button>
              )}
            </div>
          </div>

          <CustomSelect
            // label="Role"
            options={[
              { label: "All", value: "All" },
              { label: "Active", value: "Active" },
              { label: "Pending", value: "Pending" },
            ]}
            placeholder="Filter"
            onChange={handleStatusFilterChange}
          />
        </div>

        <div className="flex w-fit flex-row gap-5">
          <AddMember />
          {/* <FontAwesomeIcon icon={faChevronDown} />
          </button> */}
        </div>
      </div>
      {/* Table */}
      <div className="h-full w-[100%] rounded-[8px] border border-gray-300 shadow-sm">
        <div className="h-full w-full rounded-[8px]">
          {/* Header */}
          <div className="grid h-[50px] w-full grid-cols-[20px_50px_2fr_2.5fr_2fr_1fr_1fr_0.7fr] items-center justify-center gap-5 rounded-[8px] bg-gray-100 px-4 text-sm font-medium text-gray-600">
            <div className="flex items-center justify-center">
              <input
                type="checkbox"
                checked={currentItems.every((user) =>
                  selectedUsers.includes(user.id),
                )}
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
          {currentItems.map((dummyUser, index) => (
            <div
              key={index}
              className="grid w-full grid-cols-[20px_50px_2fr_2.5fr_2fr_1fr_1fr_0.7fr] items-center gap-5 border-b border-gray-300 px-4 py-3 text-sm text-gray-800"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(dummyUser.id)}
                  onChange={(e) => handleSelectUser(e, dummyUser.id)}
                  className="h-4 w-4"
                />
              </div>
              <div className="">{index + 1}</div>
              <div className="flex flex-row items-center gap-2">
                <img
                  src={dummyUser.image}
                  alt="User"
                  className="h-7 w-7 rounded-full object-cover"
                />
                {dummyUser.fullname}
              </div>
              <div>{dummyUser.email}</div>
              <div>{dummyUser.jobTitle}</div>
              <div>{dummyUser.role}</div>
              <div>
                <div
                  className={`flex w-fit flex-row items-center gap-1 rounded-md px-1.5 py-1 ${dummyUser.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-200 text-gray-600"}`}
                >
                  <div
                    className={`h-2 w-2 rounded-full ${dummyUser.status === "Active" ? "bg-green-800" : "bg-gray-500"}`}
                  ></div>
                  {dummyUser.status}
                </div>
              </div>
              <div className="flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faEllipsisVertical}
                  className="rounded-md px-3 py-2 hover:bg-gray-200"
                />
              </div>
            </div>
          ))}
          {/* Footer */}
          <div className="flex items-center justify-between px-4 py-3">
            {/* Showing x of y */}
            <div className="text-sm text-gray-600">
              Showing {startIndex + 1} to{" "}
              {Math.min(startIndex + itemsPerPage, totalItems)} of {totalItems}
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
                disabled={currentPage === totalPages}
                className="rounded-md bg-gray-200 px-3 py-1 hover:bg-gray-300 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
