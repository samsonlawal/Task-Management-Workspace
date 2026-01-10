import { cn } from "@/lib/utils";
export default function TertiaryButton({
  title,
  height,

  leftIcon,
  leftIconDark,
  leftIconSize,

  fullWidth,

  disabled,
  onClick,

  className,
}: {
  title: string;
  height?: string;

  leftIcon?: string;
  leftIconDark?: string;
  leftIconSize?: string;

  fullWidth?: boolean;

  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;

  className?: string;
}) {
  // HEIGHT
  const height_38_cn = "h-[38px] px-[24px] py-[8px] text-[14px] leading-[22px]";
  const height_48_cn =
    "h-[48px] px-[24px] py-[12px] text-[16px] leading-[24px]";
  const height_56_cn =
    "h-[56px] px-[32px] py-[16px] text-[16px] leading-[24px]";

  const disabled_cn = "cursor-not-allowed";

  return (
    <button
      className={cn(
        "poppins-medium dark:hover-bg-[#565656]/20 flex flex-row items-center gap-1 rounded-[4px] border-[1px] border-[#565656]/10 px-3 py-[6px] text-[12px] text-[#333] transition-all duration-300 hover:bg-[#eee] dark:text-white/50",

        // WIDTH
        fullWidth ? "w-full" : "w-fit",

        // HEIGHT
        height === "38px" ? height_38_cn : null,
        height === "48px" ? height_48_cn : null,
        height === "56px" ? height_56_cn : null,

        disabled ? disabled_cn : null,
        className,
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {leftIcon && leftIcon}
      {title}
    </button>
  );
}
