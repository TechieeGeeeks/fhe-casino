"use client";
import { AiFillGithub } from "react-icons/ai";
import { FaXTwitter, FaDiscord, FaMedium } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";

import { useState } from "react";
import Link from "next/link";

import arrow from "../../public/svgs/arrow.svg";
// import arrow from '../../public'

export default function NavDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onBlur={() => [setIsOpen(false)]}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="flex items-center gap-2 text-xl font-base">
        Socials
        <ChevronDown
          className={clsx(
            isOpen ? "rotate-180" : "rotate-0",
            "h-5 w-5 transition-transform"
          )}
          color="black"
        />
      </button>
      <div
        className={clsx(
          isOpen
            ? "visible top-12 opacity-100 right-1"
            : "invisible top-10 right-1 opacity-0",
          "absolute flex w-[150px] flex-col rounded-base border-2 border-black bg-white text-lg font-base transition-all"
        )}>
        <a
          href={"/react/installation"}
          onClick={() => setIsOpen(false)}
          className="text-left flex items-center rounded-t-base px-4 py-3 border-b-2 border-b-black hover:bg-main">
          <FaDiscord className="h-6 w-6 m500:h-4 m500:w-4 mr-[15px] m400:ml-4 m400:w-[12px]" />
          Discord
        </a>

        <a
          href={"/react/installation"}
          onClick={() => setIsOpen(false)}
          className="text-left flex items-center rounded-t-base px-4 py-3 border-b-2 border-b-black hover:bg-main">
          <FaMedium className="h-6 w-6 m500:h-4 m500:w-4 mr-[15px] m400:ml-4 m400:w-[12px]" />
          Medium
        </a>

        <a
          href={"/react/installation"}
          onClick={() => setIsOpen(false)}
          className="text-left flex items-center rounded-t-base px-4 py-3 border-b-2 border-b-black hover:bg-main">
          <FaTelegramPlane className="h-6 w-6 m500:h-4 m500:w-4 mr-[15px] m400:ml-4 m400:w-[12px]" />
          Telegram
        </a>

        <a
          href={"/react/installation"}
          onClick={() => setIsOpen(false)}
          className="text-left flex items-center rounded-t-base px-4 py-3 border-b-2 border-b-black hover:bg-main">
          <FaXTwitter className="h-6 w-6 m500:h-4 m500:w-4 mr-[15px] m400:ml-4 m400:w-[12px]" />
          X
        </a>
      </div>
    </div>
  );
}
