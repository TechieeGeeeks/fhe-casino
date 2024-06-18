"use client";
import { MultiStepLoader } from "@/components/MultiStageLoader";
import { mintToken } from "@/utils/helper";
import { useWallets } from "@privy-io/react-auth";
import React, { useState } from "react";

const mintStates = [
  {
    text: "Transaction Initiated",
  },
  {
    text: "Token Minted Successfully...",
  },
];

const depositLoadingStates = [
  {
    text: "Transaction Initiated",
  },
  {
    text: "Token Deposited Successfully...",
  },
];

const Page = () => {
  const { wallets } = useWallets();
  const w0 = wallets[0];
  const [loading, setLoading] = useState(false);
  const [isMintLoading, setIsMintLoading] = useState(false);
  const [crntState, setCrntState] = useState(0);

  const handleMinting = async () => {
    await mintToken(w0, setLoading, setIsMintLoading, setCrntState, crntState);
    setIsMintLoading(false);
  };

  return (
    <section className="border-t-4 border-t-black inset-0 w-full flex flex-col items-center justify-center bg-main bg-[linear-gradient(to_right,#00000033_1px,transparent_1px),linear-gradient(to_bottom,#00000033_1px,transparent_1px)] bg-[size:70px_70px] px-5 py-[200px] m1000:py-[150px] m500:py-[120px] min-h-[92vh]">
      {loading && (
        <div className="absolute">
          <MultiStepLoader
            loading={loading}
            setLoading={setLoading}
            loadingStates={isMintLoading ? mintStates : depositLoadingStates}
          />
        </div>
      )}
      <div className="relative">
        <h2 className="text-center font-heading text-5xl m1000:text-3xl m500:text-2xl m400:text-xl">
          Craft Your Winning Strategy Today.
        </h2>

        <div className="w-full static">
          <ul className="list-disc text-xl mt-10 grid grid-cols-2 bg-white/30 shadow-strong p-12 rounded-lg gap-4 w-full backdrop-blur-xs border-[3px] border-black">
            <li>
              <span className="font-bold">Step 1:</span> Minting
              <div
                className="my-4 flex justify-between font-base items-center rounded-base border-2 border-black bg-white px-10 py-3 text-[22px] shadow-base transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none m800:px-8 m800:py-2.5 m800:text-lg m400:px-6 m400:py-2 m400:text-base"
                onClick={handleMinting}
              >
                Mint
                <img
                  className="ml-[15px] w-[18px] m400:ml-4 m400:w-[15px]"
                  src={"svgs/arrow.svg"}
                  alt="arrow"
                />
              </div>
            </li>
            <li>
              <span className="font-bold">Step 2:</span> Approving
              <div className="my-4 flex justify-between font-base items-center rounded-base border-2 border-black bg-white px-10 py-3 text-[22px] shadow-base transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none m800:px-8 m800:py-2.5 m800:text-lg m400:px-6 m400:py-2 m400:text-base">
                Approve
                <img
                  className="ml-[15px] w-[18px] m400:ml-4 m400:w-[15px]"
                  src={"svgs/arrow.svg"}
                  alt="arrow"
                />
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex gap-5">
        {/* <div className="mt-[50px] flex font-base items-center rounded-base border-2 border-black bg-green-500 px-10 py-3 text-[22px] shadow-base transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none m800:px-8 m800:py-2.5 m800:text-lg m400:px-6 m400:py-2 m400:text-base">
          Mint
          <img
            className="ml-[15px] w-[18px] m400:ml-4 m400:w-[15px]"
            src={"svgs/arrow.svg"}
            alt="arrow"
          />
        </div> */}
        {/* <div className="mt-[50px] flex font-base items-center rounded-base border-2 border-black bg-white px-10 py-3 text-[22px] shadow-base transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none m800:px-8 m800:py-2.5 m800:text-lg m400:px-6 m400:py-2 m400:text-base">
          Approve
          <img
            className="ml-[15px] w-[18px] m400:ml-4 m400:w-[15px]"
            src={"svgs/arrow.svg"}
            alt="arrow"
          />
        </div> */}
      </div>
    </section>
  );
};

export default Page;
