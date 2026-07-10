import React, { useRef } from "react";
import { Paperclip, Send, Smile } from "lucide-react";

interface MessageBoxProps {
  value: string;
  onChange: (val: string) => void;
  onSend: () => void;
  placeholder?: string;
  selectedFile?: File | null;
  onFileSelect?: (file: File | null) => void;
  isDarkBg?: boolean;
  className?: string;
}

export const MessageBox: React.FC<MessageBoxProps> = ({
  value,
  onChange,
  onSend,
  placeholder = "Write a message...",
  selectedFile = null,
  onFileSelect,
  isDarkBg = false,
  className = "",
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onFileSelect) {
      onFileSelect(file);
    }
  };

  const handleRemoveFile = () => {
    if (onFileSelect) {
      onFileSelect(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {/* File Attachment Tag Indicator */}
      {selectedFile && (
        <div className="flex w-fit gap-2 items-center bg-gray-500/10 dark:bg-gray-700/25 px-2 py-1 rounded-md mb-2 border border-[#565656]/10 dark:border-[#565656]/20">
          <p className="text-[11px] text-[#707070] dark:text-[#fff]/70 truncate max-w-[200px]">
            📎 {selectedFile.name}
          </p>
          <button
            onClick={handleRemoveFile}
            className="text-[#707070] dark:text-[#fff]/50 hover:text-red-500 dark:hover:text-red-400 text-[10px] px-1 transition-colors"
          >
            ✕
          </button>
        </div>
      )}

      {/* Input Form Wrapper */}
      <div
        className={`relative flex items-end rounded-lg border border-[#565656]/20 bg-gray-50/50 p-2 dark:border-[#565656]/20 ${
          isDarkBg ? "dark:bg-[#111]" : "dark:bg-[#161616]/40"
        }`}
      >
        {/* Attachment Pin Button */}
        {onFileSelect && (
          <>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 text-gray-400 hover:text-[#111] dark:hover:text-white transition-colors cursor-pointer"
            >
              <Paperclip className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Text Area Input */}
        <textarea
          rows={1}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent px-3 py-1.5 text-[13px] placeholder-gray-400 focus:outline-none dark:text-white resize-none scrollbar-hide max-h-[120px]"
          style={{ height: "auto" }}
        />

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5">
          <button className="p-2 text-gray-400 hover:text-[#111] dark:hover:text-white transition-colors">
            <Smile className="w-4 h-4" />
          </button>
          <button
            onClick={onSend}
            className="p-2 bg-[#111] dark:bg-white text-white dark:text-[#111] rounded-md hover:opacity-95 transition-opacity cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
