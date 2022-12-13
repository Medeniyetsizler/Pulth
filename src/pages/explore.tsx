import type { NextPage } from "next";

import { trpc } from "../utils/trpc";
import Head from "next/head";
import Link from "next/link";

import { useSession } from "next-auth/react";

import DragScrollContainer from "../components/DragScrollContainer";
import ArticleCard from "../components/ArticleCard";
import DashboardLayout from "../components/layouts/dashboard";

const Explore: NextPage = () => {
  // const batchFetch = trpc.useQuery(["article.batch-data"]);

  const { data } = useSession();
  const user = data?.user;

  return (
    <DashboardLayout>
      <Head>
        <title>Explore - Pulth App</title>
        <meta
          name="description"
          content="Explore new posts in Pulth. You can read new articles and watch new courses here"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col gap-y-4 px-0 md:px-5">
        <h1
          className={`${user ?? "hidden"} text-4xl font-bold mb-4 md:px-0 px-5`}
        >
          Welcome back, <span className="text-indigo-700">{user?.name}</span>
        </h1>
        <div className="flex flex-col gap-y-5">
          <p className="text-2xl font-semibold md:px-0 px-5">
            {user ? "Selected for you..." : "Recent articles"}
          </p>
          <DragScrollContainer>
            <ArticleCard
              Title="Next.js Auth Errors"
              Topics={["Javascript", "Web", "React"]}
              Author={{ Title: "Web Architect", Name: "Bekir Gulestan" }}
              isRecommended={true}
            >
              Some article made for explaining Next Auth Errors deeply. That
              cover nearly 4 (Four) error which is nearly all(102) of them.
            </ArticleCard>
            <ArticleCard
              Title="Photoshop Eraser Tool"
              Topics={["Editing", "Adobe"]}
              Author={{ Title: "Designer", Name: "Yaprak Özlem Öz" }}
              isRecommended={true}
            >
              Some article about how eraser tool works in Photoshop 2023 with an
              original Adobe product.
            </ArticleCard>

            <ArticleCard
              Title="Web Security as a One Piece"
              Topics={["Security", "Web", "Firewall"]}
              Author={{ Title: "Security Assistant", Name: "John Wall" }}
            >
              How security works as an whole article with 3000 word. we
              discussed nearly all of them.
            </ArticleCard>

            <ArticleCard
              Title="How Microservices work?"
              Topics={["Kafka", "Infrastructure", "Microservices"]}
              Author={{ Title: "Lead Developer", Name: "Micheal Rocks" }}
            >
              We will talk about how Microservices work in a nutshell. This
              article will be a part of an serie.
            </ArticleCard>

            <ArticleCard
              Title="What 's RNB ?"
              Topics={["Producer", "Music"]}
              Author={{ Title: "Disc Jockey", Name: "Alexis Diamonds" }}
            >
              This new way of reaching audiences has created a whole new djing
              experience that is more accessible to a wider range of people.
            </ArticleCard>
            <ArticleCard
              Title="Do boys dislike school?"
              Topics={["School"]}
              Author={{ Title: "Social Scientist", Name: "Parry Gustave" }}
            >
              Since the 1970s, a panic about “disaffected” boys underachieving
              in formal schooling has gripped Western society.
            </ArticleCard>

            <ArticleCard
              Title="What is Fog Reveal?"
              Topics={["Police", "Federal"]}
              Author={{ Title: "Federal Gov. Member", Name: "Samanta Sue" }}
            >
              Government agencies and private security companies in the U.S.
              have found a cost-effective way to engage in mass surveillance
              using a technology called “fog computing.”
            </ArticleCard>
          </DragScrollContainer>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Explore;
