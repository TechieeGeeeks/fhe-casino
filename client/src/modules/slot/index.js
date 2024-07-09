import React, { useCallback, useEffect, useState } from "react";
import SlotMachine from "./slotmachine";
import { Button } from "@/components/ui/button";
import SlotInputForm from "./slotInputForm";
import { toast } from "@/components/ui/use-toast";
import { confetti } from "@/utils/confetii";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PlayButton from "@/components/PlayButton";
import { spinSlotMachine } from "@/utils/helpers/slotMachineHelpers";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useDispatch } from "react-redux";
import { setToken } from "@/redux/slices/tokenSlice";
import { Input } from "@/components/ui/input";

const Index = () => {
  const { ready } = usePrivy();
  const [isRunning, setIsRunning] = useState(false);
  const [numbers, setNumbers] = useState([0, 1, 2, 3, 4, 5, 6, 7]);
  const [wager, setWager] = useState();
  const [bet, setBet] = useState(1);
  const [totalwager, setTotalwager] = useState();
  const [maxPayout, setMaxPayout] = useState();
  const [jackpot, setJackpot] = useState(false);
  const [stopOnLoss, setStopOnLoss] = useState();
  const [takeprofit, setTakeprofit] = useState();
  const { wallets } = useWallets();
  const w0 = wallets[0];
  const dispatch = useDispatch();

  useEffect(() => {
    if (numbers[0] === numbers[1] && numbers[1] === numbers[2]) {
      confetti();
      toast({
        variant: "white",
        title: "🎉🎉🎊Wohoooo!, You have won jackpot",
      });
    }
  }, [numbers]);

  const handlePlay = () => {
    if (!wager) {
      toast({
        title: "Please, add valid wager",
      });
      return;
    }
    spinSlotMachine(
      w0,
      wager,
      setToken,
      ready,
      dispatch,
      setIsRunning,
      setNumbers
    );
  };

  // useEffect(() => {
  //   if (isRunning) {
  //     const timeoutId = setTimeout(() => {
  //       setNumbers([2, 2, 2]);
  //       setIsRunning(false);
  //     }, 2000);

  //     return () => clearTimeout(timeoutId);
  //   }
  // }, [isRunning]);

  return (
    <div>
      <main className="relative flex flex-col items-center justify-center bg-white px-5 py-[150px] text-center font-bold bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px]">
        <div className="grid gap-4 place-items-center">
          {/* <div className="grid gap-4 grid-cols-2"> */}
          {/* <div className="max-w-[70%] flex flex-col gap-4">
            <SlotInputForm
              id={"wager"}
              label={"Wager"}
              onChange={(e) => setWager(e.target.value)}
              placeholder={"Choose Wager"}
              type={"number"}
              value={wager}
            /> */}
          {/* <SlotInputForm
              id={"bets"}
              label={"Bets"}
              onChange={(e) => setBet(e.target.value)}
              placeholder={""}
              type={"number"}
              value={bet}
            />
            <div className="grid grid-cols-2 gap-4">
              <SlotInputForm
                id={"totalwager"}
                label={"Total Wager"}
                onChange={(e) => {}}
                placeholder={"-"}
                value={totalwager}
                className={"cursor-not-allowed"}
              />{" "}
              <SlotInputForm
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
                  <SlotInputForm
                    id={"stoponloss"}
                    label={"Stop on Loss"}
                    onChange={(e) => setStopOnLoss(e.target.value)}
                    placeholder={"-"}
                    type={"number"}
                    value={stopOnLoss}
                  />{" "}
                  <SlotInputForm
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
          {/* <PlayButton handler={handlePlay} />
          </div> */}
          <div className="md:flex hidden relative">
            <img
              src={"/svgs/slot-machine.svg"}
              className="w-[550px]"
              alt="slot-machine"
            />
            <div className="absolute h-full w-full top-[34%] left-[17%] text-[6rem] font-heading m1000:text-[4.5rem] m800:text-[4rem] m500:text-[3.5rem] m400:text-[3rem] leading-tight">
              <SlotMachine isRunning={isRunning} numbers={numbers} />
            </div>
            <div className="absolute h-full w-full top-[78%] left-[5.5%] text-[6rem] font-heading m1000:text-[4.5rem] m800:text-[4rem] m500:text-[3.5rem] m400:text-[3rem] leading-tight">
              <div className="h-[73px] w-[450px] border-4 border-black bg-white rounded-xl">
                <div className="w-full h-full flex items-center justify-between">
                  <Input
                    className="h-full w-full focus:outline-none focus-visible:ring-offset-0 font-bold text-2xl rounded-r-none"
                    placeholder="Enter Wager"
                    onChange={(e) => setWager(e.target.value)}
                  />
                  <Button
                    variant="default"
                    className="h-full rounded-l-none bg-[#FFCDF4] text-2xl"
                    onClick={handlePlay}
                  >
                    Spin
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
