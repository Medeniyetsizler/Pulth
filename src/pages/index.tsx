import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Pulth App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex flex-col items-center justify-center h-screen p-4">
        <h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-700">
          <span className="text-indigo-700">Pulth</span> App
        </h1>
        <p className="text-lg text-gray-700">
          You can still go to{" "}
          <Link href="/dashboard">
            <a className="text-blue-600 inline-block cursor-pointer">
              Dashboard
            </a>
          </Link>
        </p>
      </main>
    </>
  );
};

export default Home;
