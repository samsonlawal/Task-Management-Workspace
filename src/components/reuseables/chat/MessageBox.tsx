import React, { useRef } from "react";
import { Loader, Paperclip, Send, Smile } from "lucide-react";

interface MessageBoxProps {
  value: string;
  onChange: (val: string) => void;
  onSend: () => void;
  isSending: boolean;
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
  isSending,
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
      {/* Container with subtle border and focus ring */}
      <div
        className={`flex flex-col rounded-lg border border-[#565656]/20 bg-gray-50/50 transition-all focus-within:border-[#565656]/50 ${ 
          isDarkBg ? "dark:bg-[#111]" : "dark:bg-[#161616]/40"
        }`}
      >
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
        {/* Text Area on Top */}
        <textarea
          rows={2} 
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full bg-transparent px-2 py-2 text-[13px] placeholder-gray-400 focus:outline-none dark:text-white resize-none scrollbar-hide min-h-[44px] max-h-[140px]" 
        />
        {/* Bottom Toolbar */}
        <div className="flex items-center justify-between bg-[#565656]/10 p-1.5 mt-1"> 
          {/* Left Toolbar Icons */}
          <div className="flex items-center gap-1"> 
            {onFileSelect && (
              <>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileChange}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-1.5 text-gray-400 hover:text-[#111] dark:hover:text-white rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer" 
                  title="Attach file"
                >
                  <Paperclip className="w-3.5 h-3.5" />
                </button>
              </>
            )}
            <button
              type="button"
              className="p-1.5 text-gray-400 hover:text-[#111] dark:hover:text-white rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors" 
              title="Add emoji"
            >
              <Smile className="w-3.5 h-3.5" />
            </button>
          </div>
          {/* Right Submit Action */}
          <button
            type="button"
            onClick={onSend}
            disabled={!value.trim() && !selectedFile || isSending}
            className="flex items-center gap-1.5 px-3 py-1 bg-[#000] dark:bg-white text-white dark:text-[#111] text-[12px] font-medium rounded-md hover:opacity-90 disabled:opacity-40 transition-opacity cursor-pointer" 
          >
            {isSending ? (
              <span>Sending...</span>
            ) : (
              <span>Send</span>
            )}
           
              <Send className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
