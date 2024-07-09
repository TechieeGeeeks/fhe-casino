"use client";
import GameInputForm from "@/components/GameInputForm";
import PlayButton from "@/components/PlayButton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { inputChecks } from "@/lib/utils";
import { setToken } from "@/redux/slices/tokenSlice";
import { playDiceGame } from "@/utils/helpers/diceHelpers";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Page = () => {
  const [wager, setWager] = useState(0);
  const [bet, setBet] = useState(1);
  const [totalwager, setTotalwager] = useState(0);
  const [maxPayout, setMaxPayout] = useState(0);
  const [stopOnLoss, setStopOnLoss] = useState(0);
  const [takeprofit, setTakeprofit] = useState(0);
  const [value, setValue] = useState([80]);
  const { login, authenticated, logout, ready } = usePrivy();
  const { wallets } = useWallets();
  const w0 = wallets[0];
  const { token } = useSelector((tok) => tok.tokens);
  const dispath = useDispatch();
  const [result, setResult] = useState([]);

  const [randomNumber, setRandomNumber] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectValue, setSelectValue] = useState("left");
  const [userChoice, setUserChoice] = useState(false);
  const handleUserChoice = (choice) => {
    setSelectValue(choice);
    if (choice === "left") setUserChoice(false);
    if (choice === "right") setUserChoice(true);
    // if (choice === "scissors") setUserChoice(2);
  };

  const play = () => {
    const ifValidInputs = inputChecks("all", wager, bet, value);
    // console.log(ifValidInputs);
    if (!ifValidInputs) return;
    playDiceGame(w0, wager, value, handleStop, userChoice);
    setIsGenerating(true);
    // setTimeout(() => {
    //   handleStop();
    // }, 5000);
  };

  useEffect(() => {
    let interval;
    if (isGenerating) {
      interval = setInterval(() => {
        setRandomNumber(Math.floor(Math.random() * 101));
      }, 100); // Change the number every 100ms
    }
    return () => clearInterval(interval); // Cleanup interval on component unmount or when isGenerating changes
  }, [isGenerating]);

  // const handleStart = () => setIsGenerating(true);
  const handleStop = (randNumber) => {
    setIsGenerating(false);
    setRandomNumber(randNumber);
  };

  useEffect(() => {
    // Calculate total wager and round to nearest integer
    setTotalwager(Math.round(wager * bet));
  }, [wager, bet]);

  useEffect(() => {
    if (takeprofit !== 0 && takeprofit !== undefined) {
      setMaxPayout(Math.round(takeprofit));
    } else if (takeprofit === 0 && takeprofit !== undefined) {
      const calculatedPayout = Math.round(wager * bet * 1.98);
      setMaxPayout(calculatedPayout);
    }
  }, [wager, bet, takeprofit]);
  return (
    <main className="relative flex flex-col items-center justify-center bg-white px-5 py-[150px] text-center font-bold bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px]">
      <div className="grid gap-4 grid-cols-2">
        <div className="max-w-[70%] flex flex-col gap-4 min-h-[50vh] mt-10">
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
          </div> */}
          <Slider
            defaultValue={value}
            value={value}
            max={100}
            step={1}
            onValueChange={(e) => setValue(e)}
          />

          {/* <div>
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
          </div> */}

          {/* <Accordion
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
          <div className="grid place-items-start gap-2 bg-white border-2 border-black p-3 rounded-base">
            <p className="pb-3">Select Side of the dice:</p>
            <RadioGroup
              value={selectValue}
              onValueChange={handleUserChoice}
              className="flex items-center justify-between w-full"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="left" id="left" />
                <Label htmlFor="left" className="cursor-pointer">
                  Left Side
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Label htmlFor="right" className="cursor-pointer">
                  Right Side
                </Label>
                <RadioGroupItem value="right" id="right" />
              </div>
            </RadioGroup>
          </div>
          <PlayButton handler={play} tokens={token} />
        </div>
        <div className="md:flex hidden relative">
          <div className="w-[550px] h-full flex items-start justify-center">
            <div className="h-[270px] absolute w-[270px] rounded-3xl mt-10 border-4 border-black bg-main flex items-center justify-center text-[6rem] text-white">
              {randomNumber}
            </div>
          </div>

          {/* <div className="flex space-x-4">
            <button
              onClick={handleStart}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
            >
              Start
            </button>
            <button
              onClick={handleStop}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
            >
              Stop
            </button>
          </div> */}
        </div>
      </div>
    </main>
  );
};

export default Page;
