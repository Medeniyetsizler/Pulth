import type { NextPage } from "next";

import { trpc } from "../utils/trpc";
import Head from "next/head";
import Link from "next/link";

import { useSession } from "next-auth/react";

import DashboardLayout from "../components/layouts/dashboard";

const Courses: NextPage = () => {
  // const batchFetch = trpc.useQuery(["article.batch-data"]);

  const { data } = useSession();
  const user = data?.user;

  return (
    <DashboardLayout>
      <Head>
        <title>Pulth App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </DashboardLayout>
  );
};

export default Courses;
