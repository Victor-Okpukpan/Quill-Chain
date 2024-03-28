"use client";
import { responseAtom } from "@/utils/store";
import { useAtom } from "jotai";

export default function Response() {
  const [response] = useAtom(responseAtom);

  return (
    <>
      {response && (
        <div className="bg-slate-800 p-12 rounded-md w-full">
          <p className="text-slate-200">{response}</p>
        </div>
      )}
    </>
  );
}
