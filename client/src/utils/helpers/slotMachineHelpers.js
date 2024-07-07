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
  setIsRunning,
  setNumbers
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
      "SlotMachine_Outcome_Event",
      (playerAddress, wager, payout, tokenAddress, spin, spinPayout) => {
        console.log("SlotMachine_Outcome_Event triggered");
        console.log("Player Address:", playerAddress);
        console.log("Wager:", wager.toString());
        console.log("Payout:", payout.toString());
        console.log("Token Address:", tokenAddress);
        console.log("Spin:", spin);
        console.log("Spin Payout:", spinPayout.toString());
        setNumbers(spin);
        setIsRunning(false);
      }
    );
  } catch (error) {
    setIsRunning(false);
    console.log(error);
    toast({ title: "Error Occured!" });
  }
};
