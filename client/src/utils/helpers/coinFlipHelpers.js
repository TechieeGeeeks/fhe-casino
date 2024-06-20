import { toast } from "@/components/ui/use-toast";
import { Contract, ethers } from "ethers";
import { coinFlipAddress, conflipABI } from "../contract";

export const playFlipGame = async (
  w0,
  wager,
  bets,
  userChoiced,
  stopGain,
  stopLoss
) => {
  console.log("w0:", w0);
  console.log("wager:", wager);
  console.log("bets:", bets);
  console.log("userChoiced:", userChoiced);
  console.log("stopGain:", stopGain);
  console.log("stopLoss:", stopLoss);

  const provider = await w0?.getEthersProvider();
  const signer = await provider?.getSigner();
  const address = w0.address;

  const contractWager = ethers.utils.parseUnits(wager, "ether");
  let contractStopGain = "0";
  let contractStopLoss = "0";
  if (stopGain) contractStopGain = ethers.utils.parseUnits(stopGain, "ether");
  if (stopLoss) contractStopLoss = ethers.utils.parseUnits(stopLoss, "ether");
  const contractUserChoice = userChoiced === "Heads" ? false : true;

  const contract = new Contract(coinFlipAddress, conflipABI, signer);
  try {
    const txReceipt = await contract.play(
      contractWager,
      contractUserChoice,
      bets,
      contractStopGain,
      contractStopLoss
    );
    // const bigNumber = ethers.BigNumber.from(balance);

    contract.on(
      "CoinFlip_Play_Event",
      (player, wager, isHeads, numBets, stopGain, stopLoss, event) => {
        console.log("CoinFlip_Play_Event:", {
          player,
          wager: wager.toString(),
          isHeads,
          numBets: numBets.toString(),
          stopGain: stopGain.toString(),
          stopLoss: stopLoss.toString(),
        });
      }
    );

    // Event listener for CoinFlip_Outcome_Event
    contract.on(
      "CoinFlip_Outcome_Event",
      (
        player,
        wager,
        payout,
        tokenAddress,
        coinResults,
        individualPayouts,
        numGames,
        event
      ) => {
        console.log("CoinFlip_Outcome_Event:", {
          player,
          wager: wager.toString(),
          payout: payout.toString(),
          tokenAddress,
          coinResults,
          individualPayouts,
          numGames: numGames.toString(),
        });
      }
    );
  } catch (error) {
    console.log(error);
    toast({ title: "Error Occured!" });
  }
};
