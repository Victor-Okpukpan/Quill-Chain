"use client";
import { createContext, useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import WeaveDB from "weavedb-sdk";

export const GlobalStateContext = createContext();

const GlobalStateProvider = ({ children }) => {
 const [db, setDb] = useState(null);
 const { address } = useAccount();
 
 useEffect(() => {
    async function initDB(){
      if(address) {
        const _db = new WeaveDB({
          contractTxId: "SGEP62OaHfPxEd-e9HHaHOqRg68M6P0W39XX7kSunxo",
        });
        setDb(_db);
        await db.init();
      }
    }
    initDB();

  }, [address])

 return (
    <GlobalStateContext.Provider value={{ db }}>
      {children}
    </GlobalStateContext.Provider>
 );
};

export default GlobalStateProvider;