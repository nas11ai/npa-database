import Image from "next/image";
import { MdMenuOpen } from "react-icons/md";

import npaLogoFull from "@/public/images/npa-logo-full.png";

export const Aside = () => {
  return (
    <aside className="absolute z-20 flex h-screen w-screen">
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
            <MdMenuOpen className="h-7 w-7 cursor-pointer" />
          </div>
        </div>
      </div>
      <div className="flex-1 bg-black/40 backdrop-blur-sm lg:hidden" />
    </aside>
  );
};
