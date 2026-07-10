import React from "react";
import stringToColor from "@/utils/stringToColor";
import { Bot } from "lucide-react";

interface MessageProps {
  senderName: string;
  senderAvatar?: string;
  content: string;
  timestamp: string;
  isMe?: boolean;
  isBot?: boolean;
  attachedFileName?: string;
}

export const Message: React.FC<MessageProps> = ({
  senderName,
  senderAvatar,
  content,
  timestamp,
  isMe = false,
  isBot = false,
  attachedFileName,
}) => {
  const avatarName = isMe ? "You" : senderName;

  return (
    <div className="flex gap-3 items-start max-w-2xl text-left">
      {/* Avatar */}
      <div className="flex-shrink-0">
        {isBot ? (
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
            <Bot className="w-4 h-4" />
          </span>
        ) : senderAvatar && senderAvatar !== "none" ? (
          <img
            src={senderAvatar}
            alt={senderName}
            className="h-8 w-8 rounded-full object-cover"
          />
        ) : (
          <span
            className="flex h-8 w-8 items-center justify-center rounded-full text-[11px] text-white font-bold"
            style={{ backgroundColor: stringToColor(avatarName) }}
          >
            {avatarName.charAt(0).toUpperCase()}
          </span>
        )}
      </div>

      {/* Message Info and Content */}
      <div className="flex flex-col space-y-1">
        <div className="flex items-baseline gap-2">
          <span className="text-[12px] font-semibold text-[#111] dark:text-white">
            {isMe ? "You" : senderName}
          </span>
          <span className="text-[10px] text-gray-400">{timestamp}</span>
        </div>

        <div
          className={`rounded-[8px] px-3.5 py-2 text-[13px] leading-relaxed select-text ${
            isMe
              ? "bg-zinc-900 text-white border border-zinc-950 dark:bg-zinc-850 dark:border-zinc-700/60 dark:text-zinc-100"
              : "bg-gray-100 text-[#111] dark:bg-zinc-800/80 dark:text-zinc-200"
          }`}
        >
          <p className="whitespace-pre-wrap">{content}</p>
          
          {attachedFileName && (
            <div className="flex w-fit gap-2 items-center bg-black/5 dark:bg-[#111]/40 px-2 py-1.5 rounded-md mt-1.5 border border-[#565656]/10 dark:border-[#565656]/20">
              <p className="text-[11px] text-gray-600 dark:text-[#fff]/70 truncate max-w-[180px]">
                📎 {attachedFileName}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
