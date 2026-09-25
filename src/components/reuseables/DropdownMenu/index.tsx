import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Link from "next/link";

export default function DropdownMenu() {
  return (
    <Menu>
      <MenuButton>My account</MenuButton>
      <MenuItems anchor="bottom">
        <MenuItem>
          <Link className="data-focus:bg-blue-100 block" href="/settings">
            Settings
          </Link>
        </MenuItem>
        <MenuItem>
          <Link className="data-focus:bg-blue-100 block" href="/support">
            Support
          </Link>
        </MenuItem>
        <MenuItem>
          <Link className="data-focus:bg-blue-100 block" href="/license">
            License
          </Link>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}
