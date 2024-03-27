"use client";
import { createContext, useEffect, useState } from 'react';

export const GlobalStateContext = createContext();

const GlobalStateProvider = ({ children }) => {

 return (
    <GlobalStateContext.Provider>
      {children}
    </GlobalStateContext.Provider>
 );
};

export default GlobalStateProvider;