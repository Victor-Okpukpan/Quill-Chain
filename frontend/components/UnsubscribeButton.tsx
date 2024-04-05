import { usePathname } from "next/navigation";
import { useGlobalContext } from "../providers/GlobalStateProvider";
import React from "react";

export default function UnsubscribeButton() {
  const pathname = usePathname();
  const { setOpenRemoveSubscription, exceeded, remainingDays } =
    useGlobalContext();
  console.log("button:", remainingDays);
  const matchPath = (path: string) => {
    if (path === pathname) return true;
  };

  const daysRemaining =
    remainingDays && remainingDays.days !== undefined ? remainingDays.days : 0;

  return (
    <button
      disabled={exceeded}
      title="Unsubscribe"
      onClick={() => setOpenRemoveSubscription?.((prev) => !prev)}
      className={`bg-red-500 disabled:cursor-not-allowed disabled:bg-red-400 text-white font-medium p-2 rounded-md ${
        matchPath("/history") && "hidden"
      }`}
    >
      {daysRemaining} days remaining
    </button>
  );
}
