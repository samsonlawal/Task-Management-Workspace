import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { UserCog, Ban, Trash2 } from "lucide-react";

interface teamMenuProps {
  onEdit: () => void;
  onSuspend: () => void;
  onDelete: () => void;
}

export default function TeamMenu({
  onEdit,
  onSuspend,
  onDelete,
}: teamMenuProps) {
  return (
    <div className="text-right">
      <Menu>
        <MenuButton className="rounded-md px-3 py-2 text-gray-500 hover:bg-gray-200 focus:outline-none data-[open]:bg-gray-200 dark:hover:bg-[#565656]/20 dark:data-[open]:bg-[#565656]/20">
          <FontAwesomeIcon icon={faEllipsisVertical} />
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className="flex w-[160px] origin-top-right flex-col rounded-xl border-[1px] border-[#565656]/10 bg-white p-1 text-sm text-black shadow-lg transition duration-100 ease-out focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 dark:border-[#565656]/20 dark:bg-[#111] dark:text-white"
        >
          <MenuItem>
            <button
              onClick={onEdit}
              className="group flex w-full items-center gap-2 rounded-lg px-3 py-2 text-gray-700 data-[focus]:bg-[#565656]/10 dark:text-gray-200 dark:data-[focus]:bg-[#565656]/30"
            >
              <UserCog size={16} />
              Edit Role
            </button>
          </MenuItem>
          <MenuItem>
            <button
              onClick={onSuspend}
              className="group flex w-full items-center gap-2 rounded-lg px-3 py-2 text-gray-700 data-[focus]:bg-[#565656]/10 dark:text-gray-200 dark:data-[focus]:bg-[#565656]/30"
            >
              <Ban size={16} />
              Suspend
            </button>
          </MenuItem>
          <div className="my-1 h-px bg-[#565656]/10 dark:bg-[#565656]/30" />
          <MenuItem>
            <button
              onClick={onDelete}
              className="group flex w-full items-center gap-2 rounded-lg px-3 py-2 text-red-600 data-[focus]:bg-red-50 dark:text-red-400 dark:data-[focus]:bg-red-900/20"
            >
              <Trash2 size={16} />
              Remove
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  );
}
