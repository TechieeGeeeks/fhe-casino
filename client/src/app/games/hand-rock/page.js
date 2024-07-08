"use client";

import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { confetti } from "@/utils/confetii";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import HandRock from "@/modules/hand-rock";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import GameInputForm from "@/components/GameInputForm";
import PlayButton from "@/components/PlayButton";
import { playHandRock } from "@/utils/helpers/handrockHelpers";
import { useDispatch } from "react-redux";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { setToken } from "@/redux/slices/tokenSlice";
import RockPaperScissorsAlert from "@/modules/hand-rock/handrockAlert";

const Page = () => {
  const [open, setOpen] = useState(false);
  const [wager, setWager] = useState(0);
  const [bet, setBet] = useState(1);
  const [totalwager, setTotalwager] = useState(0);
  const [maxPayout, setMaxPayout] = useState(0);
  const [stopOnLoss, setStopOnLoss] = useState(0);
  const [takeprofit, setTakeprofit] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(1);
  const [selectValue, setSelectValue] = useState("rock");
  const [userChoice, setUserChoice] = useState(0);
  const [gameOutcome, setGameOutcome] = useState(null);
  const [results, setResults] = useState();
  const [result, setResult] = useState(1);
  const { wallets } = useWallets();
  const dispath = useDispatch();
  const { ready } = usePrivy();
  const w0 = wallets[0];
  const images = [
    "/rock-hand/rock.svg",
    "/rock-hand/paper.svg",
    "/rock-hand/scissors.svg",
  ];
  // const userImages = [
  //   "/rock-hand/user/rock.svg",
  //   "/rock-hand/user/paper.svg",
  //   "/rock-hand/user/scissors.svg",
  // ];

  const handleUserChoice = (choice) => {
    setSelectValue(choice);
    if (choice === "rock") setUserChoice(0);
    if (choice === "paper") setUserChoice(1);
    if (choice === "scissors") setUserChoice(2);
  };

  const playGame = () => {
    if (!wager) {
      toast({
        title: "Please add a valid wager",
      });
      return;
    }
    playHandRock(
      w0,
      wager,
      bet,
      userChoice,
      takeprofit ? takeprofit : maxPayout.toString(),
      stopOnLoss,
      setToken,
      ready,
      dispath,
      setIsPlaying,
      stopPlaying,
    );
  };

  const stopPlaying = (computerChoice) => {
    setIsPlaying(false);
    // Determine game result
    // setResult(computerChoice);
    setOpen(true);
    setResults(computerChoice);
    // const gameResult = determineGameResult(userChoice, computerChoice);

    // if (gameResult === "win") {
    //   confetti();
    // }
  };

  const determineGameResult = (userChoice, computerChoice) => {
    if (userChoice === computerChoice) {
      return "draw";
    } else if (
      (userChoice === 0 && computerChoice === 2) ||
      (userChoice === 1 && computerChoice === 0) ||
      (userChoice === 2 && computerChoice === 1)
    ) {
      return "win";
    } else {
      return "lose";
    }
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

  // useEffect(() => {
  //   if (isPlaying) {
  //     const timeout = setTimeout(() => {
  //       stopPlaying();
  //     }, 2000);

  //     return () => clearTimeout(timeout);
  //   }
  // }, [isPlaying]);

  useEffect(() => {
    if (gameOutcome === "win") {
      confetti(); // Show confetti for win
    }
  }, [gameOutcome]);

  const changeImage = () => {
    if (isPlaying) {
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }, 150);
    }
  };

  useEffect(() => {
    changeImage();
  }, [currentImageIndex, isPlaying]);

  return (
    <div>
      <RockPaperScissorsAlert
        open={open}
        setOpen={setOpen}
        results={results}
        userChoice={userChoice}
      />
      <main className="w-full grid items-center justify-center bg-white px-5 py-[150px] text-center font-bold bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px]">
        <div className="grid min-w-[90vw] gap-4 grid-cols-2">
          <div className="flex flex-col items-center w-full gap-4">
            <div className="w-full max-w-sm flex flex-col gap-4">
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

              <div className="grid gap-4">
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

                <div className="grid place-items-start gap-2">
                  <p>Select your move</p>
                  <RadioGroup
                    value={selectValue}
                    onValueChange={handleUserChoice}
                    className="flex"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="rock" id="rock" />
                      <Label htmlFor="rock" className="cursor-pointer">
                        Rock
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="paper" id="paper" />
                      <Label htmlFor="paper" className="cursor-pointer">
                        Paper
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="scissors" id="scissors" />
                      <Label htmlFor="scissors" className="cursor-pointer">
                        Scissors
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
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
              </Accordion>

              <PlayButton handler={playGame} />
            </div>
          </div>

          <div className="md:flex hidden relative items-center">
            <div className="w-[550px]">
              <HandRock
                images={images}
                currentImageIndex={currentImageIndex}
                userImage={userChoice}
                isPlaying={isPlaying}
                result={result}
              />
            </div>
          </div>
          {/* <div className="md:flex hidden w-full min-h-full items-center justify-center">
            <HandRock
              images={images}
              currentImageIndex={currentImageIndex}
              userImage={userChoice}
              isPlaying={isPlaying}
              result={result}
            />
          </div> */}
        </div>
      </main>
    </div>
  );
};

export default Page;
