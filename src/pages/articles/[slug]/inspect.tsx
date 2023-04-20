import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Loading from "~/components/Loading";
import Dashboard from "~/components/layouts/gridDashboard";
import { api } from "~/utils/api";
import { Tab, Dialog } from "@headlessui/react";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const Inspect: NextPage = () => {
  dayjs.extend(relativeTime);
  const router = useRouter();
  const { slug } = router.query;
  const { data: userData, status } = useSession({ required: true });

  const articleInfo = api.article.inspect.useQuery((slug as string) || "");
  const infoIsLoading = articleInfo.isLoading;

  const articleUpdateInfoMutation = api.article.updateInfo.useMutation();
  const articlePublishMutation = api.article.publish.useMutation();
  const articleDeleteMutation = api.article.delete.useMutation();

  const updateInfoIsLoading = articleUpdateInfoMutation.isLoading;
  const publishMutationIsLoading = articlePublishMutation.isLoading;

  const [title, setTitle] = useState(articleInfo.data?.title);
  const [description, setDescription] = useState(articleInfo.data?.description);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteModalInput, setDeleteModalInput] = useState("");

  useEffect(() => {
    setTitle(articleInfo.data?.title);
    setDescription(articleInfo.data?.description);
  }, [articleInfo.data]);

  return (
    <Dashboard>
      <div className="px-4 py-8 ">
        <div className="flex flex-row">
          <div className="flex-grow">
            <p className="text-xs text-black/70">Inspect Article</p>
            <h1 className="mt-1 text-2xl font-bold">
              {infoIsLoading ? (
                <Loading className="h-7 w-7 border-2" />
              ) : (
                articleInfo.data?.title
              )}
            </h1>
          </div>
          <div className="hidden gap-4 md:flex ">
            <Link
              //href={"/articles/" + slug + "/edit"}
              href={{
                pathname: `/articles/[slug]/edit`,
                query: { slug: slug },
              }}
            >
              <button className=" mt-4  flex items-center justify-center rounded-lg bg-gray-500 px-4 py-2 text-white">
                Edit
              </button>
            </Link>

            {/* This Should open a model for confirmation */}
            <button
              className="mt-4 flex items-center justify-center rounded-lg bg-red-500 px-4 py-2 text-white"
              onClick={() => setDeleteDialogOpen(true)}
            >
              Delete
            </button>
          </div>
        </div>
        <hr className="mt-1 border-black" />
        <div className="flex flex-col gap-x-2 md:flex-row">
          <div className="flex-grow">
            <div className="mt-4">
              <span className="text-black/70">Description:</span>

              {infoIsLoading ? (
                <Loading className="h-7 w-7 border-2" />
              ) : (
                <p>{articleInfo.data?.description}</p>
              )}

              <span className="text-black/70">Tags:</span>
              {infoIsLoading ? (
                <Loading className="h-7 w-7 border-2" />
              ) : (
                <p>{articleInfo.data?.keywords.join(", ")}</p>
              )}
            </div>

            <div className="mt-4">
              <Tab.Group>
                <Tab.List className="flex space-x-1 rounded bg-gray-800">
                  <Tab
                    className={({ selected }) =>
                      `${
                        selected
                          ? "border-b-4 border-b-indigo-500 text-white"
                          : " text-white/70"
                      }
                          relative flex w-full items-center justify-center px-4 py-2 focus:outline-none`
                    }
                  >
                    <span>General</span>
                  </Tab>
                  <Tab
                    className={({ selected }) =>
                      `${
                        selected
                          ? "border-b-4 border-b-indigo-500 text-white"
                          : " text-white/70"
                      }
                          relative flex w-full items-center justify-center px-4 py-2 focus:outline-none`
                    }
                  >
                    <span>SEO</span>
                  </Tab>
                  <Tab
                    className={({ selected }) =>
                      `${
                        selected
                          ? "border-b-4 border-b-indigo-500 text-white"
                          : " text-white/70"
                      }
                          relative flex w-full items-center justify-center px-4 py-2 focus:outline-none`
                    }
                  >
                    <span>Stats</span>
                  </Tab>
                </Tab.List>
                <Tab.Panels>
                  <Tab.Panel>
                    <div className="mt-4 flex flex-col">
                      <span className="text-black/70">Title:</span>

                      {infoIsLoading ? (
                        <Loading className="h-7 w-7 border-2" />
                      ) : (
                        <input
                          className="border-2 p-3 outline-indigo-500"
                          value={title || ""}
                          onChange={(e) => {
                            setTitle(e.target.value);
                          }}
                        />
                      )}
                    </div>
                    <div className="mt-4 flex flex-col">
                      <span className="text-black/70">Description:</span>

                      {infoIsLoading ? (
                        <Loading className="h-7 w-7 border-2" />
                      ) : (
                        <textarea
                          className="border-2 p-3 outline-indigo-500"
                          value={description || ""}
                          onChange={(e) => {
                            setDescription(e.target.value);
                          }}
                        />
                      )}
                    </div>

                    <div className="flex justify-end gap-2">
                      <button
                        className="mb-2 mt-6 flex items-center justify-center rounded-lg bg-indigo-500 px-4 py-2 text-white disabled:bg-indigo-400"
                        disabled={
                          title === "" ||
                          description === "" ||
                          (title === articleInfo.data?.title &&
                            description === articleInfo.data?.description)
                        }
                        onClick={() => {
                          console.log({
                            titleEmpty: title === "",
                            descriptionEmpty: description === "",
                            defaultTitle: title === articleInfo.data?.title,
                            defaultDesc:
                              description === articleInfo.data?.description,

                            result:
                              title === "" ||
                              description === "" ||
                              (title === articleInfo.data?.title &&
                                description === articleInfo.data?.description),
                          });

                          const mutationData: {
                            title?: string;
                            description?: string;
                            slug: string;
                          } = {
                            slug: slug as string,
                          };

                          if (title !== articleInfo.data?.title) {
                            mutationData.title = title;
                          }

                          if (description !== articleInfo.data?.description) {
                            mutationData.description = description;
                          }

                          articleUpdateInfoMutation.mutate(mutationData, {
                            onSuccess: (data) => {
                              router.replace(
                                "/articles/" + data.slug + "/inspect"
                              );
                              articleInfo.refetch();
                            },
                          });
                        }}
                      >
                        {updateInfoIsLoading ? (
                          <Loading className="h-7 w-7 border-2" />
                        ) : (
                          "Save"
                        )}
                      </button>
                      <button
                        className="mb-2 mt-6 flex items-center justify-center rounded-lg bg-gray-500 px-4 py-2 text-white disabled:bg-gray-400"
                        disabled={
                          title === articleInfo.data?.title &&
                          description === articleInfo.data?.description
                        }
                        onClick={() => {
                          setTitle(articleInfo.data?.title);
                          setDescription(articleInfo.data?.description);
                        }}
                      >
                        Clear
                      </button>
                    </div>
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
          </div>

          <div className="order-first mt-4 grid w-full grid-cols-2 gap-x-2 self-start p-2 shadow-md md:order-last md:w-auto md:flex-shrink md:flex-grow-0">
            <span className="text-black/70">status:</span>
            {infoIsLoading ? (
              <Loading className="h-7 w-7 border-2" />
            ) : (
              <p>
                {articleInfo.data?.isPublished
                  ? "published"
                  : "unpublished/draft"}
              </p>
            )}

            {/* <span className="text-black/70">visibility:</span>
              Private, Public, Unlisted

              for subscribers only, for everyone, for subscribers and people with link */}

            <span className="text-black/70">published at:</span>
            {infoIsLoading ? (
              <Loading className="h-7 w-7 border-2" />
            ) : (
              <p>{dayjs(articleInfo.data?.updatedAt).fromNow()}</p>
            )}

            <span className="text-black/70">created at:</span>
            {infoIsLoading ? (
              <Loading className="h-7 w-7 border-2" />
            ) : (
              <p>{dayjs(articleInfo.data?.createdAt).fromNow()}</p>
            )}

            {articleInfo.data?.isPublished ? (
              <Link
                //href={"/articles/" + slug}
                href={{
                  pathname: "/articles/[slug]",
                  query: { slug: slug },
                }}
                className="mb-2 mt-6 flex items-center justify-center rounded-lg bg-gray-500 px-4 py-2 text-white disabled:bg-gray-400 md:mb-0"
              >
                View
              </Link>
            ) : (
              <button
                className="mb-2 mt-6 flex items-center justify-center rounded-lg bg-gray-500 px-4 py-2 text-white disabled:bg-gray-400 md:mb-0"
                disabled={!articleInfo.data?.isPublished}
              >
                View
              </button>
            )}

            <Link
              href={{
                pathname: "/articles/[slug]/edit",
                query: { slug: slug },
              }}
              className=" mb-2 mt-6 flex items-center justify-center rounded-lg bg-gray-500 px-4 py-2 text-white md:hidden"
            >
              Edit
            </Link>
            <button
              onClick={() => {
                if (typeof articleInfo.data?.isPublished !== "undefined")
                  articlePublishMutation.mutate(
                    {
                      setUnpublished: articleInfo.data?.isPublished,
                      slug: slug as string,
                    },
                    {
                      onSuccess: (data) => {
                        articleInfo.refetch();
                      },
                    }
                  );
              }}
              className="flex items-center justify-center rounded-lg bg-indigo-500 px-4 py-2 text-white md:mt-6 "
            >
              {publishMutationIsLoading ? (
                <Loading className="mr-2 h-6 w-6 border-2" />
              ) : (
                ""
              )}
              {articleInfo.data?.isPublished ? "Unpublish" : "Publish"}
            </button>

            {/* This Should open a model for confirmation */}
            <button
              className="flex items-center justify-center rounded-lg bg-red-500 px-4 py-2 text-white md:hidden"
              onClick={() => setDeleteDialogOpen(true)}
            >
              Delete
            </button>
          </div>
        </div>
        <Dialog
          open={deleteDialogOpen}
          onClose={() => {
            if (!articleDeleteMutation.isLoading) {
              setDeleteDialogOpen(false);
              setDeleteModalInput("");
            }
          }}
          className={
            "fixed inset-0 z-10 flex items-center justify-center overflow-y-auto"
          }
        >
          <Dialog.Overlay
            className={"fixed inset-0  bg-black/50 backdrop-blur-md"}
          />
          <Dialog.Panel className={"z-10 max-w-xl rounded-xl bg-white p-2"}>
            <Dialog.Title className={"mb-2 text-xl font-semibold"}>
              Deactivate account
            </Dialog.Title>
            <Dialog.Description className={"texl-lg"}>
              All of the comments and data associated with this article will be
              permanently deleted. This action cannot be undone.
              <br />
              <br />
              Are you sure you want to delete
              <span className="font-bold">
                &quot;{articleInfo.data?.title}&quot;
              </span>
              ?
            </Dialog.Description>

            <input
              className="my-2 w-full p-2"
              onChange={(e) => {
                setDeleteModalInput(e.target.value);
              }}
            />
            {deleteModalInput !== articleInfo.data?.title && (
              <p className="mb-2 text-xs text-red-500">
                Please type the title of the article to confirm
              </p>
            )}
            <div className="flex justify-end gap-2">
              <button
                disabled={deleteModalInput !== articleInfo.data?.title}
                onClick={() => {
                  articleDeleteMutation.mutate(slug as string, {
                    onSuccess: () => {
                      router.push("/articles");
                      setDeleteDialogOpen(false);
                    },
                  });
                }}
                className="mt-4 flex items-center justify-center rounded-lg bg-red-500 px-4 py-2 text-white disabled:bg-red-400"
              >
                {articleDeleteMutation.isLoading && (
                  <Loading className="mr-2 h-6 w-6 border-2" />
                )}
                Delete
              </button>
              <button
                onClick={() => {
                  setDeleteDialogOpen(false);

                  setDeleteModalInput("");
                }}
                className=" mt-4 flex items-center justify-center rounded-lg bg-gray-500 px-4 py-2 text-white"
              >
                Cancel
              </button>
            </div>
          </Dialog.Panel>
        </Dialog>
      </div>
    </Dashboard>
  );
};

export default Inspect;
