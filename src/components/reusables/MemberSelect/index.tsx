import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const members = [
  {
    id: 1,
    name: "Durward Reynolds",
    email: "durward@example.com",
    image: "https://i.pravatar.cc/100?img=1",
  },
  {
    id: 2,
    name: "Kenton Towne",
    email: "kenton@example.com",
    image: "https://i.pravatar.cc/100?img=2",
  },
  {
    id: 3,
    name: "Therese Wunsch",
    email: "therese@example.com",
    image: "https://i.pravatar.cc/100?img=3",
  },
  {
    id: 4,
    name: "Deji Lawal",
    email: "dejse@example.com",
    image: "https://i.pravatar.cc/100?img=4",
  },
];

export default function MemberSelect({ setTaskAssignee }: any) {
  const WorkspaceData = useSelector((state: RootState) => state.WorkspaceData);
  const MemberData = useSelector((state: RootState) => state.MemberData);

  let members = MemberData?.members;

  const [selectedMember, setSelectedMember] = useState<
    (typeof members)[0] | null
  >(null);

  useEffect(() => {
    // console.log(selectedMember);
    setTaskAssignee(selectedMember?.userId?._id);
  }, [selectedMember]);

  return (
    <Listbox value={selectedMember} onChange={setSelectedMember}>
      <div className="relative w-52">
        <ListboxButton className="flex w-full items-center gap-3 rounded-md border border-gray-400 px-3 py-2 text-left shadow-none">
          {selectedMember ? (
            <>
              <img
                src={
                  selectedMember.userId
                    ? selectedMember.userId.profileImage
                    : selectedMember.profileImage
                }
                alt=""
                className="h-6 w-6 rounded-full object-cover"
              />
              <div className="flex flex-col">
                {/* <span className="text-sm font-medium">
                  {selectedMember.name}
                </span> */}
                <span className="text-xs text-black">
                  {selectedMember.userId
                    ? selectedMember.userId.email
                    : selectedMember.email}
                </span>
              </div>
            </>
          ) : (
            <span className="flex w-full flex-row items-center justify-between border-gray-300 text-sm text-[#444]">
              <p>Assign member</p>
              <FontAwesomeIcon icon={faChevronDown} />
            </span>
          )}
        </ListboxButton>

        <ListboxOptions className="absolute z-10 mt-1 w-full rounded-md border border-gray-300 bg-white p-1">
          {members?.map((member, index) => (
            <ListboxOption
              key={index}
              value={member}
              className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 hover:bg-gray-200/70"
            >
              <img
                src={
                  member.userId
                    ? member.userId.profileImage
                    : member.profileImage
                }
                alt=""
                className="h-6 w-6 rounded-full object-cover"
              />
              <div className="flex flex-col">
                {/* <span className="text-sm font-medium">{member.name}</span> */}
                <span className="text-xs text-[black]">
                  {member.userId ? member.userId.email : member.email}
                </span>
              </div>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
}
