"use client";
import { MultiStepLoader } from "@/components/MultiStageLoader";
import { setToken } from "@/redux/slices/tokenSlice";
import {
  approveTokens,
  fetchTokens,
  mintToken,
} from "@/utils/helpers/bridgeHelpers";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const mintStates = [
  {
    text: "Transaction Initiated",
  },
  {
    text: "Token Minted Successfully...",
  },
];

const approveLoadingStates = [
  {
    text: "Transaction has started",
  },
  {
    text: "Requesting token approval",
  },
  {
    text: "Token has been approved",
  },
];

const Page = () => {
  const { wallets } = useWallets();
  const w0 = wallets[0];
  const [loading, setLoading] = useState(false);
  const [isMintLoading, setIsMintLoading] = useState(false);
  const [crntState, setCrntState] = useState(0);
  const { login, authenticated, logout, ready } = usePrivy();
  const [address, setAddress] = useState();
  const [fetchBalanceOnMint, setFetchBalanceOnMint] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (ready && authenticated && w0?.address !== undefined) {
      if (ready) {
        setAddress(w0.address);
      }
    }
  }, [w0]);

  const handleMinting = async () => {
    await mintToken(
      w0,
      setLoading,
      setIsMintLoading,
      setCrntState,
      setToken,
      ready,
      dispatch
    );
    setIsMintLoading(false);
  };

  return (
    <>
      <section className="border-t-4 border-t-black inset-0 w-full flex flex-col items-center justify-center bg-main bg-[linear-gradient(to_right,#00000033_1px,transparent_1px),linear-gradient(to_bottom,#00000033_1px,transparent_1px)] bg-[size:70px_70px] px-5 py-[200px] m1000:py-[150px] m500:py-[120px] min-h-[92vh]">
        {loading && (
          <div className="absolute">
            <MultiStepLoader
              currentState={crntState}
              loading={loading}
              setLoading={setLoading}
              loadingStates={isMintLoading ? mintStates : approveLoadingStates}
            />
          </div>
        )}
        <div className="relative">
          <h2 className="text-center font-heading text-5xl m1000:text-3xl m500:text-2xl m400:text-xl">
            Craft Your Winning Strategy Today.
          </h2>

          <div className="w-full static flex items-center justify-center">
            <div className="list-disc text-xl mt-10 max-w-xl bg-white/30 shadow-strong p-12 rounded-lg gap-4 w-full backdrop-blur-xs border-[3px] border-black">
              <div
                className="my-4 flex justify-between font-base items-center rounded-base border-2 border-black bg-white px-10 py-3 text-[22px] shadow-base transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none m800:px-8 m800:py-2.5 m800:text-lg m400:px-6 m400:py-2 m400:text-base"
                onClick={handleMinting}
              >
                Mint & Approve
                <img
                  className="ml-[15px] w-[18px] m400:ml-4 m400:w-[15px]"
                  src={"svgs/arrow.svg"}
                  alt="arrow"
                />
              </div>

              {/* <li>
                <span className="font-bold">Step 2:</span> Approving
                <div
                  className="my-4 flex justify-between font-base items-center rounded-base border-2 border-black bg-white px-10 py-3 text-[22px] shadow-base transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none m800:px-8 m800:py-2.5 m800:text-lg m400:px-6 m400:py-2 m400:text-base"
                  onClick={() =>
                    approveTokens(
                      w0,
                      setLoading,
                      setIsMintLoading,
                      setCrntState,
                      crntState,
                      address
                    )
                  }
                >
                  Approve
                  <img
                    className="ml-[15px] w-[18px] m400:ml-4 m400:w-[15px]"
                    src={"svgs/arrow.svg"}
                    alt="arrow"
                  />
                </div>
              </li> */}
            </div>
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
    </>
  );
};

export default Page;
