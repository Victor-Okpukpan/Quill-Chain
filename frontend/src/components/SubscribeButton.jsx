"use client";

import { GlobalStateContext } from "@/providers/GlobalStateProvider";
import { useContext } from "react";

export default function SubscribeButton() {
  const { setOpenSubscription } = useContext(GlobalStateContext);

  return (
    <button
      onClick={() => setOpenSubscription((prev) => !prev)}
      className="bg-blue-500 text-white font-medium p-2 rounded-md"
    >
      Subscribe
    </button>
  );
}
