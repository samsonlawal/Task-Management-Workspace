import { useState, useEffect } from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  DialogTitle,
} from "@headlessui/react";
import {
  EllipsisVertical,
  Trash,
  Edit,
  AlignLeft,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";
import { showErrorToast, showSuccessToast } from "@/utils/toaster";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

import { useUpdateTaskMutation } from "@/redux/api/taskApiSlice";

export default function TaskDetailsHeader({
  taskData,
  handleDeleteTask,
  handleDialogClose,
}: {
  taskData: any;
  handleDeleteTask: () => void;
  handleDialogClose: () => void;
}) {

  const [updateTask, { isLoading: isUpdatingTitle }] = useUpdateTaskMutation();

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
  }, [taskData?.id]);

  const handleSaveTitle = async (newTitle: string) => {
    if (!newTitle.trim()) {
      showErrorToast({ message: "Task title cannot be empty." });
      setTempTitle(title);
      return;
    }
    if (newTitle === title) return;

    const previousTitle = title;
    setTitle(newTitle);

    try {
      await updateTask({
        taskId: taskData.id,
        task: {
          title: newTitle,
        },
      }).unwrap();
      setTitle(newTitle);
      showSuccessToast({ message: "Task title updated!" });
    } catch (err: any) {
      setTitle(previousTitle);
      setTempTitle(previousTitle);
      showErrorToast({
        message: err?.data?.message || "Failed to update title",
      });
    }
  };

  const handleSaveDesc = async (newDesc: string) => {
    if (newDesc === description) return;
    const previousDesc = description;
    setDescription(newDesc);
    try {
      await updateTask({
        taskId: taskData.id,
        task: {
          description: newDesc,
        },
      }).unwrap();
      setDescription(newDesc);
      showSuccessToast({ message: "Task description updated!" });
    } catch (err: any) {
      setDescription(previousDesc);
      setTempDesc(previousDesc);
      showErrorToast({
        message: err?.data?.message || "Failed to update description",
      });
    }
  };

  // console.log(taskData)

  return (
    <div className="flex w-full flex-col gap-4 border-b border-[#565656]/10 pb-4">
      {/* Top Row: Breadcrumbs and Dropdown Menu */}
      <div className="flex w-full flex-row items-center justify-between">
        {/* Breadcrumbs path */}
        <div className="flex select-none flex-row items-center gap-1.5 text-[11px] text-zinc-500">
          <button
            onClick={handleDialogClose}
            className="flex flex-row items-center gap-1 font-medium text-zinc-500 transition-colors hover:text-black dark:text-[#fff]/60 dark:hover:text-[#fff]/80"
          >
            <ArrowLeft
              size={11}
              strokeWidth={2.5}
              className="text-zinc-500 hover:text-black dark:text-[#fff]/60 dark:hover:text-[#fff]/80"
            />
            <span>{taskData.workspaceName || "workspace"}</span>
          </button>
          <span className="text-zinc-400 hover:text-black dark:text-[#fff]/60 dark:hover:text-[#fff]/80">{" > "}</span>
          <span className="font-normal text-zinc-700 hover:text-black dark:text-[#fff]/60 dark:hover:text-[#fff]/80">
            TSK-{taskData.id.slice(-4).toUpperCase()}
          </span>
        </div>

        <Menu as="div" className="relative inline-block text-left">
          <MenuButton className="flex h-7 w-7 items-center justify-center rounded-full text-zinc-500 outline-none transition-colors hover:bg-gray-200 hover:text-black dark:hover:bg-zinc-800 dark:hover:text-white">
            <EllipsisVertical size={14} />
          </MenuButton>

          <MenuItems className="absolute right-0 z-50 mt-1 w-48 origin-top-right rounded-md border border-zinc-200 bg-white p-1 shadow-lg outline-none dark:border-zinc-800 dark:bg-zinc-900">
            <div className="py-0.5">

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
            className="poppins-medium m-0 w-full border-none bg-transparent p-0 text-[16px] text-zinc-900 outline-none focus:outline-none focus:ring-0 dark:text-white"
          />
        ) : (
          <DialogTitle
            onClick={() => {
              setTempTitle(title);
              setIsEditingTitle(true);
            }}
            className="poppins-medium -mx-1 line-clamp-1 w-full cursor-pointer rounded px-1 text-[16px] text-zinc-900 transition-colors  dark:text-white"
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
            className="poppins-regular m-0 mt-1 w-full resize-none border-none bg-transparent p-0 text-[13px] text-zinc-600 outline-none focus:outline-none focus:ring-0 dark:text-zinc-400"
          />
        ) : (
          <p
            onClick={() => {
              setTempDesc(description);
              setIsEditingDesc(true);
            }}
            className="poppins-regular -mx-1 w-full flex-1 cursor-pointer rounded px-1 py-1.5 text-[13px] text-zinc-600 transition-colors dark:text-white/80 placeholder-white/30"
          >
            {description || "Add a description..."}
          </p>
        )}
      </div>
    </div>
  );
}
