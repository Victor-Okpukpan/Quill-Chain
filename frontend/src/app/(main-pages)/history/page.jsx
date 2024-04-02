"use client";
import { useWeaveDBFetch } from "@/hooks/useWeaveDBFetch";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export default function History() {
  const [contents, setContents] = useState([]);
  const { isConnected } = useAccount();
  const { isLoading, data, error } = useWeaveDBFetch();
  const router = useRouter();
console.log("init", data);

  useEffect(() => {
    if (!isConnected) {
      router.push("/");
    }
  }, [isConnected]);

  useEffect(() => {
    if (isLoading || error) {
      return; // Early return if loading or error to avoid fetching data
    }

    async function fetchData() {
      if (data) {
        const hashes = data.map((item) => item.response);
        const urls = hashes.map((hash) => `https://arweave.net/${hash}`);
        console.log("hashes:", hashes)

        const fetchedContents = await Promise.all(
          urls.map(async (url) => {
            const res = await fetch(url);
            return await res.text();
          })
        );
        setContents(fetchedContents);
      }
    }
    fetchData();
  }, [data, isLoading, error]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <div className="max-w-screen-lg mx-auto flex flex-col space-y-5 mt-5 mb-7">
        {data &&
          contents.map((item, i) => (
            <div
              key={i}
              className="bg-gray-100 formatted rounded-md p-12"
              dangerouslySetInnerHTML={{ __html: item }}
            ></div>
          ))}
      </div>
    </div>
  );
}
