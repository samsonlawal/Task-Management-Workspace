import { DateTime } from "luxon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faSpinner, faCalendar, faUser } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { getStatusStyles, getPriorityStyles } from "@/utils/taskStyles";

export default function TaskFields({
  taskData,
  demoteLoading,
  promoteLoading,
  markAsDoneLoading,
  handleDemoteTask,
  handlePromoteTask,
  handleMarkAsDone,
}: {
  taskData: any;
  demoteLoading: boolean;
  promoteLoading: boolean;
  markAsDoneLoading: boolean;
  handleDemoteTask: () => void;
  handlePromoteTask: () => void;
  handleMarkAsDone: () => void;
}) {
  const statusDisplay = getStatusStyles(taskData.status);
  const priorityDisplay = getPriorityStyles(taskData.priority);

  return (
    <div className="poppins flex flex-col space-y-5 overflow-y-auto pr-3 flex-none">
      <div className="flex flex-row flex-wrap gap-5 pt-2">
        {/* Created At */}
        <div className="flex flex-row items-center gap-8 w-[300px]">
          <div className="flex w-[90px] items-center justify-start gap-1">
            <FontAwesomeIcon
              icon={faClock}
              className="h-3 w-3 text-gray-500 dark:text-[#787878]"
            />
            <label className="text-[11px] text-gray-500 dark:text-[#787878]">
              Created At:
            </label>
          </div>
          <p className="text-[11px] font-normal text-zinc-900 dark:text-zinc-300">
            {DateTime.fromISO(taskData.createdAt).toFormat(
              "dd MMMM, yyyy. hh:mm a",
            )}
          </p>
        </div>

        {/* Status */}
        <div className="flex flex-row items-center w-[300px] gap-8">
          <div className="flex w-[90px] items-center justify-start gap-1">
            <FontAwesomeIcon
              icon={faSpinner}
              className="h-3 w-3 text-gray-500 dark:text-[#787878]"
            />
            <label className="text-[11px] text-gray-500 dark:text-[#787878]">
              Status:
            </label>
          </div>
          <div
            className={`flex flex-row items-center gap-1 rounded-sm ${statusDisplay.bg} px-1.5 py-0.5`}
          >
            <div
              className={`h-1.5 w-1.5 rounded-full ${statusDisplay.dot}`}
            />
            <p
              className={`text-[11px] font-normal ${statusDisplay.text}`}
            >
              {statusDisplay.label}
            </p>
          </div>
        </div>

        {/* Priority */}
        <div className="flex flex-row items-center w-[300px] gap-8">
          <div className="flex w-[90px] items-center justify-start gap-1">
            <FontAwesomeIcon
              icon={faCircleCheck}
              className="h-3 w-3 text-gray-500 dark:text-[#787878]"
            />
            <label className="text-[11px] text-gray-500 dark:text-[#787878]">
              Priority:
            </label>
          </div>
          <div
            className={`flex flex-row items-center gap-1 rounded-sm ${priorityDisplay.bg} px-1.5 py-0.5`}
          >
            <p
              className={`text-[11px] font-normal ${priorityDisplay.text}`}
            >
              {taskData.priority.charAt(0).toUpperCase() +
                taskData.priority.slice(1).toLowerCase()}
            </p>
          </div>
        </div>

        {/* Due Date */}
        <div className="flex flex-row items-center w-[300px] gap-8">
          <div className="flex w-[90px] items-center justify-start gap-1">
            <FontAwesomeIcon
              icon={faCalendar}
              className="h-3 w-3 text-gray-500 dark:text-[#787878]"
            />
            <label className="text-[11px] text-gray-500 dark:text-[#787878]">
              Due Date:
            </label>
          </div>
          <p className="text-[11px] font-normal text-zinc-900 dark:text-zinc-300">
            {taskData?.deadline ? DateTime.fromISO(taskData?.deadline).toFormat(
              "dd MMMM, yyyy"
            ) : "Not Set"}
          </p>
        </div>

        {/* Assignee */}
        <div className="flex flex-row items-center w-[300px] gap-8">
          <div className="flex w-[90px] items-center justify-start gap-1">
            <FontAwesomeIcon
              icon={faUser}
              className="h-3 w-3 text-gray-500 dark:text-[#787878]"
            />
            <label className="text-[11px] text-gray-500 dark:text-[#787878]">
              Assignee:
            </label>
          </div>
          <div className="flex flex-row items-center justify-center gap-1">
            {taskData.assignee?.image &&
            taskData.assignee?.image !== "none" ? (
              <img
                src={taskData.assignee?.image}
                alt="avatar"
                className="h-5 w-5 rounded-full"
              />
            ) : (
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-500">
                <span className="text-[8px] text-white">
                  {taskData.assignee?.name?.charAt(0).toUpperCase() || "U"}
                </span>
              </div>
            )}
            <p className="text-[11px] font-normal text-zinc-900 dark:text-zinc-300">
              {taskData.assignee?.name || "Unassigned"}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-row items-center gap-8 w-full pt-1">
          <div className="flex w-[90px] items-center justify-start gap-1">
            <FontAwesomeIcon
              icon={faCircleCheck}
              className="h-3 w-3 text-gray-500 dark:text-[#787878]"
            />
            <label className="text-[11px] text-gray-500 dark:text-[#787878]">
              Actions:
            </label>
          </div>
          <div className="flex flex-row items-center justify-center gap-2">
            {/* Demote task */}
            <div className="flex flex-row text-[12px] font-normal">
              <button
                onClick={handleDemoteTask}
                disabled={markAsDoneLoading}
                className="flex h-7 w-7 items-center justify-center rounded-sm bg-slate-300 text-[11px] font-normal text-gray-500 transition-all duration-300 hover:bg-gray-300/70 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:cursor-not-allowed dark:bg-[#565656]/20 dark:text-[#eee] dark:hover:bg-[#565656]/30"
                aria-label="Task options"
              >
                {demoteLoading ? (
                  <img
                    src="/icons/loaderWhite.svg"
                    alt=""
                    className="w-3 animate-spin"
                  />
                ) : (
                  <img src="/icons/btn-left.svg" alt="" />
                )}
              </button>
            </div>

            {/* Mark as done */}
            <button
              onClick={handleMarkAsDone}
              disabled={markAsDoneLoading}
              className="h-7 w-16 rounded-sm bg-slate-300 px-2.5 text-[11px] font-normal text-gray-500 transition-all duration-300 hover:bg-gray-300/70 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:cursor-not-allowed dark:bg-[#565656]/20 dark:text-[#eee] dark:hover:bg-[#565656]/30"
            >
              {markAsDoneLoading ? (
                <img
                  src="/icons/loaderWhite.svg"
                  alt=""
                  className="w-3 animate-spin"
                />
              ) : (
                <p>Done</p>
              )}
            </button>

            {/* Promote Task */}
            <div className="flex flex-row text-[12px] font-normal">
              <button
                onClick={handlePromoteTask}
                disabled={markAsDoneLoading}
                className="flex h-7 w-7 items-center justify-center rounded-sm bg-slate-300 text-[11px] font-normal text-gray-500 transition-all duration-300 hover:bg-gray-300/70 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:cursor-not-allowed dark:bg-[#565656]/20 dark:text-[#eee] dark:hover:bg-[#565656]/30"
                aria-label="Task options"
              >
                {!promoteLoading ? (
                  <img src="/icons/btn-right.svg" alt="" />
                ) : (
                  <img
                    src="/icons/loaderWhite.svg"
                    alt=""
                    className="w-3 animate-spin"
                  />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
