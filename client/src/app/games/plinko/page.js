"use client";
import GameInputForm from "@/components/GameInputForm";
import { Button } from "@/components/ui/button";
import { BallManager } from "@/modules/plinko/BallManager";
import React, { useEffect, useRef, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PlayButton from "@/components/PlayButton";
import { PlinkoGame } from "@/modules/plinko/PlinkoGame";
import { playPlinkoGame } from "@/utils/helpers/plinkoHelpers";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useDispatch } from "react-redux";
import { setToken } from "@/redux/slices/tokenSlice";
import { simulationData } from "@/utils/simulation";
import { toast } from "@/components/ui/use-toast";
const Page = () => {
  const [isFlipping, setIsFlipping] = useState(false);
  const [isBtnDisbled, setIsBtnDisbled] = useState(false);
  const [wager, setWager] = useState(0);
  const [bet, setBet] = useState(1);
  const [totalwager, setTotalwager] = useState(0);
  const [maxPayout, setMaxPayout] = useState(0);
  const [stopOnLoss, setStopOnLoss] = useState(0);
  const [takeprofit, setTakeprofit] = useState(0);
  const [userChoiced, setUserChoiced] = useState();
  const [open, setOpen] = useState(false);
  const [ballManager, setBallManager] = useState();
  const canvasRef = useRef();
  const { wallets } = useWallets();
  const dispath = useDispatch();
  const { ready } = usePrivy();
  const w0 = wallets[0];
  const [result, setResult] = useState();

  const mappedPlinkoData = {
    "-8": simulationData[0],
    "-7": simulationData[1],
    "-6": simulationData[2],
    "-5": simulationData[3],
    "-4": simulationData[4],
    "-3": simulationData[5],
    "-2": simulationData[6],
    "-1": simulationData[7],
    0: simulationData[8],
    1: simulationData[9],
    2: simulationData[10],
    3: simulationData[11],
    4: simulationData[12],
    5: simulationData[13],
    6: simulationData[14],
    7: simulationData[15],
    8: simulationData[16],
  };
  const [loading, setLoading] = useState(false);

  const handlePlay = async () => {
    if (!wager) {
      toast({
        title: "Please, add valid wager",
      });
      return;
    }
    // setLoading(() => true);
    toast({ title: "We are waiting for your transaction to be confirmed." });
    const sum = await playPlinkoGame(
      w0,
      wager,
      setToken,
      ready,
      dispath,
      setResult
    );
    // setLoading(() => false);
    if (!sum) return;
    // console.log(sum);
    const arrayToBePicked = mappedPlinkoData[sum];
    // console.log(arrayToBePicked);
    const randomIndex = Math.floor(Math.random() * arrayToBePicked.length);
    // console.log(randomIndex);
    const randomValue = arrayToBePicked[randomIndex];
    if (ballManager) {
      ballManager.addBall(randomValue);
    }
  };

  useEffect(() => {
    if (canvasRef.current) {
      const ballManager = new BallManager(canvasRef.current);
      setBallManager(ballManager);
    }
  }, [canvasRef]);
  return (
    <>
      <main className="relative flex flex-col items-center justify-center bg-white px-5 py-[150px] text-center font-bold bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px]">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="md:max-w-[70%] flex flex-col gap-4">
            <GameInputForm
              id={"wager"}
              label={"Wager"}
              onChange={(e) => setWager(e.target.value)}
              placeholder={"Choose Wager"}
              type={"number"}
              value={wager}
            />
            {/* <GameInputForm
              id={"bets"}
              label={"Bets"}
              onChange={(e) => setBet(e.target.value)}
              placeholder={""}
              type={"number"}
              value={bet}
            />

            <div className="grid grid-cols-2 gap-4">
              <GameInputForm
                id={"totalwager"}
                label={"Total Wager"}
                onChange={(e) => {}}
                placeholder={"-"}
                value={totalwager}
                className={"cursor-not-allowed"}
              />{" "}
              <GameInputForm
                id={"maxpayout"}
                label={"Max Payout"}
                onChange={(e) => {}}
                placeholder={"-"}
                value={maxPayout}
                className={"cursor-not-allowed"}
              />
            </div>

            <Accordion
              className="w-full lg:w-[unset] bg-white border-none shadow-none"
              type="single"
              collapsible
            >
              <AccordionItem className="max-w-full" value="item-1">
                <AccordionTrigger className="bg-transparent">
                  Advanced
                </AccordionTrigger>
                <AccordionContent className="grid grid-cols-2 gap-4">
                  <GameInputForm
                    id={"stoponloss"}
                    label={"Stop on Loss"}
                    onChange={(e) => setStopOnLoss(e.target.value)}
                    placeholder={"-"}
                    type={"number"}
                    value={stopOnLoss}
                  />{" "}
                  <GameInputForm
                    id={"takeprofit"}
                    label={"Take Profit"}
                    onChange={(e) => setTakeprofit(e.target.value)}
                    placeholder={"-"}
                    type={"number"}
                    value={takeprofit}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion> */}
            <PlayButton handler={handlePlay} />
          </div>
          <div className="md:flex relative">
            <div className="w-[550px] -mt-16">
              {loading ? (
                <div className="w-full h-[200px] bg-muted border flex items-center justify-center mt-32">
                  We are waiting for your transaction to be confirmed.
                </div>
              ) : (
                <PlinkoGame canvasRef={canvasRef} />
              )}
            </div>
          </div>
        </div>
      </main>

      {/* <Button onClick={handlePlay}>Add ball</Button> */}
    </>
  );
};

export default Page;
