import { toast } from "@/components/ui/use-toast";
import { Contract, ethers } from "ethers";
import { slotMachineAddress, slotMachineABI } from "../contract";
import { fetchTokens } from "./webHelpers";

export const spinSlotMachine = async (
  w0,
  wager,
  setToken,
  ready,
  dispath,
  setIsRunning
) => {
  console.log("wager:", wager);
  setIsRunning(true);

  const provider = await w0?.getEthersProvider();
  const signer = await provider?.getSigner();

  const contractWager = ethers.utils.parseUnits(wager, "ether");

  console.log("contractWager:", contractWager.toString());
  const contract = new Contract(slotMachineAddress, slotMachineABI, signer);
  try {
    const txReceipt = await contract.SLOTMACHINE_PLAY(contractWager, {
      gasLimit: ethers.BigNumber.from("3000000"),
    });

    contract.on(
      "MinesGameOutcome",
      (
        playerAddress,
        wager,
        payout,
        tokenAddress,
        selectedPoints,
        minePositions
      ) => {
        console.log("MinesGameOutcome event detected:", {
          playerAddress,
          wager,
          payout,
          tokenAddress,
          selectedPoints,
          minePositions,
        });
      }
    );
  } catch (error) {
    console.log(error);
    toast({ title: "Error Occured!" });
  }
};
