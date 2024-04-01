"use client";
import { responseAtom } from "@/utils/store";
import { useAtom } from "jotai";
import copy from "copy-to-clipboard";
import { HiOutlineClipboardCopy } from "react-icons/hi";
import { toast } from "sonner";
import WeaveDB from "weavedb-sdk";
import { useAccount } from "wagmi";
import { FaSave } from "react-icons/fa";

export default function Response() {
  const [response] = useAtom(responseAtom);
  const { address } = useAccount();

  function unescapeHtml(html) {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = html;
    return textarea.value;
  }

  function stripHtmlTags(text) {
    return text.replace(/<[^>]*>?/gm, "");
  }

  const unescapedResponse = unescapeHtml(response);

  const handleCopy = () => {
    const strippedText = stripHtmlTags(response);
    copy(strippedText);
    toast.success("Copied To Clipboard!");
  };

  const handleSave = async () => {
    const strippedText = stripHtmlTags(response);
    const db = new WeaveDB({
      contractTxId: "cyZ3aeoXnnWTWsiJCZzeowXKrcc_UlXeVWtOVuzLXbE",
    });
    await db.init();

    await db.add({address: address, response: strippedText }, "data");
    
    console.log(db);
    
    toast.success("This post has been saved!");
  };

  return (
    <>
      {response && (
        <div className="mb-2">
          <div className="bg-gray-100 p-12 rounded-md w-full">
            <div className="flex justify-end items-center w-full space-x-2">
              <button onClick={handleCopy} className="float-right">
                <HiOutlineClipboardCopy size={20} title="Copy to Clipboard" />
              </button>
              <button onClick={handleSave} className="float-right">
                <FaSave size={20} title="Save post" />
              </button>
            </div>
            <div
              className="formatted"
              dangerouslySetInnerHTML={{ __html: unescapedResponse }}
            ></div>
          </div>
        </div>
      )}
    </>
  );
}
