// import { useGlobalContext } from "@/providers/GlobalStateProvider";
import { HiX } from "react-icons/hi";
import { useWriteContract } from "wagmi";
import abi from "../contracts/contract-abi.json";
import { useGlobalContext } from "../providers/GlobalStateProvider";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UnsubscriptionModal() {
  const { setOpenRemoveSubscription, contractAddress } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(false);
  const { writeContractAsync } = useWriteContract();
  const router = useRouter();

  const unsubscribe = async () => {
    setIsLoading(true);
    try {
      const txResponse = await writeContractAsync({
        abi: abi,
        address: contractAddress!,
        functionName: "deactivateSubscription",
      });
    } catch (error) {
      console.error(error); // Handle any errors
    } finally {
      setIsLoading(false);
      setOpenRemoveSubscription?.((prev) => !prev);
      router.refresh();
    }
  };

  return (
    <div className="bg-black/30 main-body transition-all ease-in-out duration-200 px-2 sm:px-0 absolute flex justify-center items-center top-0 bottom-0 right-0 left-0 min-h-[100vh] z-50">
      <div className="bg-white relative rounded-md p-10 flex items-center justify-center flex-col">
        <HiX
          onClick={() => setOpenRemoveSubscription?.((prev) => !prev)}
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
          <div className="text-center">
            <p className="mb-5">Are you sure you want to unsubscribe?</p>
            <button
              onClick={unsubscribe}
              className="bg-red-500 text-white font-medium p-2 rounded-md"
            >
              Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
