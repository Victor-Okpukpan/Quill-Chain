import { useGlobalContext } from "../providers/GlobalStateProvider";
import React from "react";

export default function UnsubscribeButton() {
  const { setOpenRemoveSubscription, exceeded, remainingDays } = useGlobalContext();

  const days = remainingDays !== null && remainingDays!.days;

  return (
    <button
      disabled={exceeded}
      title="Unsubscribe"
      onClick={() => setOpenRemoveSubscription?.((prev) => !prev)}
      className="bg-red-500 disabled:cursor-not-allowed disabled:bg-red-400 text-white font-medium p-2 rounded-md"
    >
      {days} days remaining
    </button>
  );
}
