"use client";
import { useWeaveDBFetch } from "@/hooks/useWeaveDBFetch";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAccount } from "wagmi";

export default function History() {
  const { isConnected } = useAccount();
  // const { isLoading, data, error } = useWeaveDBFetch("data");
  const router = useRouter();

  // useEffect(() => {
  //   if (!isConnected) {
  //     router.push("/");
  //   }
  // }, [isConnected]);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // }

  const data = [
    {
      title: "haha",
      content: "tasdfghjmkjhgfdfgnhjm",
    },
  ];

  return (
    <div>
      <div className="max-w-screen-md mx-auto flex flex-col space-y-5 my-5">
        {data &&
          data.map((item, i) => (
            <div key={i} className="bg-blue-100/50 shadow rounded p-5">
              <h2 className="font-bold text-xl capitalize">
                {item.title}
              </h2>
              <p className="text-sm">{item.content}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
