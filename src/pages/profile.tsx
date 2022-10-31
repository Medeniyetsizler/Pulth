import type { NextPage } from "next";

import { trpc } from "../utils/trpc";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import { useSession } from "next-auth/react";

import DashboardLayout from "../components/layouts/dashboard";
import DragScrollContainer from "../components/DragScrollContainer";
import ArticleCard from "../components/ArticleCard";

const Articles: NextPage = () => {
  const { data } = useSession();
  const user = data?.user;

  return (
    <DashboardLayout>
      <Head>
        <title>Pulth - Profile</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="px-16 pt-16 flex flex-col gap-y-4">
        <div className="grid grid-cols-12 gap-x-4 items-center">
          <div className="col-span-2 relative h-32">
            <Image
              src={user?.image || "/default_profile.jpg"}
              alt="profile"
              width={128}
              height={128}
              className="rounded-full"
            ></Image>
          </div>
          <div className="col-span-3 flex flex-col gap-y-2">
            <h2 className="text-2xl font-semibold">{user?.name}</h2>
            <p className="">Web Programmer</p>
          </div>
          <div className="flex col-span-2 col-start-8 gap-x-9">
            <div>
              <p className="text-lg font-semibold">4.2k</p>
              <p className="text-xs">followers</p>
            </div>
            <div>
              <p className="text-lg font-semibold">820</p>
              <p className="text-xs">following</p>
            </div>
          </div>
          <div className="bg-indigo-500 cursor-pointer flex align-middle items-center gap-x-2 pl-2 rounded-md col-start-11 col-span-2 text-white text-lg font-semibold py-0.5">
            <Image
              src="/userPlus.svg"
              height={36}
              width={36}
              alt="icon"
            ></Image>
            Follow
          </div>
        </div>
        <div className="grid grid-cols-12 border-b-2 border-gray-400 text-lg">
          <div className="font-semibold border-b-2 border-indigo-900 translate-y-0.5">
            General
          </div>
          <div className="col-start-3 translate-y-0.5">Courses</div>
          <div className="col-start-5 translate-y-0.5">Articles</div>
        </div>
        <div className="bg-gray-200 flex flex-wrap p-4 rounded-lg justify-between">
          <div className="w-full">
            <h3 className="text-lg font-semibold">About Me</h3>
          </div>
          <p className="text-black/70 w-[calc(50%-8px)]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Porttitor
            nulla nunc, amet, in eget consequat, dui. In consectetur viverra
            non, interdum pharetra imperdiet maecenas neque. Nisl, nisl at ut
            dui turpis suspendisse suspendisse congue
          </p>
          <div className="flex flex-col gap-y-4 w-[calc(50%-8px)] px-4">
            <div className="flex justify-between">
              <p>Students</p>
              <p className="font-semibold">190.225</p>
            </div>
            <div className="flex justify-between">
              <p>Articles</p>
              <p className="font-semibold">1.023</p>
            </div>
            <div className="flex justify-between">
              <p className="flex-shrink-0">Popularity*</p>
              <div className="flex flex-col">
                <div className="flex justify-between items-center gap-x-2">
                  <p className="font-semibold text-xl">#1</p>
                  <p>in Web</p>
                </div>
                <div className="flex justify-between items-center gap-x-2">
                  <p className="font-semibold text-xl">#6</p>
                  <p>in React</p>
                </div>
                <div className="flex justify-between items-center gap-x-2">
                  <p className="font-semibold text-xl">#13</p>
                  <p>in Javascript</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="font-semibold">
          Recent Articles from{" "}
          <span className="text-indigo-700">{user?.name}</span>
        </p>
        <DragScrollContainer>
          <ArticleCard
            Title="Next.js Auth Errors"
            Topics={["Javascript", "Web", "React"]}
            Author={{ Title: "Web Architect", Name: "Bekir Gulestan" }}
          >
            Some article made for explaining Next Auth Errors deeply. That cover
            nearly 4 (Four) error which is nearly all(102) of them.
          </ArticleCard>
          <ArticleCard
            Title="Next.js Auth Errors"
            Topics={["Javascript", "Web", "React"]}
            Author={{ Title: "Web Architect", Name: "Bekir Gulestan" }}
          >
            Some article made for explaining Next Auth Errors deeply. That cover
            nearly 4 (Four) error which is nearly all(102) of them.
          </ArticleCard>
          <ArticleCard
            Title="Next.js Auth Errors"
            Topics={["Javascript", "Web", "React"]}
            Author={{ Title: "Web Architect", Name: "Bekir Gulestan" }}
          >
            Some article made for explaining Next Auth Errors deeply. That cover
            nearly 4 (Four) error which is nearly all(102) of them.
          </ArticleCard>
          <ArticleCard
            Title="Next.js Auth Errors"
            Topics={["Javascript", "Web", "React"]}
            Author={{ Title: "Web Architect", Name: "Bekir Gulestan" }}
          >
            Some article made for explaining Next Auth Errors deeply. That cover
            nearly 4 (Four) error which is nearly all(102) of them.
          </ArticleCard>
          <ArticleCard
            Title="Next.js Auth Errors"
            Topics={["Javascript", "Web", "React"]}
            Author={{ Title: "Web Architect", Name: "Bekir Gulestan" }}
          >
            Some article made for explaining Next Auth Errors deeply. That cover
            nearly 4 (Four) error which is nearly all(102) of them.
          </ArticleCard>
          <ArticleCard
            Title="Next.js Auth Errors"
            Topics={["Javascript", "Web", "React"]}
            Author={{ Title: "Web Architect", Name: "Bekir Gulestan" }}
          >
            Some article made for explaining Next Auth Errors deeply. That cover
            nearly 4 (Four) error which is nearly all(102) of them.
          </ArticleCard>
          <ArticleCard
            Title="Next.js Auth Errors"
            Topics={["Javascript", "Web", "React"]}
            Author={{ Title: "Web Architect", Name: "Bekir Gulestan" }}
          >
            Some article made for explaining Next Auth Errors deeply. That cover
            nearly 4 (Four) error which is nearly all(102) of them.
          </ArticleCard>
          <ArticleCard
            Title="Next.js Auth Errors"
            Topics={["Javascript", "Web", "React"]}
            Author={{ Title: "Web Architect", Name: "Bekir Gulestan" }}
          >
            Some article made for explaining Next Auth Errors deeply. That cover
            nearly 4 (Four) error which is nearly all(102) of them.
          </ArticleCard>
          <ArticleCard
            Title="Next.js Auth Errors"
            Topics={["Javascript", "Web", "React"]}
            Author={{ Title: "Web Architect", Name: "Bekir Gulestan" }}
          >
            Some article made for explaining Next Auth Errors deeply. That cover
            nearly 4 (Four) error which is nearly all(102) of them.
          </ArticleCard>
        </DragScrollContainer>
        <p className="font-semibold">
          Most popular courses from{" "}
          <span className="text-indigo-700">{user?.name}</span>
        </p>
        <DragScrollContainer>
          <ArticleCard
            Title="Next.js Auth Errors"
            Topics={["Javascript", "Web", "React"]}
            Author={{ Title: "Web Architect", Name: "Bekir Gulestan" }}
          >
            Some article made for explaining Next Auth Errors deeply. That cover
            nearly 4 (Four) error which is nearly all(102) of them.
          </ArticleCard>
          <ArticleCard
            Title="Next.js Auth Errors"
            Topics={["Javascript", "Web", "React"]}
            Author={{ Title: "Web Architect", Name: "Bekir Gulestan" }}
          >
            Some article made for explaining Next Auth Errors deeply. That cover
            nearly 4 (Four) error which is nearly all(102) of them.
          </ArticleCard>
          <ArticleCard
            Title="Next.js Auth Errors"
            Topics={["Javascript", "Web", "React"]}
            Author={{ Title: "Web Architect", Name: "Bekir Gulestan" }}
          >
            Some article made for explaining Next Auth Errors deeply. That cover
            nearly 4 (Four) error which is nearly all(102) of them.
          </ArticleCard>
          <ArticleCard
            Title="Next.js Auth Errors"
            Topics={["Javascript", "Web", "React"]}
            Author={{ Title: "Web Architect", Name: "Bekir Gulestan" }}
          >
            Some article made for explaining Next Auth Errors deeply. That cover
            nearly 4 (Four) error which is nearly all(102) of them.
          </ArticleCard>
          <ArticleCard
            Title="Next.js Auth Errors"
            Topics={["Javascript", "Web", "React"]}
            Author={{ Title: "Web Architect", Name: "Bekir Gulestan" }}
          >
            Some article made for explaining Next Auth Errors deeply. That cover
            nearly 4 (Four) error which is nearly all(102) of them.
          </ArticleCard>
          <ArticleCard
            Title="Next.js Auth Errors"
            Topics={["Javascript", "Web", "React"]}
            Author={{ Title: "Web Architect", Name: "Bekir Gulestan" }}
          >
            Some article made for explaining Next Auth Errors deeply. That cover
            nearly 4 (Four) error which is nearly all(102) of them.
          </ArticleCard>
          <ArticleCard
            Title="Next.js Auth Errors"
            Topics={["Javascript", "Web", "React"]}
            Author={{ Title: "Web Architect", Name: "Bekir Gulestan" }}
          >
            Some article made for explaining Next Auth Errors deeply. That cover
            nearly 4 (Four) error which is nearly all(102) of them.
          </ArticleCard>
        </DragScrollContainer>
      </div>
    </DashboardLayout>
  );
};

export default Articles;
