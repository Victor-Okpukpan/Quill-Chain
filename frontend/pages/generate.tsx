"use client";

import Form from "../components/Form";
import Response from "../components/Response";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import Navbar from "../components/Navbar";
import Betamode from "../components/Betamode";

export default function Generate() {
  const { isConnected } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (!isConnected) {
      router.push("/");
    }
  }, [isConnected, router]);

  return (
    <div>
      <Betamode />
      <Navbar />
      <div className="max-w-screen-lg mx-auto my-5">
        <div className="flex flex-col w-full items-center">
          <div className="header-subtitle mb-3">
            <h2 className="text-5xl font-bold">Input your Blog Post Title</h2>
          </div>
        </div>
        <div className="justify-center flex flex-col flex-nowrap gap-4 px-2">
          <Form />
          <Response />
        </div>
      </div>
    </div>
  );
}
