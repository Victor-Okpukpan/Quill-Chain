import { HiX } from "react-icons/hi";
import { useWriteContract } from "wagmi";
import abi from "../contracts/contract-abi.json";
import Web3 from "web3";
import { useGlobalContext } from "../providers/GlobalStateProvider";
// import { useGlobalContext } from "@/providers/GlobalStateProvider";

export default function SubScriptionModal() {
  const { setOpenSubscription, contractAddress } = useGlobalContext();
  const { writeContractAsync } = useWriteContract();

  const subscribe = async () => {
    setOpenSubscription?.((prev) => !prev);
    try {
      const txResponse = await writeContractAsync({
        abi: abi,
        address: contractAddress!,
        functionName: "activateSubscription",
        value: Web3.utils.toBigInt(Web3.utils.toWei("0.01", "ether")),
      });
      console.log(txResponse); // Log the transaction response
    } catch (error) {
      console.error(error); // Handle any errors
    }
  };

  return (
    <div className="bg-black/30 main-body transition-all ease-in-out duration-200 px-2 sm:px-0 absolute flex justify-center items-center top-0 right-0 bottom-0 left-0 min-h-[100vh] z-50">
      <div className="bg-white relative rounded-md p-10 flex items-center justify-center flex-col">
        <HiX
          onClick={() => setOpenSubscription?.((prev) => !prev)}
          className="absolute top-3 right-3 cursor-pointer"
        />
        <p>
          Welcome to QuillChain! To enjoy all the features and benefits, you&apos;ll
          need to subscribe.
        </p>
        <ul className="my-5 flex flex-col items-start justify-start text-sm">
          <li>
            <span className="font-medium text-base">Duration:</span> 1 month
          </li>
          <li>
            <span className="font-medium text-base">Cost:</span> 0.01 ETH
          </li>
          <li>
            <span className="font-medium text-base  ">Refund:</span> Unsubscribe
            within 7 days to get back half of your initial deposit.
          </li>
        </ul>
        <p className="mb-5 text-center">
          Please ensure you have enough ETH in your wallet to cover the
          subscription fee.
        </p>
        <button
          onClick={subscribe}
          className="bg-blue-500 text-white font-medium p-2 rounded-md"
        >
          Subscribe
        </button>
      </div>
    </div>
  );
}
