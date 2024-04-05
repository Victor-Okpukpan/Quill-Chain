"use client";

import Form from "../components/Form";
import Response from "../components/Response";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import Navbar from "../components/Navbar";
import Betamode from "../components/Betamode";
import MetaHead from "../components/MetaHead";
import { useGlobalContext } from "../providers/GlobalStateProvider";
import SubScriptionModal from "../components/SubScriptionModal";
import UnsubscriptionModal from "../components/UnsubscriptionModal";
import Footer from "../components/Footer";

export default function Generate() {
  const { openSubscription, openRemoveSubscription } = useGlobalContext();
  const { isConnected } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (!isConnected) {
      router.push("/");
    }
  }, [isConnected, router]);

  return (
    <div className="relative min-h-screen">
      <MetaHead />
      <Betamode />
      <Navbar />
      {openSubscription && <SubScriptionModal />}
      {openRemoveSubscription && <UnsubscriptionModal />}
      <div className="max-w-screen-lg mx-auto mt-5">
        <div className="flex flex-col w-full items-center">
          <div className="header-subtitle mb-3">
            <h2 className="md:text-5xl text-2xl text-center font-bold">
              Input your Blog Post Title
            </h2>
          </div>
        </div>
        <div className="justify-center flex flex-col flex-nowrap gap-4 px-2">
          <Form />
          <Response />
        </div>
      </div>
      <Footer />
    </div>
  );
}
