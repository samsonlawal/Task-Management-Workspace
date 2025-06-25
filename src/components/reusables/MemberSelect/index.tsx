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

export default function MemberSelect({ setTaskAssignee, value }: any) {
  const WorkspaceData = useSelector((state: RootState) => state.WorkspaceData);
  const MemberData = useSelector((state: RootState) => state.MemberData);

  const [selectedMember, setSelectedMember] = useState<any | null>(null);

  useEffect(() => {
    // When value (assigneeId) changes, update selectedMember
    if (value && MemberData) {
      const found = MemberData?.members?.find(
        (m: any) => (m.userId?._id || m._id) === value,
      );
      setSelectedMember(found || null);
    } else {
      setSelectedMember(null);
    }
  }, [value, MemberData]);

  let members = MemberData?.members;

  useEffect(() => {
    // console.log(selectedMember);
    setTaskAssignee(selectedMember?.userId?._id);
  }, [selectedMember, setTaskAssignee]);

  return (
    <Listbox value={selectedMember} onChange={setSelectedMember}>
      <div className="relative w-52">
        <ListboxButton className="flex h-[40px] w-full items-center gap-3 rounded-md border border-gray-300 px-3 py-2 text-left shadow-none">
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
              <div className="flex flex-1 flex-col">
                {/* <span className="text-sm font-medium">
                  {selectedMember.name}
                </span> */}
                <span className="w-[95%] overflow-hidden text-ellipsis text-xs text-black">
                  {selectedMember.userId
                    ? selectedMember.userId.email
                    : selectedMember.email}
                </span>
              </div>
            </>
          ) : (
            <span className="flex h-[40px] w-full flex-row items-center justify-between border-gray-300 text-xs text-gray-700">
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
              className="flex cursor-pointer items-center gap-3 text-ellipsis rounded-md px-3 py-2 hover:bg-red-200/70"
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
              <div className="flex- flex flex-1">
                {/* <span className="text-sm font-medium">{member.name}</span> */}
                <span className="w-[95%] overflow-hidden text-ellipsis text-xs text-[black]">
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
