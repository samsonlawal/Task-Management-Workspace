import {
  faCalendar,
  faCircleCheck,
  faSpinner,
  faAlignLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCircleCheck as faRegularCircleCheck,
} from "@fortawesome/free-regular-svg-icons";
import React from "react";

const ListHeader = () => (
  <div className="flex min-h-fit w-full flex-row justify-between rounded-sm bg-[#eee] px-3 py-3 text-[14px] font-medium text-[#787878] dark:bg-[#565656]/10">
    <div className="flex w-[250px] items-center justify-start gap-2">
      <FontAwesomeIcon
        icon={faAlignLeft}
        className="h-3 w-3 text-gray-500 hover:text-gray-700"
      />
      <p className="line-clamp-1 h-fit text-[12px] leading-tight">
        Description
      </p>
    </div>
    <div className="flex w-[100px] items-center justify-start gap-2 text-[#565656]">
      <FontAwesomeIcon
        icon={faSpinner}
        className="h-3 w-3 text-gray-500 hover:text-gray-700"
      />
      <p className="text-[12px]">Status</p>
    </div>
    <div className="flex w-[115px] items-center justify-start gap-2">
      <FontAwesomeIcon
        icon={faUser}
        className="h-3 w-3 text-gray-500 hover:text-gray-700"
      />
      <p className="text-[12px]">Assignee</p>
    </div>
    <div className="flex w-[120px] items-center justify-start gap-2">
      <FontAwesomeIcon
        icon={faCalendar}
        className="h-3 w-3 text-gray-500 hover:text-gray-700"
      />
      <p className="text-center text-[12px]">Deadline</p>
    </div>
    <div className="flex w-[70px] items-center justify-start">
      <div
        className={`flex h-fit w-fit flex-row items-center justify-center gap-2 rounded-[6px]`}
      >
        <FontAwesomeIcon
          icon={faRegularCircleCheck}
          className="h-3 w-3 text-gray-500 hover:text-gray-700"
        />
        <p className={`text-[12px]`}>Priority</p>
      </div>
    </div>
    <div className="flex w-[70px] items-center justify-start gap-2">
      <FontAwesomeIcon
        icon={faRegularCircleCheck}
        className="h-3 w-3 text-gray-500 hover:text-gray-700"
      />
      <p className="cursor-pointer text-center text-[12px]">Actions</p>
    </div>
  </div>
);

export default ListHeader;
