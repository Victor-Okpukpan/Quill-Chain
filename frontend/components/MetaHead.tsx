import Head from "next/head";

export default function MetaHead() {
  return (
    <Head>
        <title>QuillChain - The AI-Powered Blog Writer</title>
        <meta
          content="Quillchain is an innovative AI-powered blog writer built on Arbitrum Sepolia, offering a decentralized platform for seamless content creation and sharing. Experience the future of blogging with our blockchain-based solution."
          name="description"
        />
        <meta
          name="keywords"
          content="Quillchain, AI, Decentralized Web Application, DApp, Blockchain, Arbitrum, Arbitrum Sepolia, Smart Contracts, AI-powered blog writer, DFi, Web3, Blog, Blog Writer, Blog Generator"
        />
        <meta name="author" content="Victor Okpukpan" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          property="og:title"
          content="Quillchain: The AI-Powered Blog Writer on Arbitrum Sepolia"
        />
        <meta
          property="og:description"
          content="Explore Quillchain, an innovative AI-powered blog writer built on Arbitrum Sepolia. Experience seamless content creation and sharing with our advanced platform."
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>
  )
}
