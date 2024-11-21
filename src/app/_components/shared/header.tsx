"use client";

import Image from "next/image";
import Link from "next/link";

import Logo from "./logo";
import { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="w-full flex justify-between items-center px-[32px] py-[16px] border-b-[1px] border-first-stroke">
      <Logo />
      <Image
        className="cursor-pointer z-20"
        onClick={() => setIsOpen(!isOpen)}
        src="/bar.svg"
        width={32}
        height={32}
        alt="bar"
      />
      {isOpen && (
        <div className="absolute flex flex-col gap-1 right-8 top-[72px] w-[280px] h-[156px] p-2 border-2 border-first-stroke rounded-lg bg-first z-20">
          <Link href={"#"} className="px-3 py-2 rounded-md">
            My Profile
          </Link>
          <Link href={"#"} className="px-3 py-2 rounded-md">
            Setting
          </Link>
          <hr className="border border-first-stroke my-0.5 -mx-2" />
          <button className="px-3 py-2 rounded-md text-left">Log out</button>
        </div>
      )}
      <div
        className={`fixed right-0 bottom-0 top-0 left-0 flex items-center justify-center z-10 ${
          !isOpen && "hidden"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>
    </div>
  );
};

export default Header;
