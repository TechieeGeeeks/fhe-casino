import Link from "next/link";
import React from "react";
import { GiPokerHand } from "react-icons/gi";
import { FaCircleDollarToSlot } from "react-icons/fa6";
import { LiaHandRock } from "react-icons/lia";
import { LuCoins } from "react-icons/lu";
import { RiCopperCoinLine } from "react-icons/ri";
import { FaHandRock, FaDice } from "react-icons/fa";
import { GiPoolTriangle } from "react-icons/gi";
import { GiRollingBomb } from "react-icons/gi";

const Page = () => {
  return (
    <div>
      <section className="inset-0 flex w-full flex-col items-center justify-center bg-blue-500/20 bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px] font-base">
        <main className="relative px-5 py-[150px] font-bold">
          <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
            {items.map((item, idx) => (
              <Link href={item.href} key={idx} passHref>
                <div className="font-base items-start rounded-base border-2 border-black bg-blue-400/60 hover:bg-white px-10 py-3 text-3xl shadow-base transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none m800:px-8 m800:py-2.5 m800:text-lg m400:px-6 m400:py-2 m400:text-base flex justify-between pr-12 group h-[200px]">
                  <div className="flex gap-1 items-center justify-center mt-8">
                    {item.displayIcon}
                    {item.title}
                  </div>
                  <div className="h-full flex items-center transition-all duration-500 ease-in-out group-hover:rotate-6 group-hover:scale-110">
                    {item.hoverIcon}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </section>

      <div className="grid grid-cols-3 border-t-4 border-black m700:grid-cols-1">
        <section className="border-b-4 border-r-4 border-black bg-white p-14 py-16 m1300:p-10 m1300:py-12 m800:p-6 m800:py-8 m700:border-r-0 m700:bg-main">
          <h2 className="mb-6 font-heading text-4xl m1300:text-3xl m800:text-2xl m500:text-xl">
            Total Users
          </h2>

          <p className="font-base text-6xl m1300:text-5xl m800:text-4xl m500:text-3xl">
            4,56,122+
          </p>
        </section>
        <section className="border-b-4 md:border-r-4 border-black bg-main p-14 py-16 m1300:p-10 m1300:py-12 m800:p-6 m800:py-8 m700:bg-bg">
          <h2 className="mb-6 font-heading text-4xl m1300:text-3xl m800:text-2xl m500:text-xl">
            Total Waggered
          </h2>

          <p className="font-base text-6xl m1300:text-5xl m800:text-4xl m500:text-3xl">
            $324,682,869
          </p>
        </section>
        <section className="border-b-4 border-black bg-main md:bg-white p-14 py-16 m1300:p-10 m1300:py-12 m800:p-6 m800:py-8">
          <h2 className="mb-6 text-4xl font-heading m1300:text-3xl m800:text-2xl m500:text-xl">
            Total Bets
          </h2>

          <p className="font-base text-6xl m1300:text-5xl m800:text-4xl m500:text-3xl">
            8,387,088
          </p>
        </section>
      </div>
    </div>
  );
};

export default Page;

const items = [
  {
    title: "Coin Flip",
    displayIcon: <RiCopperCoinLine className="text-[3rem]" />,
    hoverIcon: <LuCoins className="text-[6rem]" />,
    href: "/games/coin-flip",
  },
  {
    title: "Poker",
    displayIcon: <GiPokerHand className="text-[3rem]" />,
    hoverIcon: <GiPokerHand className="text-[6rem]" />,
    href: "/games/poker-hand",
  },
  {
    title: "Slots",
    displayIcon: <FaCircleDollarToSlot className="text-[2rem]" />,
    hoverIcon: <FaCircleDollarToSlot className="text-[6rem]" />,
    href: "/games/slotmachine",
  },
  {
    title: "Hand Rock",
    displayIcon: <FaHandRock className="text-[4rem]" />,
    hoverIcon: <LiaHandRock className="text-[6rem]" />,
    href: "/games/hand-rock",
  },
  {
    title: "Dice",
    displayIcon: <FaDice className="text-[4rem]" />,
    hoverIcon: <FaDice className="text-[6rem]" />,
    href: "/games/dice",
  },
  {
    title: "Mines",
    displayIcon: <GiRollingBomb className="text-[4rem]" />,
    hoverIcon: <GiRollingBomb className="text-[6rem]" />,
    href: "/games/dice",
  },
  {
    title: "Plinko",
    displayIcon: <GiPoolTriangle className="text-[4rem]" />,
    hoverIcon: <GiPoolTriangle className="text-[6rem]" />,
    href: "/games/plinko",
  },
];
