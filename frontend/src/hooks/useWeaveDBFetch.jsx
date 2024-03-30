"use client"
import { GlobalStateContext } from "@/providers/GlobalStateProvider";
import { useContext, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import WeaveDB from "weavedb-sdk";


const db = new WeaveDB({
  contractTxId: "SGEP62OaHfPxEd-e9HHaHOqRg68M6P0W39XX7kSunxo",
});

export const useWeaveDBFetch = (collection_name) => {
  const [isLoading, setIsLoading] = useState();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const { address } = useAccount();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await db.init();
      try {
        const fetchedData = await db.get(collection_name, [
          "address",
          "==",
          address,
        ]);
        setData(fetchedData);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [collection_name]);

  return { isLoading, data, error };
};
