"use client";
import { AiFillGithub } from "react-icons/ai";
import { FaXTwitter, FaDiscord, FaMedium } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";
import clsx from "clsx";
import { ChevronDown, LogOutIcon } from "lucide-react";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useEffect, useState } from "react";
import Link from "next/link";

import arrow from "../../public/svgs/arrow.svg";
import { GiToken } from "react-icons/gi";
import { fetchTokens } from "@/utils/helper";
import { RiLuggageDepositFill } from "react-icons/ri";
// import arrow from '../../public'

export default function NavDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { login, authenticated, logout, ready } = usePrivy();
  const { wallets } = useWallets();
  const w0 = wallets[0];
  const [tokens, setTokens] = useState("0");
  const accountAddress = w0?.address?.slice(0, 6)?.toLocaleLowerCase();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  useEffect(() => {
    if (ready && authenticated && w0?.address !== undefined) {
      if (ready) {
        fetchTokens(w0, setTokens);
      }
    }
  }, [w0]);

  return (
    <div className="relative">
      {authenticated ? (
        <button
          onBlur={() => [setIsOpen(false)]}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className="flex items-center gap-2 text-xl font-base"
        >
          <div className="flex items-center gap-2 hover:text-yellow-500 font-semibold">
            <GiToken className="" />

            <p> {tokens === "0" ? "0" : tokens.slice(0, -18)}</p>
          </div>

          {/* {accountAddress}.... */}
          <ChevronDown
            className={clsx(
              isOpen ? "rotate-180" : "rotate-0",
              "h-5 w-5 transition-transform"
            )}
            color="black"
          />
        </button>
      ) : (
        <button
          onBlur={() => [setIsOpen(false)]}
          onClick={login}
          className="flex items-center gap-2 text-xl font-base"
        >
          Login
        </button>
      )}

      <div
        className={clsx(
          isOpen
            ? "visible top-12 opacity-100 right-1"
            : "invisible top-10 right-1 opacity-0",
          "absolute flex w-[150px] flex-col rounded-base border-2 border-black bg-white text-lg font-base transition-all"
        )}
      >
        <div
          onClick={() => setIsOpen(false)}
          className="text-left flex items-center rounded-t-base px-4 py-3 border-b-2 border-b-black"
        >
          {accountAddress}....
        </div>

        <Link
          href={"/deposit"}
          onClick={() => setIsOpen(false)}
          className="text-left flex items-center px-4 py-3 border-b-2 border-b-black hover:bg-main"
        >
          <RiLuggageDepositFill className="h-6 w-6 m500:h-4 m500:w-4 mr-[15px] m400:ml-4 m400:w-[12px]" />
          Deposit
        </Link>

        {/* <a
          href={"/react/installation"}
          onClick={() => setIsOpen(false)}
          className="text-left flex items-center rounded-t-base px-4 py-3 border-b-2 border-b-black hover:bg-main"
        >
          <FaTelegramPlane className="h-6 w-6 m500:h-4 m500:w-4 mr-[15px] m400:ml-4 m400:w-[12px]" />
          Telegram
        </a> */}

        <div
          onClick={handleLogout}
          className="text-left flex items-center px-4 py-3 border-b-2 border-b-black hover:bg-red-500 hover:text-white cursor-pointer"
        >
          <LogOutIcon className="h-6 w-6 m500:h-4 m500:w-4 mr-[15px] m400:ml-4 m400:w-[12px]" />
          Logout
        </div>
      </div>
    </div>
  );
}
