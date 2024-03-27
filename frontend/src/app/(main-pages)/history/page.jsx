"use client";
import { useWeaveDBFetch } from "@/hooks/useWeaveDBFetch";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAccount } from "wagmi";

export default function History() {
  const { isConnected } = useAccount();
  const { isLoading, data, error } = useWeaveDBFetch("data");
  const router = useRouter();

  useEffect(() => {
    if (!isConnected) {
      router.push("/");
    }
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {data &&
        data.map((item, i) => (
          <div key={i} className="">
            <h2>{item.title}</h2>
            <h2>{item.content}</h2>
          </div>
        ))}
    </div>
  );
}
