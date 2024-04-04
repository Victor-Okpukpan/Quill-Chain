import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UnsubscribeButton from "./UnsubscribeButton";
import SubscribeButton from "./SubscribeButton";
import { useGlobalContext } from "../providers/GlobalStateProvider";
// import { useGlobalContext } from "@/providers/GlobalStateProvider";

export default function Navbar() {
  const pathname = usePathname();
  const { isSubscribed } = useGlobalContext();

  const matchPath = (path: string) => {
    if (path === pathname) return true;
  };

  return (
    <div className="border-b p-2 flex items-center justify-end space-x-3">
      <div className="space-x-2 flex items-center">
        <Link
          href="/generate"
          className={`${
            matchPath("/generate") && "font-bold"
          } transition-all ease-out duration-200`}
        >
          Generate
        </Link>
        <Link
          href="/history"
          className={`${
            matchPath("/history") && "font-bold"
          } transition-all ease-out duration-200`}
        >
          History
        </Link>
        {isSubscribed ? <UnsubscribeButton /> : <SubscribeButton />}
      </div>
      <ConnectButton
        accountStatus={{
          smallScreen: "avatar",
          largeScreen: "address",
        }}
        showBalance={false}
      />
    </div>
  );
}
