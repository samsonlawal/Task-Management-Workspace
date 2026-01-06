import Link from "next/link";

export default function Brand() {
  return (
    <div className="flex flex-row items-center">
      {/* <img src="/icons/new-logo2.svg" alt="" className="h-10 w-10" /> */}
      <img src="/icons/leest.svg" alt="" className="h-10 w-10" />

      <Link href="/" className="poppins text-[18px] font-medium text-white">
        TaskStackhq
      </Link>
    </div>
  );
}
