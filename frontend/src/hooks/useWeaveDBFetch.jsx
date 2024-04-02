"use client"
import { GlobalStateContext } from "@/providers/GlobalStateProvider";
import { useContext, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import WeaveDB from "weavedb-sdk";

export const useWeaveDBFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const { address } = useAccount();
  
  console.log("fetched:", data)
  console.log("fetched Address:", address)
  
  useEffect(() => {
    const db = new WeaveDB({
      contractTxId: "cyZ3aeoXnnWTWsiJCZzeowXKrcc_UlXeVWtOVuzLXbE",
    });
    const fetchData = async () => {
      setIsLoading(true);
      await db.init();
      try {
        const fetchedData = await db.get("data2", [
          "address",
          "==",
          address
        ]);
        setData(fetchedData);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { isLoading, data, error };
};
