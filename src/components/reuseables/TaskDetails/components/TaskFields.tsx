"use client";

import { useState } from "react";
import { StatusPill, PriorityPill, AssigneePill, DueDatePill, AttachmentPill } from "@/components/reuseables/TaskPills";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useUpdateTaskMutation } from "@/redux/api/taskApiSlice";
import { useGetMembersQuery } from "@/redux/api/memberApiSlice";

import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ArrowDownToLine, X } from "lucide-react";

import { useParams } from "next/navigation";
import { showSuccessToast, showErrorToast } from "@/utils/toaster";

export default function TaskFields({ taskData }: { taskData: any }) {
  const [updateTask] = useUpdateTaskMutation();
  const params = useParams();
  const workspaceSlug = params.workspaceSlug as string;

  const [files, setFiles] = useState<File[]>([]);
  
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

  const { user } = useSelector((state: RootState) => state.auth) as {
    user: any;
  };
  
  const { currentWorkspaceId } = useSelector(
    (state: any) => state.currentWorkspace,
  );

  const { data: membersData } = useGetMembersQuery(
    { workspaceId: currentWorkspaceId },
    { skip: !currentWorkspaceId },
  );

  const members =
    membersData?.members ||
    membersData?.data ||
    (Array.isArray(membersData) ? membersData : []);

  const uploadAttachments = async (filesToUpload: File[]) => {
      const formData = new FormData()

      filesToUpload.forEach((file) => {
        formData.append("attachments", file)
      })

      try{
        await updateTask({
          taskId: taskData.id,
          task: formData,
          workspaceSlug: workspaceSlug,
        }).unwrap()

        setFiles([])
        console.log(files)

        showSuccessToast({ message: "Attachments uploaded successfully"})
      }
      catch(err: any){
        showErrorToast({
          message: err?.data?.message || "Failed to upload attachments",
        });
      }
    }

  const handleUpdateField = async (updatedFields: Partial<any>) => {
    try {
      await updateTask({
        taskId: taskData.id,
        task: updatedFields,
        workspaceSlug: workspaceSlug,
      }).unwrap();
    } catch (err: any) {
      // Reverts silently based on taskApiSlice logic
    }
  };

  // console.log(members)

  return (
    <div className="poppins w-full">

      {files.length > 0 && (
                     <div className="w-full  md:w-[500px] max-h-[200px] overflow-y-scroll flex flex-col gap-2 py-2">
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

      
      <div className="flex flex-row flex-wrap items-center gap-1 pt-1">
        <StatusPill status={taskData.status} onChange={(s) => handleUpdateField({ status: s })} />
        <PriorityPill priority={taskData.priority} onChange={(p) => handleUpdateField({ priority: p })} />
        <AssigneePill assigneeObj={taskData.assignee} members={members} onChange={(a) => handleUpdateField({ assignee: a })} />
        <DueDatePill deadline={taskData.deadline} onChange={(d) => handleUpdateField({ deadline: d })} />
        <AttachmentPill onUpload={uploadAttachments} setFiles={setFiles} />
      </div>
      {/* {files.length !== 0 && (
        <div>
          {files.map((file) => (
            <div key={file.name}>
              <span>{file.name}</span>
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
}
