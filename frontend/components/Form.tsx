import { useAtom } from "jotai";
import { FormEvent, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import SubscriptionStatus from "./SubscriptionStatus";
import { useGlobalContext } from "../providers/GlobalStateProvider";
import { responseAtom } from "../utils/store";

export default function Form() {
  const { isConnected } = useAccount();
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [length, setLength] = useState(0);
  const [_response, setResponse] = useAtom(responseAtom);
  const { isSubscribed } = useGlobalContext();

  useEffect(() => {
    setLength(input.length);
  }, [input]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResponse("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: input }),
      });

      if (!res.ok) throw new Error(res.statusText);

      const data = res.body;
      if (!data) return;

      const reader = data.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        setResponse((prev: string) => prev + chunkValue);
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      setInput("");
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {isConnected && !isSubscribed && <SubscriptionStatus />}
      <div className="relative">
        <input
          maxLength={50}
          placeholder="Input your blog Title"
          className="border text w-full first-letter:uppercase outline-none rounded-md items-start flex overflow-hidden h-[100px] relative p-[20px] bg-slate-100 flex-col flex-nowrap resize-none text-start"
          value={input}
          disabled={!isSubscribed}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="absolute right-2 bottom-1 text-xs">
          <span>{length}/50</span>
        </div>
      </div>
      <button
        disabled={isLoading || !isSubscribed}
        className="bg-black w-full mt-4 text-white py-4 px-5 rounded-md font-medium hover:bg-black/70 transition-colors duration-200 ease-out disabled:cursor-not-allowed disabled:bg-black/30"
      >
        {isLoading ? "..." : "Generate"}
      </button>
    </form>
  );
}
