import { toast } from "@/components/ui/use-toast";
import { Contract, ethers } from "ethers";
import {
  slotMachineAddress,
  slotMachineABI,
  minesAddress,
  minesABI,
} from "../contract";
import { fetchTokens } from "./webHelpers";

export const playMineGame = async (w0, wager, setToken, ready, dispath) => {
  const selected = [
    [1, 0],
    [1, 1],
    [1, 2],
    [1, 3],
    [1, 4],
  ]; //length no lenth

  const difficulty = 3; //1-5
  console.log("wager:", wager);
  //   setIsRunning(true);
  const minesBettingPositions = [
    [1, 2],
    [0, 4],
    [3, 1],
  ];

  const provider = await w0?.getEthersProvider();
  const signer = await provider?.getSigner();

  const contractWager = ethers.utils.parseUnits(wager, "ether");
  const wagerValue = ethers.utils.parseUnits("10", "ether");

  console.log("contractWager:", contractWager.toString());
  const contract = new Contract(minesAddress, minesABI, signer);
  try {
    const txReceipt = await contract.MINES_PLAY(
      minesBettingPositions,
      4,
      wagerValue,
      { gasLimit: 2000000 }
    );

    contract.on(
      "MinesGameOutcome",
      (
        playerAddress,
        wager,
        payout,
        tokenAddress,
        spin,
        spinPayout,
        minePositions
      ) => {
        console.log("MinesGameOutcome: ");
        console.log("Player Address:", playerAddress);
        console.log("Wager:", wager.toString());
        console.log("Payout:", payout.toString());
        console.log("Token Address:", tokenAddress);
        console.log("Spin:", spin);
        console.log("Spin Payout:", spinPayout.toString());
        console.log("Mines Positions:", minePositions);
        // setNumbers(spin);
        // setIsRunning(false);
      }
    );
  } catch (error) {
    // setIsRunning(false);
    console.log(error);
    toast({ title: "Error Occured!" });
  }
};
