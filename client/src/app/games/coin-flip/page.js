"use client";
import React, { useEffect, useState } from "react";
import CoinFlipForm from "@/modules/coin-flip/coinFlipInputForm";
import { toast } from "@/components/ui/use-toast";
import { confetti } from "@/utils/confetii";
import CoinFlip from "@/modules/coin-flip";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import PlayButton from "@/components/PlayButton";
import { fetchTokens } from "@/utils/helpers/webHelpers";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "@/redux/slices/tokenSlice";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import GameInputForm from "@/components/GameInputForm";
import { playFlipGame } from "@/utils/helpers/coinFlipHelpers";

const Index = () => {
  const [isFlipping, setIsFlipping] = useState(false);
  const [result, setResult] = useState("Coin");
  const [isBtnDisbled, setIsBtnDisbled] = useState(false);
  const [wager, setWager] = useState();
  const [bet, setBet] = useState(1);
  const [totalwager, setTotalwager] = useState();
  const [maxPayout, setMaxPayout] = useState();
  const [stopOnLoss, setStopOnLoss] = useState();
  const [takeprofit, setTakeprofit] = useState();
  const [userChoiced, setUserChoiced] = useState();
  // const [tokens, setTokens] = useState("0");
  const { login, authenticated, logout, ready } = usePrivy();
  const { wallets } = useWallets();
  const w0 = wallets[0];
  const { token } = useSelector((tok) => tok.tokens);
  const dispath = useDispatch();

  useEffect(() => {
    if (ready && authenticated && w0?.address !== undefined) {
      if (ready) {
        fetchTokens(w0, setToken, ready, dispath);
      }
    }
  }, [w0]);

  useEffect(() => {
    if (userChoiced?.toLowerCase() === result.toLowerCase()) {
      console.log(userChoiced, result);
      confetti();
      toast({
        variant: "white",
        title: "🎉🎉🎊Wohoooo!, You have won the toss",
      });
      // setTimeout(() => {
      //   setResult("Coin");
      // }, 2000);
    }
  }, [result]);

  const startFlipping = () => {
    if (!wager) {
      toast({
        title: "Please, add valid wager",
      });
      return;
    }
    if (!bet || Number(bet) <= 0) {
      toast({
        title: "Please, place valid bet!",
      });
      return;
    }
    if (!userChoiced) {
      toast({
        title: "Please, Choose heads or tails!",
      });
      return;
    }
    setIsFlipping(true);
    setIsBtnDisbled(true);
    setResult("loading");
    playFlipGame(w0, wager, bet, userChoiced, takeprofit, stopOnLoss);
  };

  // useEffect(() => {
  //   if (isFlipping) {
  //     setTimeout(() => {
  //       stopFlipping();
  //     }, 5000);
  //   }
  // }, [isFlipping]);

  const stopFlipping = () => {
    setIsBtnDisbled(false);
    setIsFlipping(false);
    setResult("Tails");
  };

  return (
    <>
      {" "}
      <div>
        <main className="relative flex flex-col items-center justify-center bg-white px-5 py-[150px] text-center font-bold bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px]">
          <div className="grid gap-4 grid-cols-2">
            <div className="max-w-[70%] flex flex-col gap-4">
              <CoinFlipForm
                id={"wager"}
                label={"Wager"}
                onChange={(e) => setWager(e.target.value)}
                placeholder={"Choose Wager"}
                type={"number"}
                value={wager}
              />
              <CoinFlipForm
                id={"bets"}
                label={"Bets"}
                onChange={(e) => setBet(e.target.value)}
                placeholder={""}
                type={"number"}
                value={bet}
              />

              <div className="grid grid-cols-2 gap-4">
                <CoinFlipForm
                  id={"totalwager"}
                  label={"Total Wager"}
                  onChange={(e) => setTotalwager(e.target.value)}
                  placeholder={"-"}
                  disabled={true}
                  type={"number"}
                  value={totalwager}
                />{" "}
                <CoinFlipForm
                  id={"maxpayout"}
                  label={"Max Payout"}
                  onChange={(e) => setMaxPayout(e.target.value)}
                  placeholder={"-"}
                  disabled={true}
                  type={"number"}
                  value={maxPayout}
                />
              </div>

              <div>
                <RadioGroup
                  // defaultValue="comfortable"
                  className="flex"
                  onValueChange={(e) => setUserChoiced(e)}
                >
                  <div className={`flex items-center space-x-2`}>
                    <RadioGroupItem value="heads" id="r1" />
                    <Label htmlFor="r1">Heads</Label>
                  </div>
                  <div className={`flex items-center space-x-2`}>
                    <RadioGroupItem value="tails" id="r2" />
                    <Label htmlFor="r2">Tails</Label>
                  </div>
                </RadioGroup>
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
                    <CoinFlipForm
                      id={"stoponloss"}
                      label={"Stop on Loss"}
                      onChange={(e) => setStopOnLoss(e.target.value)}
                      placeholder={"-"}
                      type={"number"}
                      value={stopOnLoss}
                    />{" "}
                    <CoinFlipForm
                      id={"takeprofit"}
                      label={"Take Profit"}
                      onChange={(e) => setTakeprofit(e.target.value)}
                      placeholder={"-"}
                      type={"number"}
                      value={takeprofit}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <PlayButton handler={startFlipping} tokens={token} />
            </div>
            <div className="md:flex hidden relative">
              <div className="w-[550px]">
                <CoinFlip
                  isFlipping={isFlipping}
                  result={result}
                  setUserChoiced={setUserChoiced}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Index;
