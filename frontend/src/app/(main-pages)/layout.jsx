"use client";
import Betamode from "@/components/Betamode";
import Navbar from "@/components/Navbar";
import SubScriptionModal from "@/components/SubScriptionModal";
import UnsubscriptionModal from "@/components/UnsubscriptionModal";
import { GlobalStateContext } from "@/providers/GlobalStateProvider";
import { useContext } from "react";

export default function MainPagesLayout({ children }) {
  const { openSubscription,  openRemoveSubscription } = useContext(GlobalStateContext);
  return (
    <div className="relative w-full h-full">
      <Betamode />
      <Navbar />
      {openSubscription && <SubScriptionModal />}
      {openRemoveSubscription && <UnsubscriptionModal />}
      {children}
    </div>
  );
}
