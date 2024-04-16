import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import MetaHead from "../components/MetaHead";
import Footer from "../components/Footer";
import { toast } from "sonner";
import { GlowingStarsBackgroundCard } from "../components/ui/glowing-stars";

const Home: NextPage = () => {
  const { isConnected } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (isConnected) {
      router.push("/generate");
      toast.success("Wallet Connected!");
    }
  }, [isConnected, router]);

  return (
    <div className="relative min-h-screen">
      <MetaHead />
      <main className="flex min-h-[90vh] w-full flex-col items-center justify-center">
        <GlowingStarsBackgroundCard className="w-full h-full">
          <section className="w-full min-h-[90vh] flex items-center justify-center">
            <div className="px-4 md:px-6">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2">
                  <h1 className="text-3xl text-white font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    QuillChain
                  </h1>
                  <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    Let the power of AI supercharge your writing. Create
                    compelling content with ease.
                  </p>
                </div>
                <div>
                  <ConnectButton
                    accountStatus={{
                      smallScreen: "avatar",
                      largeScreen: "address",
                    }}
                    showBalance={false}
                  />
                </div>
              </div>
            </div>
          </section>
        </GlowingStarsBackgroundCard>
      </main>
    </div>
  );
};

export default Home;
