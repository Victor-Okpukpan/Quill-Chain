"use client";
import { responseAtom } from "@/utils/store";
import { useAtom } from "jotai";

export default function Response() {
  const [response] = useAtom(responseAtom);

  function unescapeHtml(html) {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = html;
    return textarea.value;
  }

  const unescapedResponse = unescapeHtml(response);

  return (
    <>
      {response && (
        <div>
          <div className="bg-gray-100 p-12 rounded-md w-full">
            <div className="formatted" dangerouslySetInnerHTML={{ __html: unescapedResponse }}></div>
          </div>
        </div>
      )}
    </>
  );
}
