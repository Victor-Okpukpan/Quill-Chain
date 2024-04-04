import { useGlobalContext } from "../providers/GlobalStateProvider";

// import { useGlobalContext } from "@/providers/GlobalStateProvider";

export default function SubscribeButton() {
  const { setOpenSubscription } = useGlobalContext();

  return (
    <button
      onClick={() => setOpenSubscription?.((prev) => !prev)}
      className="bg-blue-500 text-white font-medium p-2 rounded-md"
    >
      Subscribe
    </button>
  );
}
