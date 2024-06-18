import { toast } from "@/components/ui/use-toast";
import { Contract, ethers } from "ethers";
import { coinFlipAddress, conflipABI } from "./contract";

export const fetchTokens = async (w0, setTokens) => {
  //   const provider = await w0?.getEthersProvider();
  //   const signer = await provider?.getSigner();
  //   const address = w0.address;
  //   const contract = new Contract(contractAddress, contractABI, signer);
  //   try {
  //     const balance = await contract.balanceOf(address);
  //     const bigNumber = ethers.BigNumber.from(balance);
  //     // console.log(bigNumber.toString());
  //   } catch (error) {
  //     console.log(error);
  //     toast({ title: "Error Occured!" });
  //     // setSpin(false);
  //   }
};
