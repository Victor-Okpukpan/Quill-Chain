"use client";
import { responseAtom } from "@/utils/store";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

export default function Form() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [length, setLength] = useState("");
  const [_response, setResponse] = useAtom(responseAtom);

  useEffect(() => {
    setLength(input.length);
  }, [input]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponse("");
    setIsLoading(true);

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
      setResponse((prev) => prev + chunkValue);
    }

    setInput("");
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative">
        <input
          maxLength={50}
          placeholder="Input your blog Title"
          className="border w-full outline-none rounded-md items-start flex overflow-hidden h-[100px] relative p-[20px] bg-slate-100 flex-col flex-nowrap resize-none text-start"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="absolute right-2 bottom-1">
          <span>{length}/50</span>
        </div>
      </div>
      <button
        disabled={isLoading}
        className="bg-black w-full mt-4 text-white py-4 px-5 rounded-md font-medium hover:bg-black/70 transition-colors duration-200 ease-out"
      >
        {isLoading ? "..." : "Generate"}
      </button>
    </form>
  );
}
