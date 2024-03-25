"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const matchPath = (path) => {
    if (path === pathname) return true;
  };

  return (
    <div className="border-b p-2 flex items-center justify-end space-x-3">
      <div className="space-x-2">
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
