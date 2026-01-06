export default function Contact() {
  return (
    <div className="poppins flex h-fit w-full flex-col items-center justify-center gap-3 py-[100px] md:gap-[8px]">
      <div className="flex flex-col items-center justify-center gap-6 rounded-[24px] bg-[#1a1a1a] p-[60px] md:flex-row">
        {/* LHS */}
        <div className="poppins flex h-fit w-full flex-col gap-3 md:w-[400px] md:gap-[8px]">
          <div className="flex flex-col gap-2">
            <h1 className="text-[23px] leading-[1.2] text-[#fff] md:text-[34px]">
              Ready to Streamline your workflow?
            </h1>
            <p className="text-[15px] font-regular text-[#fff]/30">
              Set up a workspace, invite your team, and start tracking work in
              minutes.
            </p>
          </div>

          <button className="flex w-fit items-center gap-2 rounded-[4px] border border-[#565656]/20 bg-[#565656]/10 px-[24px] py-[10px] text-[14px] font-regular text-white transition-colors duration-300 hover:bg-[#565656]/20">
            Get Started
            <img
              src="/icons/caret-right.svg"
              alt=""
              className="h-[16px] w-[16px]"
            />
          </button>
        </div>
        {/* RHS */}
        <div className="flex items-start justify-start">
          <img src="/icons/molecules.svg" alt="" />
        </div>
      </div>
    </div>
  );
}
