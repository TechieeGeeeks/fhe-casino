import { toast } from "@/components/ui/use-toast";
import { Contract, ethers } from "ethers";
import {
  coinFlipAddress,
  conflipABI,
  handRockABI,
  handRockAddress,
} from "../contract";
import { fetchTokens } from "./webHelpers";

export const playHandRock = async (
  w0,
  wager,
  bets,
  userChoiced,
  stopGain,
  stopLoss,
  setToken,
  ready,
  dispath,
  setIsPlaying,
  stopPlaying
) => {
  console.log("w0:", w0);
  console.log("wager:", wager);
  console.log("bets:", bets);
  console.log("userChoiced:", userChoiced);
  console.log("stopGain:", stopGain);
  console.log("stopLoss:", stopLoss);
  console.log("userchoice: ", userChoiced);

  setIsPlaying(true);
  const provider = await w0?.getEthersProvider();
  const signer = await provider?.getSigner();

  const contractWager = ethers.utils.parseUnits(wager, "ether");
  let contractStopGain = "0";
  let contractStopLoss = "0";
  if (stopGain) contractStopGain = ethers.utils.parseUnits(stopGain, "ether");
  if (stopLoss) contractStopLoss = ethers.utils.parseUnits(stopLoss, "ether");
  const contractUserChoice = userChoiced;

  console.log("contractWager:", contractWager.toString());
  console.log("contractStopGain:", contractStopGain.toString());
  console.log("contractStopLoss:", contractStopLoss.toString());
  console.log("contractUserChoice:", contractUserChoice);

  const contract = new Contract(handRockAddress, handRockABI, signer);
  try {
    const txReceipt = await contract.ROCKPAPERSCISSORS_PLAY(
      contractWager,
      contractUserChoice,
      bets,
      contractStopGain,
      contractStopLoss,
      {
        gasLimit: 7920027,
      }
    );

    contract.on(
      "RockPaperScissors_Outcome_Event",
      (
        playerAddress,
        wager,
        payout,
        tokenAddress,
        payouts,
        randomNumberArray,
        numGames
      ) => {
        console.log("RockPaperScissors_Outcome_Event triggered");
        console.log("Player Address:", playerAddress);
        console.log("Wager:", wager.toString());
        console.log("Payout:", payout.toString());
        console.log("Token Address:", tokenAddress);
        console.log(
          "Payouts:",
          payouts.map((p) => p.toString())
        );
        console.log("Random Number Array:", randomNumberArray);
        console.log("Number of Games:", numGames.toString());
        const modArr = randomNumberArray.map((num) => num % 3);

        setIsPlaying(false);
        stopPlaying(modArr);
      }
    );
  } catch (error) {
    setIsPlaying(false);
    console.log(error);
    toast({ title: "Error Occured!" });
  }
};
