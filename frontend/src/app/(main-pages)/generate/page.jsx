"use client";
import { GlobalStateContext } from "@/providers/GlobalStateProvider";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { useAccount } from "wagmi";

export default function Generate() {
  const { isConnected, address } = useAccount();
  const router = useRouter();
  const { db } = useContext(GlobalStateContext);

  useEffect(() => {
    if (!isConnected) {
      router.push("/");
    }
  });

  async function call() {
    await db.init();
    const tx = await db.add(
      {
        title: "new one",
        content: "hahaha",
        address: address
      },
      "data"
    );

  }

  return (
    <div>
      <button onClick={call}>Start</button>
    </div>
  );
}
