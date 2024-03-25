"use client"
import { useWeaveDBFetch } from "@/hooks/useWeaveDBFetch";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Home() {
  const { isLoading, data, error } = useWeaveDBFetch('people');
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ConnectButton />
    </main>
  );
}
