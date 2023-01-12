import {
  MdMenuOpen,
  MdNotifications,
  MdOutlineArrowDropDown,
} from "react-icons/md";

import { Avatar } from "@/components";

export const Header = ({ handleSidebarIsOpen }) => {
  return (
    <header className="sticky top-0 left-0 flex items-center justify-between border-b-1 bg-white p-3 px-5 text-npa-neutral-400 md:p-5">
      <button type="button" onClick={() => handleSidebarIsOpen(true)}>
        <MdMenuOpen className="h-8 w-8 rotate-180 duration-200 hover:text-npa-neutral-500" />
      </button>

      <div className="flex items-center gap-5">
        <button type="button">
          <MdNotifications className="h-8 w-8 duration-200 hover:text-npa-neutral-500" />
        </button>
        <div className="group flex cursor-pointer items-center">
          <Avatar
            src="https://avatars.githubusercontent.com/u/73420137?v=4"
            alt="Avatar User"
            fallback="EK"
          />
          <MdOutlineArrowDropDown className="h-8 w-8 duration-200 group-hover:text-npa-neutral-500" />
        </div>
      </div>
    </header>
  );
};
