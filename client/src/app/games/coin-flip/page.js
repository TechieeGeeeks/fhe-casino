"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import CoinFlipForm from "@/modules/coin-flip/coinFlipInputForm";
import { toast } from "@/components/ui/use-toast";
import { confetti } from "@/utils/confetii";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CoinFlip from "@/modules/coin-flip";

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

  useEffect(() => {
    if (userChoiced?.toLowerCase() === result.toLowerCase()) {
      console.log(userChoiced, result)
      confetti();
      toast({
        variant: "white",
        title: "🎉🎉🎊Wohoooo!, You have won the toss",
      });
    }
  }, [result, userChoiced]);

  const startFlipping = () => {
    if (!wager) {
      toast({
        title: "Please, add valid wager",
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
    setResult("🪙");
  };

  useEffect(() => {
    if (isFlipping) {
      setTimeout(() => {
        stopFlipping();
      }, 5000);
    }
  }, [isFlipping]);

  const stopFlipping = () => {
    setIsBtnDisbled(false);
    setIsFlipping(false);
    setResult(Math.random() < 0.5 ? "Heads" : "Tails");
  };

  return (
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

            <Accordion
              className="w-full lg:w-[unset] bg-white border-none shadow-none"
              type="single"
              collapsible>
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
            <Button onClick={startFlipping} className="bg-main">
              Play
            </Button>
          </div>
          <div className="md:flex hidden relative">
            <CoinFlip
              isFlipping={isFlipping}
              result={result}
              setUserChoiced={setUserChoiced}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;

// "use client";
// import { Button } from "@/components/ui/button";
// import CoinFlip from "@/modules/coin-flip";
// import CoinFlipForm from "@/modules/coin-flip/coinFlipInputForm";
// import { confetti } from "@/utils/confetii";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import React, { useEffect, useState } from "react";
// import { toast } from "@/components/ui/use-toast";

// const Page = () => {
//   const [isFlipping, setIsFlipping] = useState(false);
//   const [result, setResult] = useState("Coin");
//   const [isBtnDisbled, setIsBtnDisbled] = useState(false);
//   const [wager, setWager] = useState();
//   const [bet, setBet] = useState(1);
//   const [totalwager, setTotalwager] = useState();
//   const [maxPayout, setMaxPayout] = useState();
//   const [stopOnLoss, setStopOnLoss] = useState();
//   const [takeprofit, setTakeprofit] = useState();

//   const startFlipping = () => {
//     if (!wager) {
//       toast({
//         title: "Please, add valid wager",
//       });
//       return;
//     }
//     setIsFlipping(true);
//     setIsBtnDisbled(true);
//     setResult("🪙");
//   };

//   useEffect(() => {
//     if (isFlipping) {
//       setTimeout(() => {
//         stopFlipping();
//       }, 5000);
//     }
//   }, [isFlipping]);

//   const stopFlipping = () => {
//     setIsBtnDisbled(false);
//     setIsFlipping(false);
//     setResult(Math.random() < 0.5 ? "Heads" : "Tails");
//   };
//   return (
//     <div>
//       <main className="relative flex flex-col w-full items-center justify-center bg-white px-5 py-[150px] text-center font-bold bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px] border-b-4 border-x-0 border-t-0 border-black">
//         <div className="flex gap-24">
//           <div className="flex flex-col gap-4">
//             <CoinFlipForm
//               id={"wager"}
//               label={"Wager"}
//               onChange={(e) => setWager(e.target.value)}
//               placeholder={"Choose Wager"}
//               type={"number"}
//               value={wager}
//             />
//             <CoinFlipForm
//               id={"bets"}
//               label={"Bets"}
//               onChange={(e) => setBet(e.target.value)}
//               placeholder={""}
//               type={"number"}
//               value={bet}
//             />

//             <div className="w-full grid grid-cols-2 gap-4">
//               <CoinFlipForm
//                 id={"totalwager"}
//                 label={"Total Wager"}
//                 onChange={(e) => setTotalwager(e.target.value)}
//                 placeholder={"-"}
//                 disabled={true}
//                 type={"number"}
//                 value={totalwager}
//                 className={'w-full'}
//               />{" "}
//               <CoinFlipForm
//                 id={"maxpayout"}
//                 label={"Max Payout"}
//                 onChange={(e) => setMaxPayout(e.target.value)}
//                 placeholder={"-"}
//                 disabled={true}
//                 type={"number"}
//                 value={maxPayout}
//               />
//             </div>

//             <Accordion
//               className="w-full bg-white border-none shadow-none"
//               type="single"
//               collapsible>
//               <AccordionItem className="max-w-full" value="item-1">
//                 <AccordionTrigger className="bg-transparent">
//                   Advanced
//                 </AccordionTrigger>
//                 <AccordionContent className="grid grid-cols-2 gap-4">
//                   <CoinFlipForm
//                     id={"stoponloss"}
//                     label={"Stop on Loss"}
//                     onChange={(e) => setStopOnLoss(e.target.value)}
//                     placeholder={"-"}
//                     type={"number"}
//                     value={stopOnLoss}
//                   />{" "}
//                   <CoinFlipForm
//                     id={"takeprofit"}
//                     label={"Take Profit"}
//                     onChange={(e) => setTakeprofit(e.target.value)}
//                     placeholder={"-"}
//                     type={"number"}
//                     value={takeprofit}
//                   />
//                 </AccordionContent>
//               </AccordionItem>
//             </Accordion>
//             <Button
//               onClick={startFlipping}
//               className="bg-main max-w-sm"
//               disabled={isBtnDisbled}>
//               Play
//             </Button>
//           </div>
//           <div className="md:flex hidden relative w-[300px] h-auto">
//             <CoinFlip isFlipping={isFlipping} result={result} />
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Page;
