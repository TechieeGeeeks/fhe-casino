import { toast } from "@/components/ui/use-toast";
import { Contract, ethers } from "ethers";
import {
  slotMachineAddress,
  slotMachineABI,
  minesAddress,
  minesABI,
} from "../contract";
import { fetchTokens } from "./webHelpers";

export const playMineGame = async (
  w0,
  wager,
  setToken,
  ready,
  dispath,
  numberOfMines,
  minesBettingPositions
) => {
  const selected = [
    [1, 0],
    [1, 1],
    [1, 2],
    [1, 3],
    [1, 4],
  ];

  const difficulty = 3; //1-5
  console.log("wager:", wager);

  // const minesBettingPositions = [
  //   [1, 2],
  //   [0, 4],
  //   [3, 1],
  // ];

  const provider = await w0?.getEthersProvider();
  const signer = await provider?.getSigner();

  const wagerValue = ethers.utils.parseUnits(wager, "ether");
  // const wagerValue = ethers.utils.parseUnits("10", "ether");

  // console.log("contractWager:", contractWager.toString());
  const contract = new Contract(minesAddress, minesABI, signer);

  try {
    const txReceipt = await contract.MINES_PLAY(
      minesBettingPositions,
      numberOfMines,
      wagerValue,
      { gasLimit: 2000000 }
    );

    // Return a promise that resolves when the event is emitted
    const waitForEvent = new Promise((resolve, reject) => {
      let count = 0;

      const eventListener = (
        playerAddress,
        wager,
        payout,
        tokenAddress,
        spin,
        spinPayout,
        minePositions
      ) => {
        count++;
        if (count === 1) {
          console.log("MinesGameOutcome: ");
          console.log("Player Address:", playerAddress);
          console.log("Wager:", wager.toString());
          console.log("Payout:", payout.toString());
          console.log("Token Address:", tokenAddress);
          console.log("Spin:", spin);
          console.log("Spin Payout:", spinPayout.toString());
          console.log("Mines Positions:", minePositions.args[5]);
          minePositions.args.map((element, index) => {
            console.log(`Mine Positions: ${index}`, element);
          });
          // setMinesPositions(minePositions.args[5]);
          contract.off("MinesGameOutcome", eventListener);
          resolve(minePositions.args[5]);
        }
      };

      contract.on("MinesGameOutcome", eventListener);

      // Add a timeout to reject the promise if the event doesn't occur within a reasonable time
      setTimeout(() => {
        contract.off("MinesGameOutcome", eventListener);
        reject(new Error("Event did not occur within the expected timeframe"));
      }, 60000); // Adjust timeout as needed
    });

    return await waitForEvent;
  } catch (error) {
    console.log(error);
    toast({ title: "Error Occured!" });
    return false;
  }
};
