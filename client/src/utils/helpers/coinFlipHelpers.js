import { toast } from "@/components/ui/use-toast";
import { Contract, ethers } from "ethers";
import { coinFlipAddress, conflipABI } from "../contract";
import { fetchTokens } from "./webHelpers";
import { ready } from "localforage";

export const playFlipGame = async (
  w0,
  wager,
  bets,
  userChoiced,
  stopGain,
  stopLoss,
  setToken,
  ready,
  dispath,
  stopFlipping,
  setResult,
  setOpen
) => {
  console.log("w0:", w0);
  console.log("wager:", wager);
  console.log("bets:", bets);
  console.log("userChoiced:", userChoiced);
  console.log("stopGain:", stopGain);
  console.log("stopLoss:", stopLoss);

  const provider = await w0?.getEthersProvider();
  const signer = await provider?.getSigner();

  const contractWager = ethers.utils.parseUnits(wager, "ether");
  let contractStopGain = "0";
  let contractStopLoss = "0";
  if (stopGain) contractStopGain = ethers.utils.parseUnits(stopGain, "ether");
  if (stopLoss) contractStopLoss = ethers.utils.parseUnits(stopLoss, "ether");
  const contractUserChoice = userChoiced === "heads" ? true : false;

  console.log("contractWager:", contractWager.toString());
  console.log("contractStopGain:", contractStopGain.toString());
  console.log("contractStopLoss:", contractStopLoss.toString());
  console.log("contractUserChoice:", contractUserChoice);

  const contract = new Contract(coinFlipAddress, conflipABI, signer);
  try {
    const txReceipt = await contract.COINFLIP_PLAY(
      contractWager,
      contractUserChoice,
      bets,
      contractStopGain,
      contractStopLoss,
      {
        gasLimit: ethers.BigNumber.from("7920027"), 
      }
    );

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
        // setResult(() => coinResults);
        setOpen(true);
        fetchTokens(w0, setToken, ready, dispath);
        stopFlipping(coinResults);
      }
    );
  } catch (error) {
    stopFlipping("Coin");
    console.log(error);
    toast({ title: "Error Occured!" });
  }
};
