import React, { useState } from "react";
import stringToColor from "@/utils/stringToColor";
import { Bot, Reply, Smile, MoreHorizontal,  Pencil, Trash2, Check, X, Trash } from "lucide-react";
interface MessageProps {
  senderName: string;
  senderEmail: string;
  senderAvatar?: string;
  content: string;
  timestamp?: string | null;
  isMe?: boolean;
  isBot?: boolean;
  attachedFileName?: string;
  onReply?: () => void;
  children?: React.ReactNode;
  edited?: boolean;
  onEdit?: (newContent: string) => void;
  onDelete?: () => void;
   loggedInUser: string;
  authorId?: string;

}
export const Message: React.FC<MessageProps> = ({
  senderName,
  senderEmail,
  senderAvatar,
  content,
  timestamp,
  attachedFileName,
  onReply,
  children,
  edited,
  onEdit, 
  onDelete,
  loggedInUser,
  authorId,
}) => {

  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(content);

   return (
    <div className="group relative flex flex-col gap-1 w-full text-left py-2 px-2 rounded-md transition-colors bg-[#565656]/10 hover:bg-[#565656]/10 border-[#565656]/20 border"> 

      {/* Floating Hover Toolbar */}
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 absolute right-2 top-1 z-10 flex items-center gap-0.5 rounded-md border border-zinc-800 bg-zinc-900/95 backdrop-blur-sm px-1 py-0.5 shadow-md">
        {/* <button
          type="button"
          className="p-1 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded transition-colors"
          title="Add reaction"
        >
          <Smile className="w-3.5 h-3.5" />
        </button> */}
        {/* {onReply && (
          <button
            type="button"
            onClick={onReply}
            className="p-1 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded transition-colors"
            title="Reply"
          >
            <Reply className="w-3.5 h-3.5" />
          </button>
        )} */}
        {authorId === loggedInUser && (
          <>
          <button
          type="button"
          className="p-1 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded transition-colors"
          title="More actions"
        >
          <Pencil className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="p-1 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded transition-colors"
          title="More actions"
        >
          <Trash className="w-3.5 h-3.5" />
        </button>
          </>
        )}
      </div>
      {/* Main Comment Row */}
      <div className="flex items-start gap-2.5">
        {/* Avatar */}
        <div className="flex-shrink-0 mt-0.5">
          { senderAvatar && senderAvatar !== "none" ? (
            <img
              src={senderAvatar}
              alt={senderEmail}
              className="h-6 w-6 rounded-full object-cover ring-1 ring-zinc-800"
            />
          ) : (
            <span
              className="flex h-6 w-6 items-center justify-center rounded-full text-[10px] text-white font-semibold"
              style={{ backgroundColor: stringToColor(senderEmail) }}
            >
              {senderEmail.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
        {/* Header & Body Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2">
            <span className="text-[13px] font-normal text-zinc-900 dark:text-zinc-200">
              { senderEmail }
            </span>
            {timestamp && (
              <span className="text-[11px] text-zinc-400 dark:text-zinc-500 font-normal">
                {timestamp}
              </span>
            )}
              {edited && 
                (<span className="text-[11px] text-zinc-400 dark:text-zinc-500 font-normal">
                [edited]
              </span>)
              }
            
          </div>
          {/* Clean borderless comment body */}
          <div className="mt-1 text-[13px] text-zinc-800 dark:text-[#fff]/60 selection:bg-zinc-700">
            <p className="whitespace-pre-wrap select-text">{content}</p>

            {attachedFileName && (
              <div className="flex w-fit gap-2 items-center bg-[#565656]/10 border border-[#565656]/20 px-2 py-1 rounded mt-2">
                <p className="text-[11px] text-zinc-400 truncate max-w-[200px]">
                  📎 {attachedFileName}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
