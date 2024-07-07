"use client";
import GameInputForm from "@/components/GameInputForm";
import PlayButton from "@/components/PlayButton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { inputChecks } from "@/lib/utils";
import { setToken } from "@/redux/slices/tokenSlice";
import { playDiceGame } from "@/utils/helpers/diceHelpers";
import { playMineGame } from "@/utils/helpers/minesHelpers";
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
  const [board, setBoard] = useState(
    Array.from(
      { length: 5 },
      () => Array.from({ length: 5 }, () => Math.random() < 0.2) // 20% chance of being a mine
    )
  );
  const [revealed, setRevealed] = useState(
    Array.from({ length: 5 }, () => Array(5).fill(false))
  );
  const [selected, setSelected] = useState(
    Array.from({ length: 5 }, () => Array(5).fill(false))
  );
  const [isSettingMines, setIsSettingMines] = useState(true);

  const handleCellClick = (rowIndex, colIndex) => {
    if (isSettingMines) {
      // Toggle mine on cell click during mine setting mode
      const newBoard = board.map((row, rIdx) =>
        row.map((cell, cIdx) =>
          rIdx === rowIndex && cIdx === colIndex ? !cell : cell
        )
      );
      setBoard(newBoard);
    } else {
      // Toggle selection on click during selection mode
      const newSelected = selected.map((row, rIdx) =>
        row.map((cell, cIdx) =>
          rIdx === rowIndex && cIdx === colIndex ? !cell : cell
        )
      );
      setSelected(newSelected);
    }
  };

  const handleOpenCells = () => {
    // Reveal selected cells
    const newRevealed = revealed.map((row, rIdx) =>
      row.map((cell, cIdx) => (selected[rIdx][cIdx] ? true : cell))
    );
    setRevealed(newRevealed);

    // Reset the selected state
    const newSelected = selected.map((row) => row.map(() => false));
    setSelected(newSelected);

    // Add any additional logic you need here
    // For example, you might check for a win/loss condition
    const hasLost = board.some((row, rIdx) =>
      row.some((cell, cIdx) => cell && selected[rIdx][cIdx])
    );
    if (hasLost) {
      alert("Game over! You hit a mine.");
      // Reset the game or perform any other necessary actions
    } else {
      const allRevealed = newRevealed
        .flat()
        .every((cell, idx) => cell || board.flat()[idx]);
      if (allRevealed) {
        alert("Congratulations! You won.");
        // Reset the game or perform any other necessary actions
      }
    }

    const positions = findTruePositions(selected);
    console.log(positions);

    setTimeout(() => {
      resetGame();
    }, 2000);
  };
  function findTruePositions(arr) {
    const truePositions = [];

    arr.forEach((row, rowIndex) => {
      row.forEach((element, colIndex) => {
        if (element === true) {
          truePositions.push([rowIndex, colIndex]);
        }
      });
    });

    return truePositions;
  }

  const resetGame = () => {
    setBoard(generateBoard());
    setRevealed(Array.from({ length: 5 }, () => Array(5).fill(false)));
    setSelected(Array.from({ length: 5 }, () => Array(5).fill(false)));
    setIsSettingMines(true); // Reset to mine setting mode
  };

  const handleStartGame = () => {
    setIsSettingMines(false); // Switch to selection mode
  };

  const play = () => {
    playMineGame(w0, wager, setToken, ready, dispath);
    // const ifValidInputs = inputChecks("all", wager, bet, value);
    // console.log(ifValidInputs);
    // if (!ifValidInputs) return;
    // handleStartGame();
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
          {!isSettingMines ? (
            <Button onClick={handleOpenCells}>Open Selected Cells</Button>
          ) : (
            <PlayButton handler={play} tokens={token} />
          )}
        </div>
        <div className="md:flex hidden relative">
          <Mines
            board={board}
            handleCellClick={handleCellClick}
            handleOpenCells={handleOpenCells}
            revealed={revealed}
            selected={selected}
            isSettingMines={isSettingMines}
          />
        </div>
      </div>
    </main>
  );
};

export default Page;

const Mines = ({
  board,
  handleCellClick,
  handleOpenCells,
  revealed,
  selected,
  isSettingMines,
}) => {
  const hiddenImg = "";
  const selectedImg = "";
  const revealedMineImg = "";
  const revealedSafeImg = "";
  return (
    <div className="w-[550px] h-[550px] flex flex-col items-center justify-center">
      <div className="w-[475px] h-[475px]">
        <div className="w-full h-full grid grid-cols-5 grid-rows-5 gap-4">
          {board.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`w-full h-full cursor-pointer border-4 border-black rounded-base ${
                  revealed[rowIndex][colIndex]
                    ? cell
                      ? "bg-red-500"
                      : "bg-green-500"
                    : selected[rowIndex][colIndex]
                    ? "bg-yellow-500"
                    : "bg-blue-500"
                }`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
              >
                {revealed[rowIndex][colIndex] ? (
                  <img
                    src={cell ? revealedMineImg : revealedSafeImg}
                    alt={cell ? "Mine" : "Safe"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={selected[rowIndex][colIndex] ? selectedImg : hiddenImg}
                    alt={selected[rowIndex][colIndex] ? "Selected" : "Hidden"}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
