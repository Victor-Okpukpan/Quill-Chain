import { useEffect, useState } from "react";
import WeaveDB from "weavedb-sdk";

const db = new WeaveDB({
  contractTxId: "SGEP62OaHfPxEd-e9HHaHOqRg68M6P0W39XX7kSunxo",
});

export const useWeaveDBFetch = (collection_name) => {
  const [isLoading, setIsLoading] = useState();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await db.init();
      try {
        const fetchedData = await db.cget(collection_name);
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
