"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import { useEffect, useState } from "react";
import {
  faPlus,
  faXmark,
  faChevronDown,
  faPaperclip,
  faFilePdf,
} from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Loader2, ArrowLeft, ArrowDownToLine, X } from "lucide-react";
import { TAddTask } from "@/types";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { getFromLocalStorage } from "@/utils/localStorage/AsyncStorage";
import { showSuccessToast, showErrorToast } from "@/utils/toaster";
import { getStatusStyles, getPriorityStyles } from "@/utils/taskStyles";
import { DateTime } from "luxon";
import { useCreateTaskMutation } from "@/redux/api/taskApiSlice";
import { useGetMembersQuery } from "@/redux/api/memberApiSlice";
import { AttachmentPill, StatusPill, PriorityPill, AssigneePill, DueDatePill } from "@/components/reuseables/TaskPills";

export default function AddTask() {
  let [isOpen, setIsOpen] = useState<boolean>(false);
  const [workspaceId, setWorkspaceId] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);

  const [task, setTask] = useState<TAddTask>({
    description: "",
    workspace_id: "",
    assignee: "",
    deadline: "",
    status: "to-do",
    priority: "Low",
    createdBy: "",
    title: "",
  });

  // const [draft, setDraft] = useState<Record | any[]>([])

  const workspaceData = useSelector(
    (state: RootState) => state.WorkspaceData?.workspace,
  );

  const user = useSelector((state: RootState) => state.auth?.user);
  const { currentWorkspaceId } = useSelector(
    (state: RootState) => state.currentWorkspace,
  );

  const { data: membersData } = useGetMembersQuery(
    { workspaceId: currentWorkspaceId || "" },
    { skip: !currentWorkspaceId },
  );

  const members =
    membersData?.members ||
    membersData?.data ||
    (Array.isArray(membersData) ? membersData : []);

  useEffect(() => {
    if (currentWorkspaceId) {
      setWorkspaceId(currentWorkspaceId);
      setTask((prevTask) => ({
        ...prevTask,
        workspace_id: currentWorkspaceId,
        createdBy: user?._id || "",
      }));
    }
  }, [isOpen]);

  const [createTask, { isLoading: createTaskLoading }] =
    useCreateTaskMutation();

  const handleDialogClose = () => {
    setTask({
    description: "",
    workspace_id: "",
    assignee: "",
    deadline: "",
    status: "to-do",
    priority: "Low",
    createdBy: "",
    title: "",
  })    
  setIsOpen(false);
  };

  const handleCreateTask = async () => {
    const {
      description,
      workspace_id,
      assignee,
      deadline,
      status,
      priority,
      createdBy,
      title,
    } = task;

    let errorMsg = "";
    if (!title) {
      errorMsg = "Task title is required.";
    }

    if (errorMsg) {
      showErrorToast({ message: errorMsg });
      return;
    }

    try {
      await createTask({
        task: {
          description,
          workspace_id,
          assignee: assignee || undefined,
          deadline,
          status,
          priority,
          createdBy,
          title,
        },
      }).unwrap();

      showSuccessToast({ message: "Task Created Successfully!" });

      setTask({
        description: "",
        workspace_id: workspace_id,
        assignee: assignee || undefined,
        deadline: "",
        status: "to-do",
        priority: "Low",
        createdBy: createdBy,
        title: "",
      });

      handleDialogClose();
    } catch (error: any) {
      console.log(error)
      const message = error?.data?.message || error?.message || "Failed to create task.";
      showErrorToast({ message });
      console.log("Error creating task:", error);
    }
  };

  function checkWsId() {
    setIsOpen(true);
    getFromLocalStorage({
      key: "CurrentWorkspaceId",
      cb: (id: string) => {
        if (id) {
          setWorkspaceId(id);
          setTask((prevTask) => ({
            ...prevTask,
            workspace_id: id,
          }));
        }
      },
    });
  }

  function formatFile(bytes: number) {

    const k = 1024 
    const sizes = ["B", "KB", "MB", "GB", "TB"]

    if(!bytes || bytes === 0){
      return "0 B"
    }
  const i = Math.floor(Math.log(bytes) / Math.log(k))
   return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
    

  }

  function removeFile(indexToRemove: number) {
    setFiles((prev) => prev.filter((_, index) => index !== indexToRemove))
  }


  return (
    <>
      <button
        onClick={checkWsId}
        className="poppins flex h-[32px] w-fit shrink-0 items-center justify-center gap-2 rounded-md bg-[#111] dark:bg-white px-2.5 text-[12px] font-medium shadow-sm transition-all duration-300 dark:hover:bg-zinc-100 hover:bg-[#111]/90 active:scale-95 sm:w-auto"
      >
        {/* <FontAwesomeIcon icon={faPlus} className="text-[10px]" /> */}
        <span className="text-[#fff] dark:text-[#111]">New Task</span>
      </button>

      <Dialog
        open={isOpen}
        onClose={handleDialogClose}
        transition
        className="poppins fixed inset-0 z-50 flex w-screen select-none items-center justify-center bg-black/30 p-4 transition duration-300 ease-out data-[closed]:opacity-0"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30 backdrop-blur-sm" />

        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel
            className="flex w-full max-w-[500px] flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white px-6 py-5 shadow-2xl dark:border-zinc-800 dark:bg-[#1a1a1a]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-4">
              {/* Header: Breadcrumbs & Close Action */}
              <div className="flex w-full flex-row items-center justify-between">
                {/* Breadcrumbs path */}
                <div className="flex select-none flex-row items-center gap-1.5 text-[11px] text-zinc-500">
                  <button
                    onClick={handleDialogClose}
                    className="flex flex-row items-center gap-1 font-normal text-zinc-500 transition-colors hover:text-black dark:text-[#fff]/40 dark:hover:text-[#fff]/80"
                  >
                    {/* <FontAwesomeIcon
                      icon={faChevronLeft}
                      className="mr-0.5 text-[8px]"
                    /> */}
                     <ArrowLeft
                        size={11}
                        strokeWidth={2.5}
                        className="text-zinc-500 hover:text-black dark:text-[#fff]/40 dark:hover:text-[#fff]/80"
                      />
                    <span>{workspaceData?.name || "workspace"}</span>
                  </button>
                  <span className="text-zinc-400 dark:text-[#fff]/40">{" > "}</span>
                  <span className="font-normal text-zinc-700 dark:text-[#fff]/40">
                    New task
                  </span>
                </div>
                <button
                  onClick={handleDialogClose}
                  className="flex h-6 w-6 items-center justify-center rounded-full text-[#989898] transition-colors hover:bg-gray-200 hover:text-black dark:hover:bg-zinc-800 dark:hover:text-white"
                >
                  <FontAwesomeIcon icon={faXmark} className="text-[16px]" />
                </button>
              </div>

              {/* Title & Description Inputs */}
              <div className="flex w-full flex-col items-start gap-1">
                <input
                  type="text"
                  placeholder="Task title"
                  value={task.title}
                  onChange={(e) =>
                    setTask((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  className="poppins-normal m-0 w-full border-none bg-transparent p-0 text-[16px] font-normal text-zinc-900 outline-none focus:outline-none focus:ring-0 dark:text-white hover:text-black dark:text-[#fff]/60 dark:hover:text-[#fff]/80 placeholder-white/70"
                />
                <textarea
                  placeholder="Add a description..."
                  value={task.description}
                  onChange={(e) =>
                    setTask((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="poppins-normal text-zinc-650 m-0 mt-1 h-fit min-h-[20px] w-full resize-none border-none bg-transparent p-0 text-[13px] outline-none focus:outline-none focus:ring-0 dark:text-white/90 placeholder-white/60"
                />
              </div>

              {files.length > 0 && (
                  <div className="w-full md:min-w-[400px] max-h-[200px] overflow-y-scroll flex flex-col gap-2 py-2">
                    {files.map((file, index) => {
                      const isImage = file?.type.startsWith("image/");
                      const isPdf = file?.type === "application/pdf";


                      return(
                        <div key={index}>


                      {isImage && (
                      <div className="group relative">

                      <span className="group-hover:bg-[#565656] group-hover:flex hidden absolute top-4 right-16 p-1.5 rounded-sm transition-all duration-300">
                      <ArrowDownToLine size={18} className="dark:group-hover:text-white dark:text-[#fff]/40" />
                      </span>

                         <button type="button" className="group-hover:bg-[#565656] group-hover:flex hidden absolute top-4 right-8 p-1.5 rounded-sm transition-all duration-300" onClick={() => removeFile(index)}>
                          <X size={12} className="dark:group-hover:text-white dark:text-[#fff]/40" />
                        </button>

                      <img src={URL.createObjectURL(file)} alt="" className="min-w-[400px] h-auto object-cover" />
                    </div>
                    )}

                    {isPdf && (
                    <div className="relative group flex flex-row items-center gap-2 px-3 py-2 bg-[#565656]/20 rounded-md w-[96%]">

                       <button type="button" className="group-hover:bg-[#565656] group-hover:flex hidden absolute -top-2 -right-2 p-1 rounded-full transition-all duration-300" onClick={() => removeFile(index)}>
                      <X size={10} className="dark:group-hover:text-white dark:text-[#fff]/40" />
                      </button>

                      <FontAwesomeIcon icon={faFilePdf} className="text-zinc-500 dark:text-[#fff]/40" />


                      <div className="flex flex-1 items-center flex-row justify-start gap-[6px]">
                        <p className="text-[13px]">{file.name}</p>  
                        <p className="text-[11px] text-[#fff]/50">
                        
                        {`${formatFile(file.size)}`}

                          </p>    
                      </div>

                      <span className="group hover:bg-[#565656]/30 p-1.5 rounded-sm transition-all duration-300">
                          <ArrowDownToLine size={18} className="dark:text-[#fff]/40" />
                        </span>
                    </div>
                    )}


                        </div>
                      )
                    })}
                    {/* <p className="text-[12px] text-white">{files.name}</p> */}
                   
                  </div>
                )}

              {/* Wrapped horizontal pills list for properties */}
              <div className="poppins w-full">
                <div className="flex flex-row flex-wrap items-center gap-1">
                  <StatusPill status={task.status} onChange={(s) => setTask((prev) => ({ ...prev, status: s }))} />
                  <PriorityPill priority={task.priority} onChange={(p) => setTask((prev) => ({ ...prev, priority: p }))} />
                  <AssigneePill assigneeId={task.assignee} members={members} onChange={(a) => setTask((prev) => ({ ...prev, assignee: a }))} />
                  <DueDatePill deadline={task.deadline} onChange={(d) => setTask((prev) => ({ ...prev, deadline: d }))} />
                  <AttachmentPill setFiles={setFiles} />
                </div>

                
              </div>

              {/* Bottom Actions Row (border-t removed) */}
              <div className="mt-5 flex justify-end gap-3">
                <button
                  onClick={handleCreateTask}
                  disabled={createTaskLoading}
                  className="flex items-center gap-1.5 rounded-md border border-gray-200 bg-white px-4 py-1.5 text-xs font-medium text-zinc-900 shadow-sm transition-all hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none"
                >
                  {createTaskLoading ? (
                    <>
                      <span>Creating</span>
                      <Loader2 className="h-3.5 w-3.5 animate-spin text-zinc-900" />
                    </>
                  ) : (
                    <span>Create Task</span>
                  )}
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
