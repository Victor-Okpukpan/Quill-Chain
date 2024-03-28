"use client";
import Form from "@/components/Form";
import Response from "@/components/Response";
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
          <Form />
          <Response />
        </div>
      </div>
    </div>
  );
}
