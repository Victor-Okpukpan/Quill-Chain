"use client";

import { GlobalStateContext } from "@/providers/GlobalStateProvider";
import { useContext } from "react";
import { HiX } from "react-icons/hi";
import { useWriteContract } from "wagmi";
import abi from "../contracts/contract-abi.json";
import Web3 from "web3";

export default function SubScriptionModal() {
  const { setOpenSubscription, contractAddress } = useContext(GlobalStateContext);
  const { writeContractAsync } = useWriteContract();

  const subscribe = async () => {
    try {
      const txResponse = await writeContractAsync({
        abi: abi,
        address: contractAddress,
        functionName: "activateSubscription",
        value: Web3.utils.toWei("0.01", "ether")
      });
      console.log(txResponse); // Log the transaction response
    } catch (error) {
      console.error(error); // Handle any errors
    }
  };

  return (
    <div
      onClick={(e) => {
        if (e.target.classList.contains("main-body")) {
          setOpenSubscription((prev) => !prev);
        }
      }}
      className="bg-black/30 main-body transition-all ease-in-out duration-200 px-2 sm:px-0 absolute flex justify-center items-center top-0 right-0 bottom-0 left-0 min-h-[100vh] z-50"
    >
      <div className="bg-white relative rounded-md p-10 flex items-center justify-center flex-col">
        <HiX
          onClick={() => setOpenSubscription((prev) => !prev)}
          className="absolute top-3 right-3 cursor-pointer"
        />
        <p className="mb-5">
          Hi, you are about to subscribe for our monthly plan.
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