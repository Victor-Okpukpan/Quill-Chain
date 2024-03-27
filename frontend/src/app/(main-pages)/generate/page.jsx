"use client";
import { GlobalStateContext } from "@/providers/GlobalStateProvider";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useAccount } from "wagmi";

export default function Generate() {
  const [userInput, setUserInput] = useState("");
  const [length, setLength] = useState("");
  const [apiOutput, setApiOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  // const { isConnected, address } = useAccount();
  // const router = useRouter();

  // useEffect(() => {
  //   if (!isConnected) {
  //     router.push("/");
  //   }
  // }, [isConnected]);

  // async function call() {
  //   await db.init();
  //   const tx = await db.add(
  //     {
  //       title: "new one",
  //       content: "hahaha",
  //       address: address,
  //     },
  //     "data"
  //   );
  // }

  useEffect(() => {
    setLength(userInput.length);
  }, [userInput]);

  const callGenerateEndpoint = () => {};

  const onUserChangedText = (event) => {
    setUserInput(event.target.value);
  };

  return (
    <div>
      <div className="max-w-screen-sm mx-auto mt-5">
        <div className="flex flex-col w-full items-center">
          <div className="header-subtitle mb-3">
            <h2 className="text-xl">Input your Blog Post Title</h2>
          </div>
        </div>
        <div className="justify-center flex flex-col flex-nowrap gap-4 ">
          <div className="relative">
            <textarea
              maxLength={80}
              placeholder="Input your blog Title"
              className="border w-full outline-none rounded-md items-start flex overflow-hidden h-[150px] relative p-[20px] flex-col flex-nowrap resize-none text-start"
              value={userInput}
              onChange={onUserChangedText}
            />
            <div className="absolute right-2 bottom-1">
              <span>{length}/80</span>
            </div>
          </div>
          <button className="bg-black text-white py-4 px-5 rounded-md font-medium hover:bg-black/50 transition-colors duration-200 ease-out">
            Generate
          </button>
          {/* {apiOutput && (
            <div className="output">
              <div className="output-header-container">
                <div className="output-header">
                  <h3>Output</h3>
                </div>
              </div>
              {/* New code I added here
              <div className="output-content">
                <p>{apiOutput}</p>
              </div>
              <button onClick={copyToClipboard} className="generate-button">
                Copy
              </button>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}
