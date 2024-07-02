"use client";
import GameInputForm from "@/components/GameInputForm";
import PlayButton from "@/components/PlayButton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import React, { useState } from "react";

const Page = () => {
  const [wager, setWager] = useState(0);
  const [bet, setBet] = useState(1);
  const [totalwager, setTotalwager] = useState(0);
  const [maxPayout, setMaxPayout] = useState(0);
  const [stopOnLoss, setStopOnLoss] = useState(0);
  const [takeprofit, setTakeprofit] = useState(0);
  return (
    <main className="relative flex flex-col items-center justify-center bg-white px-5 py-[150px] text-center font-bold bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px]">
      <div className="grid gap-4 grid-cols-2">
        <div className="max-w-[70%] flex flex-col gap-4">
          <GameInputForm
            id={"wager"}
            label={"Wager"}
            onChange={(e) => setWager(e.target.value)}
            placeholder={"Choose Wager"}
            type={"number"}
            value={wager}
          />
          <GameInputForm
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
          <Slider defaultValue={[33]} max={100} step={1} />

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
          </Accordion>
          <PlayButton />
        </div>
        <div className="md:flex hidden relative">
          <div className="w-[550px] h-full bg-black">
            {/* <CoinFlip
              isFlipping={isFlipping}
              result={result}
              setUserChoiced={setUserChoiced}
            /> */}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
