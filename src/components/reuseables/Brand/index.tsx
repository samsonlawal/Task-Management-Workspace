import Link from "next/link";
import { useTheme } from "next-themes";

export default function Brand() {
  const { resolvedTheme } = useTheme();

  return (
    <div className="flex flex-row items-center">
      {/* <img src="/icons/new-logo2.svg" alt="" className="h-10 w-10" /> */}
      <img
        src={
          resolvedTheme === "light"
            ? "/icons/logo-dark.svg"
            : "/icons/leest.svg"
        }
        alt=""
        className="h-10 w-10"
      />

      <Link
        href="/"
        className="poppins text-[18px] font-medium text-[#111] dark:text-white"
      >
        TaskStackhq
      </Link>
    </div>
  );
}
