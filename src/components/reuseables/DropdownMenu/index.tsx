import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

export default function DropdownMenu() {
  return (
    <Menu>
      <MenuButton>My account</MenuButton>
      <MenuItems anchor="bottom">
        <MenuItem>
          <a className="data-focus:bg-blue-100 block" href="/settings">
            Settings
          </a>
        </MenuItem>
        <MenuItem>
          <a className="data-focus:bg-blue-100 block" href="/support">
            Support
          </a>
        </MenuItem>
        <MenuItem>
          <a className="data-focus:bg-blue-100 block" href="/license">
            License
          </a>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}
