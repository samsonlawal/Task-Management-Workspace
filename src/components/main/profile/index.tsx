"use client";
import { useRouter } from "next/navigation";
import { useUpdateDetails } from "@/hooks/api/account";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { TUser } from "@/types";
import stringToColor from "@/utils/stringToColor";
import UploadImage from "@/components/reuseables/Dialogs/UploadImage";
import { useGetUserProfile } from "@/hooks/api/account";
import data from "@/components/data";

type UserUpdate = {
  username: string;
  email: string;
  fullname: string;
};

function Profile() {
  const router = useRouter();

  const [image, setImage] = useState<string | null>(null);
  const [form, setForm] = useState<UserUpdate>({
    username: "",
    email: "",
    fullname: "",
    // profileImage: "",
  });

  const user = useSelector(
    (state: RootState) => state.auth.user as TUser | undefined,
  );

  const {
    onGetUserProfile,
    data,
    loading: useGetProfileLoading,
  } = useGetUserProfile();
  const { onUpdateDetails, loading: updateLoading } = useUpdateDetails();

  useEffect(() => {
    if (user) {
      onGetUserProfile(user?._id);
    }
  }, [user]);

  useEffect(() => {
    setForm({
      username: data?.username,
      email: data?.email,
      fullname: data?.fullname,
    });
    setImage(data?.profileImage);

    console.log(data);
  }, [data]);

  function handleRoute() {
    router.push("/workspaces");
  }

  const handleSave = () => {
    onUpdateDetails({ payload: form });
  };

  const isDirty =
    data &&
    (form.fullname !== data.fullname ||
      form.username !== data.username ||
      form.email !== data.email);

  if (useGetProfileLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {useGetProfileLoading ? (
        <div className="max-screen-wrapper poppins flex h-fit w-full flex-col items-center justify-center gap-6 overflow-auto bg-[#fff] px-9 pb-24 pt-6 transition-all duration-300 scrollbar-hide dark:bg-[#111]">
          <p>Loading</p>
        </div>
      ) : (
        <div className="max-screen-wrapper poppins flex h-fit w-full flex-col items-center justify-center gap-6 overflow-auto bg-[#fff] px-9 pb-24 pt-6 transition-all duration-300 scrollbar-hide dark:bg-[#111]">
          <div className="flex h-fit w-full flex-col items-center justify-center gap-2 rounded-[14px] border-[1px] border-[#565656]/20 bg-[#fff] transition-all duration-300 dark:bg-[#111] md:w-[700px]">
            <div className="flex w-full flex-row justify-between border-b-[1px] border-[#565656]/20 px-6 py-6 text-left">
              <div className="flex w-fit flex-col justify-start text-left">
                <h1 className="text-[16px]">Profile</h1>
                <p className="text-[12px] text-[#565656] dark:text-[#787878]">
                  Manage settings for your Taskstack profile.
                </p>
              </div>

              <button
                onClick={() => handleRoute()}
                className="h-fit w-fit rounded-md border-[1px] border-[#565656]/60 px-[12px] py-1 text-[11px] font-medium text-[#fff]/50 transition-colors duration-300 hover:border-[#565656]/10 hover:bg-[#565656]/10 hover:text-white/50"
              >
                Workspaces
              </button>
            </div>

            <div className="flex w-full flex-col gap-20 px-6 pt-6">
              <div className="flex flex-col gap-20">
                {/* Actions and data */}
                <div className="flex flex-col gap-[40px] rounded-[14px]">
                  <div className="flex flex-row items-center justify-start gap-4">
                    {image !== null ? (
                      <img
                        src={image}
                        alt="avatar"
                        className="h-[60px] w-[60px] rounded-full text-[12px]"
                      />
                    ) : (
                      <span
                        className="flex h-[60px] w-[60px] items-center justify-center rounded-full border-[1px] border-[#565656]/10 text-[20px]"
                        style={{
                          backgroundColor: stringToColor(form.fullname),
                        }}
                      >
                        {form.fullname?.charAt(0).toUpperCase() || "U"}
                      </span>
                    )}
                    <div className="flex flex-col gap-2">
                      <p className="text-[13px]">Profile Picture</p>
                      <div className="flex flex-row gap-2">
                        <UploadImage />
                        <button className="rounded-md border-[1px] border-[#565656]/60 px-[12px] py-1 text-[11px] font-medium text-[#fff]/50 transition-colors duration-300 hover:border-[#565656]/10 hover:bg-[#565656]/10 hover:text-white/50">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* text */}
                  <div className="flex w-full flex-col gap-6">
                    <div className="flex flex-col gap-1">
                      <h1 className="text-[13px]">Username</h1>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Username"
                          value={form.username}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              username: e.target.value,
                            }))
                          }
                          className={`h-[40px] w-full rounded-[6px] border-[1px] border-[#565656]/70 bg-transparent px-[12px] text-[12px] placeholder:text-[#565656] focus:border-[#fff]/100 focus:outline-none dark:text-[#fff]/80`}
                        />
                      </div>
                      {/* {errors.username && (
                        <p className="text-[11px] text-red-500">
                          {errors.username}
                        </p>
                      )} */}
                    </div>

                    <div className="flex flex-col gap-1">
                      <h1 className="text-[13px]">Full name</h1>
                      <input
                        type="text"
                        placeholder="Full name"
                        value={form.fullname}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            fullname: e.target.value,
                          }))
                        }
                        className="h-[40px] rounded-[6px] border-[1px] border-[#565656]/70 bg-transparent px-[12px] text-[12px] placeholder:text-[#565656] focus:border-[#fff]/100 focus:outline-none dark:text-[#fff]/80"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <h1 className="text-[13px]">Email</h1>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Email"
                          value={form.email}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              email: e.target.value,
                            }))
                          }
                          className={`h-[40px] w-full rounded-[6px] border-[1px] border-[#565656]/70 bg-transparent px-[12px] text-[12px] placeholder:text-[#565656] focus:border-[#fff]/100 focus:outline-none dark:text-[#fff]/80`}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <h1 className="text-[13px]">About</h1>
                      <textarea
                        placeholder="About"
                        className="h-[100px] rounded-[6px] border-[1px] border-[#565656]/70 bg-transparent px-[12px] py-3 text-[12px] placeholder:text-[#565656] focus:border-[#fff]/100 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex w-full items-center justify-end rounded-b-[14px] p-6 dark:bg-[#1a1a1a]">
              <button
                onClick={handleSave}
                disabled={!isDirty || updateLoading}
                className={`rounded-md border-[1px] border-[#565656]/60 px-[12px] py-1 text-[11px] font-medium transition-colors duration-300 hover:border-[#565656]/10 hover:bg-[#565656]/10 hover:text-white/50 ${
                  isDirty
                    ? "bg-[white] text-[#111]"
                    : "cursor-not-allowed bg-[#565656]/10 text-[#fff] opacity-50"
                }`}
              >
                {updateLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>

          {/* Danger */}
          <div className="flex h-fit w-full flex-col items-start justify-center gap-2 rounded-[14px] border-[1px] border-[#565656]/20 bg-[#fff] px-6 py-6 transition-all duration-300 dark:bg-[#111] md:w-[700px]">
            {/* text */}
            <div className="flex flex-col">
              <h1 className="text-[14px] text-[red]">Danger Zone</h1>
              <p className="text-[12px] text-[#565656] dark:text-[#787878]">
                Permanently delete your workspace or remove yourself from it.{" "}
                <span className="text-[#111]">
                  These actions cannot be undone.
                </span>
              </p>
            </div>
            <div className="flex w-full items-center justify-end">
              <button className="rounded-md border-[1px] border-[#565656]/60 px-[12px] py-1 text-[11px] font-medium text-[#fff]/50 transition-colors duration-300 hover:border-[#565656]/10 hover:bg-[#565656]/10 hover:text-white/50">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
