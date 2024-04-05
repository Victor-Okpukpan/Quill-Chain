import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from "react";
import { useReadContract } from "wagmi";
import abi from "../contracts/contract-abi.json";
import { useAccount } from "wagmi";

// Step 1: Define the Context Type
type GlobalStateContextType = {
  isSubscribed: boolean | null;
  setIsSubscribed?: React.Dispatch<React.SetStateAction<boolean | null>>;
  openSubscription?: boolean;
  setOpenSubscription?: React.Dispatch<React.SetStateAction<boolean>>;
  openRemoveSubscription?: boolean;
  setOpenRemoveSubscription?: React.Dispatch<React.SetStateAction<boolean>>;
  startDate?: string | null;
  contractAddress?: `0x${string}`;
  exceeded?: boolean;
  remainingDays?: { days: any } | null;
};

// Step 2: Create the Context with Default Values
const GlobalStateContext = createContext<GlobalStateContextType>({
   isSubscribed: false
});

export const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
  const { address } = useAccount();
  const [isSubscribed, setIsSubscribed] = useState<boolean | null>(null);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  console.log("enddate:", endDate);
  const [remainingDays, setRemainingDays] = useState<{ days: number } | null>(
    null
  );
  const [exceeded, setExceeded] = useState<boolean>(false);
  const [openSubscription, setOpenSubscription] = useState<boolean>(false);
  const [openRemoveSubscription, setOpenRemoveSubscription] =
    useState<boolean>(false);

  const contractAddress: `0x${string}` = "0x977B9ed055EDF61F99261b3Da22d6922f4796903";

  const { data: subStatus } = useReadContract({
    abi: abi,
    address: contractAddress,
    functionName: "isSubscribed",
    args: [address],
  });

  const { data: subStartDate } = useReadContract({
    abi: abi,
    address: contractAddress,
    functionName: "getSubscriptionStartDate",
    args: [address],
  });

  const { data: subEndDate } = useReadContract({
    abi: abi,
    address: contractAddress,
    functionName: "getSubscriptionEndDate",
    args: [address],
  });

  function hasExceededSevenDays(date: bigint) {
    const start = new Date(Number(date.toString()) * 1000);
    start.setDate(start.getDate() + 7);
    const now = new Date();
    return now > start;
  }

  function daysRemaining(date: bigint) {
    const endDate = new Date(Number(date.toString()) * 1000);
    const now = new Date();
    const difference = endDate.getTime() - now.getTime();
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));

    return { days };
  }

  useEffect(() => {
    if (typeof subStatus === "boolean" || subStatus === null) {
      setIsSubscribed(subStatus);
    }
  }, [subStatus]);

  useEffect(() => {
    if (isSubscribed) {
      if (typeof subStartDate === "string" || subStartDate === null) {
        setStartDate(subStartDate);
      }
      if (typeof subEndDate === "string" || subEndDate === null) {
        setEndDate(subEndDate);
      }
    }
  }, [isSubscribed, subStartDate, subEndDate]);

  useEffect(() => {
    if (startDate !== null && endDate !== null) {
      setExceeded(hasExceededSevenDays(startDate));
      setRemainingDays(daysRemaining(endDate));
    }
  }, [endDate, startDate]);

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
        remainingDays,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

export function useGlobalContext() {
  return useContext(GlobalStateContext);
}
