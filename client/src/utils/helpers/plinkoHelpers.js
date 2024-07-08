import { toast } from "@/components/ui/use-toast";
import { Contract, ethers } from "ethers";
import {
  slotMachineAddress,
  slotMachineABI,
  plinkoAddress,
  plinkoABI,
} from "../contract";
import { fetchTokens } from "./webHelpers";

export const playPlinkoGame = async (
  w0,
  wager,
  setToken,
  ready,
  dispath,
  setNumbers
) => {
  console.log("wager:", wager);

  const provider = await w0?.getEthersProvider();
  const signer = await provider?.getSigner();

  const contractWager = ethers.utils.parseUnits(wager, "ether");

  console.log("contractWager:", contractWager.toString());
  const contract = new Contract(plinkoAddress, plinkoABI, signer);
  try {
    const txReceipt = await contract.PLINKO_PLAY(contractWager, {
      gasLimit: ethers.BigNumber.from("3000000"),
    });

    contract.on(
      "Plinko_Outcome_Event",
      (playerAddress, wager, payout, tokenAddress, randomBits, spinPayout) => {
        console.log("Plinko_Outcome_Event triggered");
        console.log("Player Address:", playerAddress);
        console.log("Wager:", wager.toString());
        console.log("Payout:", payout.toString());
        console.log("Token Address:", tokenAddress);
        console.log("Random Bits:", randomBits);
        console.log("Spin Payout:", spinPayout.toString());
        const sum = randomBits.reduce((accumulator, currentValue) => {
          return accumulator + (currentValue === 1 ? 1 : -1);
        }, 0);

        console.log(sum); // Output: 1
        // You can handle the event data here (e.g., update state, UI, etc.)
      }
    );
  } catch (error) {
    // setIsRunning(false);
    console.log(error);
    toast({ title: "Error Occured!" });
  }
};
