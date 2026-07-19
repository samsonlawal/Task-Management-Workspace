import { useState, useEffect } from "react";
import { Menu, MenuButton, MenuItem, MenuItems, DialogTitle } from "@headlessui/react";
import { EllipsisVertical, Trash, Edit, AlignLeft, CheckCircle2, ArrowLeft } from "lucide-react";
import { useUpdateTask, useGetTasks } from "@/hooks/api/tasks";
import { showErrorToast, showSuccessToast } from "@/utils/toaster";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function TaskDetailsHeader({
  taskData,
  handleDeleteTask,
  handleMarkAsDone,
  handleDialogClose,
  markAsDoneLoading,
}: {
  taskData: any;
  handleDeleteTask: () => void;
  handleMarkAsDone: () => void;
  handleDialogClose: () => void;
  markAsDoneLoading: boolean;
}) {
  const { user } = useSelector((state: RootState) => state.auth) as { user: any };
  const { onUpdateTask } = useUpdateTask();
  const { onGetTasks } = useGetTasks();

  const [title, setTitle] = useState(taskData?.title || "");
  const [description, setDescription] = useState(taskData?.description || "");

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [tempTitle, setTempTitle] = useState(taskData?.title || "");

  const [isEditingDesc, setIsEditingDesc] = useState(false);
  const [tempDesc, setTempDesc] = useState(taskData?.description || "");

  useEffect(() => {
    setTitle(taskData?.title || "");
    setDescription(taskData?.description || "");
    setTempTitle(taskData?.title || "");
    setTempDesc(taskData?.description || "");
  }, [taskData]);

  const handleSaveTitle = (newTitle: string) => {
    if (!newTitle.trim()) {
      showErrorToast({ message: "Task title cannot be empty." });
      setTempTitle(title);
      return;
    }
    if (newTitle === title) return;

    onUpdateTask({
      id: taskData.id,
      payload: {
        title: newTitle,
        description: description,
        workspace_id: taskData.workspaceId || "",
        assignee: (taskData.assignee as any)?._id || "",
        deadline: taskData.deadline || "",
        status: taskData.status,
        priority: taskData.priority,
        createdBy: (taskData as any).createdBy || user?._id || "",
      },
      successCallback: () => {
        setTitle(newTitle);
        showSuccessToast({ message: "Task title updated!" });
        onGetTasks({ workspaceId: taskData.workspaceId || "" });
      },
    });
  };

  const handleSaveDesc = (newDesc: string) => {
    if (newDesc === description) return;

    onUpdateTask({
      id: taskData.id,
      payload: {
        title: title,
        description: newDesc,
        workspace_id: taskData.workspaceId || "",
        assignee: (taskData.assignee as any)?._id || "",
        deadline: taskData.deadline || "",
        status: taskData.status,
        priority: taskData.priority,
        createdBy: (taskData as any).createdBy || user?._id || "",
      },
      successCallback: () => {
        setDescription(newDesc);
        showSuccessToast({ message: "Task description updated!" });
        onGetTasks({ workspaceId: taskData.workspaceId || "" });
      },
    });
  };

  return (
    <div className="flex flex-col w-full pb-4 border-b border-[#565656]/10 gap-4">
      {/* Top Row: Breadcrumbs and Dropdown Menu */}
      <div className="flex w-full flex-row items-center justify-between">
        {/* Breadcrumbs path */}
        <div className="flex flex-row items-center gap-1.5 text-[11px] text-zinc-500 select-none">
          <button
            onClick={handleDialogClose}
            className="flex flex-row items-center gap-1 text-zinc-500 dark:text-white hover:text-black dark:hover:text-zinc-200 font-medium transition-colors"
          >
            <ArrowLeft size={11} strokeWidth={2.5} className="text-zinc-500 dark:text-white" />
            <span>{taskData.workspaceName || "Workspace"}</span>
          </button>
          <span className="text-zinc-400 dark:text-white">{" > "}</span>
          <span className="font-semibold text-zinc-700 dark:text-zinc-300">
            STK-{taskData.id.slice(-4).toUpperCase()}
          </span>
        </div>

        {/* Options Ellipsis menu */}
        <Menu as="div" className="relative inline-block text-left">
          <MenuButton className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-zinc-800 text-zinc-500 hover:text-black dark:hover:text-white transition-colors outline-none">
            <EllipsisVertical size={14} />
          </MenuButton>

          <MenuItems className="absolute right-0 mt-1 w-48 origin-top-right rounded-md bg-white p-1 shadow-lg border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900 outline-none z-50">
            <div className="py-0.5">
              <MenuItem>
                {({ active }) => (
                  <button
                    onClick={() => {
                      setTempTitle(title);
                      setIsEditingTitle(true);
                    }}
                    className={`flex w-full items-center gap-2 rounded px-2 py-1.5 text-xs text-zinc-700 dark:text-zinc-300 transition-colors ${
                      active ? "bg-zinc-100 dark:bg-zinc-800" : ""
                    }`}
                  >
                    <Edit size={12} />
                    <span>Edit Title</span>
                  </button>
                )}
              </MenuItem>
              
              <MenuItem>
                {({ active }) => (
                  <button
                    onClick={() => {
                      setTempDesc(description);
                      setIsEditingDesc(true);
                    }}
                    className={`flex w-full items-center gap-2 rounded px-2 py-1.5 text-xs text-zinc-700 dark:text-zinc-300 transition-colors ${
                      active ? "bg-zinc-100 dark:bg-zinc-800" : ""
                    }`}
                  >
                    <AlignLeft size={12} />
                    <span>Edit Description</span>
                  </button>
                )}
              </MenuItem>

              <MenuItem>
                {({ active }) => (
                  <button
                    onClick={handleMarkAsDone}
                    disabled={markAsDoneLoading}
                    className={`flex w-full items-center gap-2 rounded px-2 py-1.5 text-xs text-zinc-700 dark:text-zinc-300 transition-colors ${
                      active ? "bg-zinc-100 dark:bg-zinc-800" : ""
                    }`}
                  >
                    <CheckCircle2 size={12} />
                    <span>Mark as Done</span>
                  </button>
                )}
              </MenuItem>

              <div className="my-1 border-t border-zinc-150 dark:border-zinc-800" />

              <MenuItem>
                {({ active }) => (
                  <button
                    onClick={handleDeleteTask}
                    className={`flex w-full items-center gap-2 rounded px-2 py-1.5 text-xs text-red-600 transition-colors ${
                      active ? "bg-red-50 dark:bg-red-950/20" : ""
                    }`}
                  >
                    <Trash size={12} />
                    <span>Delete Task</span>
                  </button>
                )}
              </MenuItem>
            </div>
          </MenuItems>
        </Menu>
      </div>

      {/* Task Name and Description inputs */}
      <div className="flex w-full flex-col items-start gap-1">
        {isEditingTitle ? (
          <input
            type="text"
            value={tempTitle}
            onChange={(e) => setTempTitle(e.target.value)}
            onBlur={() => {
              setIsEditingTitle(false);
              handleSaveTitle(tempTitle);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setIsEditingTitle(false);
                handleSaveTitle(tempTitle);
              } else if (e.key === "Escape") {
                setTempTitle(title);
                setIsEditingTitle(false);
              }
            }}
            autoFocus
            className="poppins-medium text-[16px] text-zinc-900 dark:text-white bg-transparent border-none outline-none w-full p-0 m-0 focus:ring-0 focus:outline-none"
          />
        ) : (
          <DialogTitle
            onClick={() => {
              setTempTitle(title);
              setIsEditingTitle(true);
            }}
            className="poppins-medium line-clamp-1 text-[16px] text-zinc-900 dark:text-white hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 px-1 -mx-1 rounded cursor-pointer transition-colors w-full"
          >
            {title || "No Title"}
          </DialogTitle>
        )}

        {isEditingDesc ? (
          <textarea
            value={tempDesc}
            onChange={(e) => setTempDesc(e.target.value)}
            onBlur={() => {
              setIsEditingDesc(false);
              handleSaveDesc(tempDesc);
            }}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setTempDesc(description);
                setIsEditingDesc(false);
              }
            }}
            autoFocus
            rows={3}
            className="w-full poppins-regular text-zinc-600 dark:text-zinc-400 text-[13px] bg-transparent border-none outline-none w-full p-0 m-0 mt-1 focus:ring-0 focus:outline-none resize-none"
          />
        ) : (
          <p
            onClick={() => {
              setTempDesc(description);
              setIsEditingDesc(true);
            }}
            className="w-full flex-1 poppins-regular text-zinc-600 dark:text-zinc-400 text-[13px] py-1.5 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 px-1 -mx-1 rounded cursor-pointer transition-colors"
          >
            {description || "Add a description..."}
          </p>
        )}
      </div>
    </div>
  );
}
