import { toast } from "@/components/ui/use-toast";
import { Contract, ethers } from "ethers";
import { coinFlipAddress, tokenABI, tokenContractAddress } from "../contract";
import { fetchTokens } from "./webHelpers";

// export const approveTokens = async (
//   w0,
//   setLoading,
//   setIsMintLoading,
//   setCrntState,
//   crntState,
//   address
// ) => {
//   setIsMintLoading(false);
//   const provider = await w0?.getEthersProvider();
//   const signer = await provider?.getSigner();
//   const contract = new Contract(tokenContractAddress, tokenABI, signer);
//   setLoading(() => true);
//   setCrntState(() => 0);
//   try {
//     const receipt = await contract.approve(
//       tokenContractAddress,
//       "10000000000000000000000000000000000"
//     );
//     let count = 0;
//     contract.on("Approval", (owner, spender, value) => {
//       if (owner === w0.address) {
//         count++;
//         if (count == 1) {
//           setCrntState(() => 2);
//           setTimeout(() => {
//             setLoading(() => false);
//             toast({ title: "Tokens minted successfully!" });
//           }, 1000);
//         }
//       }
//     });
//   } catch (error) {
//     setLoading(false);
//     console.log(error);
//     toast({ title: "Error Occured!" });
//   }
// };

export const mintToken = async (
  w0,
  setLoading,
  setIsMintLoading,
  setCrntState,
  setToken,
  ready,
  dispatch
) => {
  const provider = await w0?.getEthersProvider();
  const signer = await provider?.getSigner();

  const tokenContract = new Contract(tokenContractAddress, tokenABI, signer);

  try {
    const receipt = await tokenContract.transferFromOwner();
    if (receipt?.from === w0.address) {
      setLoading(true);
      setIsMintLoading(() => true);
      setCrntState(() => 0);
    }
    let count = 0;

    tokenContract.on("Transfer", (from, to, amount) => {
      if (to === w0.address) {
        count++;
        if (count == 1) {
          setCrntState(() => 1);
          fetchTokens(w0, setToken, ready, dispatch);
          setTimeout(() => {
            setLoading(() => false);
            setIsMintLoading(() => false);
            toast({ title: "Tokens minted successfully!" });
          }, 1000);
        }
      }
    });
  } catch (error) {
    console.log(error)
    toast({ title: "Error Occured!" });
    setLoading(false);
    setIsMintLoading(() => false);
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
