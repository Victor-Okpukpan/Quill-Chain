import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useWeaveDBFetch } from "../hooks/useWeaveDBFetch";
import Betamode from "../components/Betamode";
import Navbar from "../components/Navbar";
import MetaHead from "../components/MetaHead";
import Footer from "../components/Footer";
import { useGlobalContext } from "../providers/GlobalStateProvider";
import { toast } from "sonner";

export default function History() {
  const [contents, setContents] = useState<string[]>([]);
  const { isConnected } = useAccount();
  const router = useRouter();
  const { data, isLoading } = useWeaveDBFetch();
  const { isSubscribed } = useGlobalContext();

  useEffect(() => {
    if (!isConnected) {
      router.push("/");
    }
  }, [isConnected, router]);

  useEffect(() => {
    if (isConnected && !isSubscribed) {
      router.push("/generate");
      toast.error("Please Subscribe");
    }
  }, [isConnected, isSubscribed, router]);

  useEffect(() => {
    async function fetchData() {
      if (data) {
        const hashes = data.map((item: { response: string }) => item.response);
        const urls = hashes.map(
          (hash: string) => `https://arweave.net/${hash}`
        );

        try {
          const fetchedContents = await Promise.all(
            urls.map(async (url: string | URL | Request) => {
              const res = await fetch(url);
              return await res.text();
            })
          );
          setContents(fetchedContents);
        } catch (error: any) {
          console.log(`there is an error: ${error}`);
        }
      }
    }
    fetchData();
  }, [data, setContents]);

  if (isLoading) {
    return (
      <div>
        <Betamode />
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <img
            src="/loader.svg"
            alt="Loading..."
            className="w-[300px] h-[300px]"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <MetaHead />
      <Betamode />
      <Navbar />
      <div className="max-w-screen-lg px-2 mx-auto flex flex-col space-y-5 mt-5">
        {contents &&
          contents.map((item, i) => (
            <div
              key={i}
              className="bg-gray-100 formatted rounded-md p-12 last:mb-16"
              dangerouslySetInnerHTML={{ __html: item }}
            ></div>
          ))}
      </div>
      <Footer />
    </div>
  );
}
