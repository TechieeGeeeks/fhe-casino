import { toast } from "@/components/ui/use-toast";
import { Contract, ethers } from "ethers";
import { diceABI, diceAddress } from "../contract";
import { fetchTokens } from "./webHelpers";
import { ready } from "localforage";

export const playDiceGame = async (w0, wager, userChoiced) => {
  const isOver = false; //false === peeche
  console.log("w0:", w0);
  console.log("wager:", wager);
  console.log("userChoiced:", userChoiced);

  const provider = await w0?.getEthersProvider();
  const signer = await provider?.getSigner();

  const contractWager = ethers.utils.parseUnits(wager, "ether");

  console.log("contractWager:", contractWager.toString());

  const contract = new Contract(diceAddress, diceABI, signer);
  try {
    const txReceipt = await contract.DICE_PLAY(
      userChoiced[0],
      isOver,
      contractWager,
      {
        gasLimit: 7920027,
      }
    );

    contract.on(
      "Dice_Outcome_Event",
      (playerAddress, wager, payout, tokenAddress, diceValue) => {
        console.log("Dice_Outcome_Event: ");
        console.log("Player:", playerAddress);
        console.log("Wager:", wager.toString());
        console.log("Payout:", payout.toString());
        console.log("Token Address:", tokenAddress);
        console.log("diceValue:", diceValue);
        // fetchTokens(w0, setToken, dispath);
      }
    );
  } catch (error) {
    console.log(error);
    toast({ title: "Error Occured!" });
  }
};
