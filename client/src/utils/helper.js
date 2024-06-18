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
    console.log(balance);
    const bigNumber = ethers.BigNumber.from(balance);
    console.log(bigNumber.toString());
    setTokens(bigNumber.toString());
  } catch (error) {
    console.log(error);
    toast({ title: "Error Occured!" });
    // setSpin(false);
  }
};

export const mintToken = async (
  w0,
  setLoading,
  setIsMintLoading,
  setCrntState,
  crntState
) => {
  const provider = await w0?.getEthersProvider();
  const signer = await provider?.getSigner();

  const tokenContract = new Contract(tokenContractAddress, tokenABI, signer);

  try {
    const receipt = await tokenContract.transferFromOwner();
    if (receipt?.from === w0.address) {
      setLoading(true);
      setIsMintLoading(true);
      setCrntState(() => 0);;
    }
    let count = 0;

    tokenContract.on("Transfer", (from, to, amount) => {
      if (to === w0.address) {
        count++;
        if (count == 1) {
          setCrntState(() => 1);
          setTimeout(() => {
            setLoading(() => false);
            toast({ title: "Tokens minted successfully!" });
          }, 1000);
        }
      }
    });
  } catch (error) {
    toast({ title: "Error Occured!" });
    setLoading(false);
  }
};

// export const approveBugs = async (
//   w0,
//   depositAmmount,
//   setIsApprove,
//   setWaitingForApproval,
//   setReloadPage,
//   setBugsApprovalAmount,
//   setApproveCurrentStates,
//   approveCurrentStates,
//   setLoading,
//   loading
// ) => {
//   setWaitingForApproval(true);
//   setApproveCurrentStates((prev) => -1);
//   const provider = await w0?.getEthersProvider();
//   const signer = await provider?.getSigner();

//   const bugsContract = new Contract(bugsContractAddress, bugsABI, signer);

//   const price = ethers.utils.parseUnits(depositAmmount, "ether");

//   try {
//     const receipt = await bugsContract.approve(
//       bugsBridgeContractAddress,
//       price
//     );
//     if (receipt?.from === w0.address) {
//       setLoading(true);
//       setApproveCurrentStates(0);
//     }
//     let count = 0;
//     bugsContract.on("Approval", (owner, spender, value) => {
//       count++;
//       if (count === 1) {
//         setApproveCurrentStates(1);
//         setIsApprove(true);
//         setWaitingForApproval(false);
//         const randomNumber = Math.floor(Math.random * 10000);
//         setApproveCurrentStates(2);
//         setReloadPage(randomNumber);
//       }
//       setTimeout(() => {
//         setLoading(false);
//       }, 1500);
//     });
//     toast.success("Token Approved successfully!");
//     console.log("Event listener set up and running...");
//   } catch (error) {
//     toast("Error Occured!");
//     setWaitingForApproval(false);
//     setLoading(false);
//   }
// };
