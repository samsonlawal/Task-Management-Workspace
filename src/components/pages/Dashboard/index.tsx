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
import Notification from "@/components/reuseables/Notification";

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
      <div className="sticky top-0 w-full bg-[white] dark:bg-[#111]">
        <div className="poppins flex w-full items-center justify-between border-[#565656]/10 py-[7px]">
          <h2 className="text-xl text-[#111] dark:text-white">Dashboard</h2>
          <div className="flex flex-row items-center justify-center gap-3">
            <Notification />
            <CustomSelect
              options={[
                { label: "Samson's", value: "Samson's" },
                { label: "Space's", value: "Space's" },
                { label: "Global", value: "Global" },
              ]}
              placeholder="Samson's"
              // onChange={handleRoleFilterChange}
              // className="w-[110px] bg-[#565656]/10 dark:border-[#565656]/20"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
