"use client";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
//@ts-ignore
import WeaveDB from "weavedb-sdk";

export const useWeaveDBFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<[]>([]);
  // const [error, setError] = useState(null);
  const { address } = useAccount();
  const [db, setDb] = useState(null);
  const contractTxId = "cyZ3aeoXnnWTWsiJCZzeowXKrcc_UlXeVWtOVuzLXbE";

  console.log("fetched:", data);
  console.log("fetched Address:", address);

  useEffect(() => {
    const init = async () => {
      const _db = new WeaveDB({
        contractTxId,
      });

      await _db.init();
      setDb(_db);
    };
    init();
  }, []);

 

  useEffect(() => {
    if (db && address) {
      const fetchData = async () => {
        setIsLoading(true);
        //@ts-ignore
        let fetchedData = await db.get("data2", ["address", "==", address]);
        setData(fetchedData);
        setIsLoading(false);
      };

      fetchData();
    }
  }, [address, db]);


  return { isLoading, data, db };
};
