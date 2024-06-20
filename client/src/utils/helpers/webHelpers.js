import { toast } from "@/components/ui/use-toast";
import { Contract, ethers } from "ethers";
import { coinFlipAddress, tokenABI, tokenContractAddress } from "../contract";

export const fetchTokens = async (w0, setTokens, ready, dispatch) => {
  if (!ready) return;
  const provider = await w0?.getEthersProvider();
  const signer = await provider?.getSigner();
  const address = w0.address;
  const contract = new Contract(tokenContractAddress, tokenABI, signer);
  try {
    const balance = await contract.balanceOf(address);
    const bigNumber = ethers.BigNumber.from(balance);
    dispatch(setTokens(bigNumber.toString()));
    // setTokens(bigNumber.toString());
  } catch (error) {
    console.log(error);
    toast({ title: "Error Occured!" });
  }
};
