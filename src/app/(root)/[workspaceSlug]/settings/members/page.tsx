"use client";

import Team from "@/components/pages/Team";

export default function MembersSettingsPage() {
  return (
    <div className="flex w-full flex-col gap-6 pt-6 pb-20">
      <div>
        <h1 className="text-lg font-medium text-zinc-900 dark:text-white">
          Members
        </h1>
        <p className="text-[12px] text-[#565656] dark:text-[#787878] mt-1">
          Manage your workspace members and their roles.
        </p>
      </div>

      <Team hideHeader={true} />
    </div>
  );
}
