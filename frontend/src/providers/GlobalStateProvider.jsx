"use client";
import { createContext, useEffect, useState } from "react";
import { useReadContract } from "wagmi";
import abi from "../contracts/contract-abi.json";
import { useAccount } from "wagmi";

export const GlobalStateContext = createContext();

const GlobalStateProvider = ({ children }) => {
  const { address } = useAccount();
  const [isSubscribed, setIsSubscribed] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [remainingDays, setRemainingDays] = useState(null);
  const [exceeded, setExceeded] = useState(false);
  const [openSubscription, setOpenSubscription] = useState(false);
  const [openRemoveSubscription, setOpenRemoveSubscription] = useState(false);

  const contractAddress = "0x977B9ed055EDF61F99261b3Da22d6922f4796903";

  const { data: subStatus } = useReadContract({
    abi: abi,
    address: contractAddress,
    functionName: "isSubscribed",
    args: [address],
    watch: true,
  });

  const { data: subStartDate } = useReadContract({
    abi: abi,
    address: contractAddress,
    functionName: "getSubscriptionStartDate",
    args: [address],
    watch: true,
  });

  const { data: subEndDate } = useReadContract({
    abi: abi,
    address: contractAddress,
    functionName: "getSubscriptionEndDate",
    args: [address],
    watch: true,
  });

  function hasExceededSevenDays(date) {
    const start = new Date(Number(date.toString()) * 1000);
    start.setDate(start.getDate() + 7);
    const now = new Date();
    return now > start;
  }

  function daysRemaining(date){
    const endDate = new Date(Number(date.toString()) * 1000);
    const now = new Date();
    const difference = endDate - now;
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));

    return { days };
  }

  useEffect(() => {
    setIsSubscribed(subStatus);
  }, [subStatus]);

  useEffect(() => {
    if (isSubscribed) {
      setStartDate(subStartDate);
      setEndDate(subEndDate);
    }
  }, [isSubscribed, subStartDate, subEndDate]);

  useEffect(() => {
    if (startDate !== null && endDate !== null) {
      setExceeded(hasExceededSevenDays(startDate));
      setRemainingDays(daysRemaining(endDate));
    }
  }, [startDate]);

  return (
    <GlobalStateContext.Provider
      value={{
        isSubscribed,
        setIsSubscribed,
        openSubscription,
        setOpenSubscription,
        openRemoveSubscription,
        setOpenRemoveSubscription,
        startDate,
        contractAddress,
        exceeded,
        remainingDays
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

export default GlobalStateProvider;
