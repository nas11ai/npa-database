import classNames from "classnames";
import Image from "next/image";
import { MdMenuOpen } from "react-icons/md";

import npaLogoFull from "@/public/images/npa-logo-full.png";

export const Aside = ({ sidebarIsOpen, onSidebarIsOpen }) => {
  return (
    <aside
      className={classNames(
        "absolute -left-[110%] top-0 bottom-0 z-20 flex w-screen flex-1 overflow-hidden md:static",
        {
          "left-0 opacity-100 duration-[400ms]": sidebarIsOpen,
          "-left-[110%] opacity-0 duration-300 md:opacity-100": !sidebarIsOpen,
        }
      )}
    >
      <div className="flex flex-[2] flex-col items-center gap-8 border-r-1 border-neutral-300 bg-white py-10 px-5">
        <picture className="h-24 max-w-[160px]">
          <Image src={npaLogoFull} alt="NPA Logo" className="bg-contain" />
        </picture>
        <div className="flex w-full flex-col gap-2">
          <div className="flex w-full items-center justify-between">
            <div className="flex flex-col gap-2">
              <h1 className="text-sm font-semibold">Welcome Back</h1>
              <h4 className="text-xs text-neutral-500">Admin!</h4>
            </div>
            <button type="button" onClick={() => onSidebarIsOpen(false)}>
              <MdMenuOpen className="h-7 w-7 cursor-pointer" />
            </button>
          </div>
        </div>
      </div>
      <div
        aria-hidden="true"
        className={classNames(
          "flex-1 bg-black/40 backdrop-blur-[2px] md:hidden",
          {
            "opacity-0": !sidebarIsOpen,
            "opacity-100 delay-[350ms] duration-200": sidebarIsOpen,
          }
        )}
        onClick={() => onSidebarIsOpen(false)}
      />
    </aside>
  );
};
