"use client";
import { responseAtom } from "@/utils/store";
import { useAtom } from "jotai";
import copy from "copy-to-clipboard";
import { HiOutlineClipboardCopy } from "react-icons/hi";


export default function Response() {
  const [response] = useAtom(responseAtom);

  function unescapeHtml(html) {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = html;
    return textarea.value;
  }

  function stripHtmlTags(text) {
    return text.replace(/<[^>]*>?/gm, '');
   }

  const unescapedResponse = unescapeHtml(response);

  const handleCopy = () => {
    const strippedText = stripHtmlTags(response);
    copy(strippedText);
 };

  return (
    <>
      {response && (
        <div>
          <div className="bg-gray-100 p-12 rounded-md w-full">
            <button onClick={handleCopy} className="float-right"><HiOutlineClipboardCopy size={20} /></button>
            <div className="formatted" dangerouslySetInnerHTML={{ __html: unescapedResponse }}></div>
          </div>
        </div>
      )}
    </>
  );
}
