import Link from "next/link";
import { useTheme } from "next-themes";

export default function Brand() {
  const { resolvedTheme } = useTheme();

  return (
    <div className="flex flex-row items-center gap-1">
      {/* <img src="/icons/new-logo2.svg" alt="" className="h-10 w-10" /> */}
      <img
        src={
          resolvedTheme === "light" ? "/icons/poly-dark.svg" : "/icons/poly.svg"
        }
        alt=""
        className="h-7 w-7"
      />

      <Link
        href="/"
        className="poppins text-[16px] font-medium text-[#111] dark:text-white"
      >
        TaskStackhq
      </Link>
    </div>
  );
}
