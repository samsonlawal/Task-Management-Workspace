"use client";

import { useEffect, useState } from "react";
import { Loader2, ArrowLeft, ArrowDownToLine, X } from "lucide-react";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


// export default function AttachmentPreview({files, setFiles}: {files: File[], setFiles: (files: File[]) => void}) {

export default function AttachmentPreview() {
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

  return (
      <div>
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
      </div>
  )

}