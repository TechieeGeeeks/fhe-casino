import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const gameState = [
  {
    time: "10:00 AM",
    game: "Poker",
    player: "John Doe",
    wager: "$50",
    multiplier: "4x",
    profit: "$200",
  },
  {
    time: "10:30 AM",
    game: "Blackjack",
    player: "Jane Smith",
    wager: "$75",
    multiplier: "2x",
    profit: "$150",
  },
  {
    time: "11:00 AM",
    game: "Roulette",
    player: "Bob Johnson",
    wager: "$100",
    multiplier: "3x",
    profit: "$300",
  },
  {
    time: "11:30 AM",
    game: "Baccarat",
    player: "Alice Brown",
    wager: "$60",
    multiplier: "5x",
    profit: "$300",
  },
  {
    time: "12:00 PM",
    game: "Craps",
    player: "Chris Green",
    wager: "$40",
    multiplier: "6x",
    profit: "$240",
  },
  {
    time: "12:30 PM",
    game: "Slots",
    player: "Emily White",
    wager: "$30",
    multiplier: "10x",
    profit: "$300",
  },
  {
    time: "1:00 PM",
    game: "Keno",
    player: "Michael Black",
    wager: "$20",
    multiplier: "7x",
    profit: "$140",
  },
];

import React from "react";

const CustomTable = () => {
  return (
    <div className="grid place-items-center w-full max-w-5xl">
      <Table>
        <TableCaption>A list of your recent transactions.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Time</TableHead>
            <TableHead>Game</TableHead>
            <TableHead>Player</TableHead>
            <TableHead>Wager</TableHead>
            <TableHead>Multiplier</TableHead>
            <TableHead className="text-right">Profit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {gameState.map((gameInfo, index) => (
            <TableRow
              key={index}
              className={`${index % 2 === 0 ? "bg-bg" : "bg-white"}`}>
              <TableCell className="font-base">{gameInfo.time}</TableCell>
              <TableCell>{gameInfo.game}</TableCell>
              <TableCell>{gameInfo.player}</TableCell>
              <TableCell>{gameInfo.wager}</TableCell>
              <TableCell>{gameInfo.multiplier}</TableCell>
              <TableCell className="text-right">{gameInfo.profit}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CustomTable;
