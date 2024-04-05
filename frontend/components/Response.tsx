import { useAtom } from "jotai";
import copy from "copy-to-clipboard";
import { HiOutlineClipboardCopy } from "react-icons/hi";
import { toast } from "sonner";
//@ts-ignore
import WeaveDB from "weavedb-sdk";
import { useAccount } from "wagmi";
import { FaSave } from "react-icons/fa";
import { responseAtom } from "../utils/store";
import { getWebIrys } from "../utils/getIrys";

export default function Response() {
  const [response] = useAtom(responseAtom);
  const { address } = useAccount();

  function stripHtmlTags(text: string) {
    return text.replace(/<[^>]*>?/gm, "");
  }

  const handleCopy = () => {
    const strippedText = stripHtmlTags(response);
    copy(strippedText);
    toast.success("Copied To Clipboard!");
  };

  const handleSave = async () => {
    const db = new WeaveDB({
      contractTxId: "cyZ3aeoXnnWTWsiJCZzeowXKrcc_UlXeVWtOVuzLXbE",
    });
    await db.init();

    const irys = await getWebIrys();

    const receipt = await irys.upload(response);

    await db.add({ address: address, response: receipt.id }, "data2");

    toast.success("This post has been saved!");
  };

  return (
    <>
      {response && (
        <div className="mb-14">
          <div className="bg-gray-100 p-4 md:p-12 rounded-md w-full">
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
              dangerouslySetInnerHTML={{ __html: response }}
            ></div>
          </div>
        </div>
      )}
    </>
  );
}
