"use client";

import React from "react";
import { X } from "lucide-react";

interface ConnectAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  account: any;
  onConnect: () => void;
}

export default function ConnectAccountModal({ isOpen, onClose, account, onConnect }: ConnectAccountModalProps) {
  if (!isOpen || !account) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm poppins">
      <div className="w-[400px] rounded-xl bg-white p-6 shadow-xl dark:bg-[#111]">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div
              className={`flex h-fit w-fit items-start justify-start rounded-md`}
            >
              {React.cloneElement(account.icon, { size: 18 })}
            </div>

            <div>
              <h3 className="text-sm font-normal text-zinc-900 dark:text-white">
                {account.name} Integration
              </h3>
              {/* <p className="text-[13px] font-regular text-zinc-600 dark:text-[#fff]/70">
            {account.instruction}
          </p> */}
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-600 dark:hover:text-white"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="mt-4">
          {/* <p className="text-[13px] font-regular text-zinc-600 dark:text-[#fff]/70">
            You are about to connect your {account.name} account. This will allow the application to {account.description.toLowerCase()}
          </p> */}

               <p className="text-[12px] font-regular text-zinc-600 tracking-[.1px] dark:text-[#fff]">
            {account.instruction}
          </p>

          {account.features && account.features.length > 0 && (
            <ul className="mt-2 flex flex-col gap-2 pl-1">
              {account.features.map((feature: string, index: number) => (
                <li key={index} className="flex items-center gap-2 text-[12px] font-regular tracking-wider text-zinc-700 dark:text-[#fff]/60">
                  {/* <div className="h-1 w-1 rounded-full bg-zinc-400 dark:bg-[#565656]"></div> */}
                  -{" "}{feature}
                </li>
              ))}
            </ul>
          )}
        </div>
        
        <div className="mt-6 flex w-full justify-end gap-3">
          <button
            onClick={() => {
               onConnect();
            }}
            className="rounded-md w-full bg-white px-2 py-1.5 text-[11px] text-white hover:bg-white/70 dark:text-[#111] font-medium transition-colors"
          >
            Connect Account
          </button>
        </div>
      </div>
    </div>
  );
}
