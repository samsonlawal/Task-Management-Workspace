export default function HowItWorks() {
  return (
    <div className="poppins flex min-h-fit w-full flex-col gap-[60px] py-[100px]">
      <div className="poppins flex h-fit w-full flex-col gap-3 md:gap-[8px]">
        <span className="flex w-fit items-center gap-2 rounded-full border border-[#565656]/20 bg-[#565656]/10 px-[14px] py-[7px] text-[12px] font-regular text-white transition-colors duration-300 hover:bg-[#565656]/20">
          How It Works
        </span>
        <div className="flex flex-col gap-2">
          <h1 className="text-[23px] leading-[1.2] text-[#fff] md:w-[630px] md:text-[34px]">
            Get your team set up in minutes and start managing tasks
            effortlessly
          </h1>
          <p className="text-[15px] text-[#fff]/30">
            Set up a workspace, invite your team, and start tracking work in
            minutes.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-6 md:flex-row">
        <div className="flex w-full flex-col items-center gap-4 rounded-[24px] border border-[#565656]/10 bg-[#1a1a1a] px-[24px] py-[32px] md:w-1/3">
          <img src="/icons/create-workspace.svg" alt="" />
          <div className="flex flex-col gap-1">
            <h3 className="text-[16px] leading-[1.4] text-[#fff]">
              Create Workspace
            </h3>
            <p className="w-fit text-[13px] font-regular leading-[1.3] text-[#fff]/30">
              Start by creating a workspace for your team or project. This is
              where all tasks, members, and permissions live.
            </p>
          </div>
        </div>

        <div className="flex w-full flex-col items-center gap-4 rounded-[24px] border border-[#565656]/10 bg-[#1a1a1a] p-[24px] md:w-1/3">
          <img src="/icons/invite-members.svg" alt="" />
          <div className="flex flex-col gap-1">
            <h3 className="text-[16px] leading-[1.4] text-[#fff]">
              Invite Members
            </h3>
            <p className="w-fit text-[13px] font-regular leading-[1.3] text-[#fff]/30">
              Add team members and give them the right level of access to your
              workspace for different roles and responsibility.
            </p>
          </div>
        </div>

        <div className="flex w-full flex-col items-center gap-4 rounded-[24px] border border-[#565656]/10 bg-[#1a1a1a] p-[24px] md:w-1/3">
          <img src="/icons/create-task.svg" alt="" />
          <div className="flex flex-col gap-1">
            <h3 className="text-[16px] leading-[1.4] text-[#fff]">
              Create Tasks
            </h3>
            <p className="w-fit text-[13px] font-regular leading-[1.3] text-[#fff]/30">
              Create tasks, assign owners, set deadlines, and track progress so
              everyone knows what needs to be done.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
