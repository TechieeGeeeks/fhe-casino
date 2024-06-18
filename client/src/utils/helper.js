import { toast } from "@/components/ui/use-toast";
import { Contract, ethers } from "ethers";
import { tokenABI, tokenContractAddress } from "./contract";

export const fetchTokens = async (w0, setTokens) => {
  const provider = await w0?.getEthersProvider();
  const signer = await provider?.getSigner();
  const address = w0.address;
  const contract = new Contract(tokenContractAddress, tokenABI, signer);
  try {
    const balance = await contract.balanceOf(address);
    console.log(balance)
    const bigNumber = ethers.BigNumber.from(balance);
    console.log(bigNumber.toString());
    setTokens(bigNumber.toString());
  } catch (error) {
    console.log(error);
    toast({ title: "Error Occured!" });
    // setSpin(false);
  }
};
