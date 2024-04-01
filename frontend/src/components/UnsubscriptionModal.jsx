"use client";

import { GlobalStateContext } from "@/providers/GlobalStateProvider";
import { useContext } from "react";
import { HiX } from "react-icons/hi";
import { useWriteContract } from "wagmi";
import abi from "../contracts/contract-abi.json";

export default function UnsubscriptionModal() {
  const { setOpenRemoveSubscription, contractAddress } = useContext(GlobalStateContext);
  const { writeContractAsync } = useWriteContract();

  const unsubscribe = async () => {
    try {
      const txResponse = await writeContractAsync({
        abi: abi,
        address: contractAddress,
        functionName: "deactivateSubscription",
      });
      console.log(txResponse); // Log the transaction response
    } catch (error) {
      console.error(error); // Handle any errors
    }
  };


  return (
    <div className="bg-black/30 transition-all ease-in-out duration-200 px-2 sm:px-0 absolute flex justify-center items-center top-0 bottom-0 right-0 left-0 min-h-[100vh] z-50">
      <div className="bg-white relative rounded-md p-10 flex items-center justify-center flex-col">
        <HiX
          onClick={() => setOpenRemoveSubscription((prev) => !prev)}
          className="absolute top-3 right-3 cursor-pointer"
        />
        <p className="mb-5">
          Hi, you are about to unsubscribe from our monthly plan.
        </p>
        <button
          onClick={unsubscribe}
          className="bg-blue-500 text-white font-medium p-2 rounded-md"
        >
          Unsubscribe
        </button>
      </div>
    </div>
  );
}