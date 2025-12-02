"use client";

import { useRouter } from "next/navigation";

function Profile() {
  const router = useRouter();

  function handleRoute() {
    router.push("/workspaces");
  }

  return (
    <>
      <div>My Profile</div>
      <button
        onClick={() => handleRoute()}
        className="flex h-10 w-fit items-center justify-center gap-2 rounded-[5px] bg-[#242424] px-3 font-madei text-[14px] font-regular text-white transition-all duration-300 hover:bg-black"
      >
        {/* <FontAwesomeIcon icon={faListCheck} /> */}
        {/* <FontAwesomeIcon icon={faPlus} /> */}
        View Workspaces
      </button>
    </>
  );
}

export default Profile;
