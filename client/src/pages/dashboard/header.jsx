import {
  MdMenuOpen,
  MdNotifications,
  MdOutlineArrowDropDown,
} from "react-icons/md";

import { Avatar } from "@/components";

export const Header = () => {
  return (
    <header className="flex items-center justify-between border-b-1 p-5 text-npa-neutral-400">
      <button type="button">
        <MdMenuOpen className="h-8 w-8 duration-200 hover:text-npa-neutral-500" />
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
