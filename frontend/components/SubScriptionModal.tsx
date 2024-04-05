import { HiX } from "react-icons/hi";
import { useWriteContract } from "wagmi";
import abi from "../contracts/contract-abi.json";
import Web3 from "web3";
import { useGlobalContext } from "../providers/GlobalStateProvider";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SubScriptionModal() {
  const { setOpenSubscription, contractAddress } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(false);
  const { writeContractAsync } = useWriteContract();
  const router = useRouter();

  const subscribe = async () => {
    setIsLoading(true);
    try {
      const txResponse = await writeContractAsync({
        abi: abi,
        address: contractAddress!,
        functionName: "activateSubscription",
        value: Web3.utils.toBigInt(Web3.utils.toWei("0.01", "ether")),
      });
      console.log(txResponse)
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setOpenSubscription?.((prev) => !prev);
      router.refresh();
    }
  };

  return (
    <div className="bg-black/30 main-body transition-all ease-in-out duration-200 px-2 sm:px-0 absolute flex justify-center items-center top-0 right-0 bottom-0 left-0 min-h-[100vh] z-50">
      <div className="bg-white relative text-center rounded-md p-10 flex items-center justify-center flex-col">
        <HiX
          onClick={() => setOpenSubscription?.((prev) => !prev)}
          className="absolute top-3 right-3 cursor-pointer"
        />
        {isLoading ? (
          <div className="text-center mb-5">
            <h2 className="font-semibold text-xl">Awaiting Confirmation</h2>
            <img
              src="/loader.svg"
              alt="loading..."
              className="h-[100px] w-[100px] mx-auto"
            />
          </div>
        ) : (
          <div className="w-[300px]">
            <p>
              You are about to pay 0.01 ETH for our monthly subscription plan.
            </p>
            <p className="my-3">
              Cancel your subscription within 7 days and get back half of your
              initial deposit.
            </p>
            <button
              onClick={subscribe}
              className="bg-blue-500 text-white font-medium p-2 rounded-md"
            >
              Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
