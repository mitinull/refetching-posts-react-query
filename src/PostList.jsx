import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addNewPost, getPosts } from "./posts";
import { useRef, useState } from "react";
import ReactIcon from "./assets/react.svg";

export function PostList({ onClick }) {
  const queryClient = useQueryClient();

  const {
    isLoading,
    isPending,
    isFetching,
    isSuccess,
    error,
    data,
    failureCount,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    retry: 2,
  });

  const [invalidate, setInvalidate] = useState(true);
  const [localChange, setLocalChange] = useState(false);

  const newPostMutation = useMutation({
    mutationFn: addNewPost,
    retry: 2,
    onSuccess: (newPost) => {
      if (localChange) {
        queryClient.setQueriesData(["posts"], (old) => {
          console.log({ old });
          return {
            ...old,
            posts: [...old.posts, { id: new Date(), title: "NEW POST!!!!" }],
          };
        });
      }

      if (invalidate) {
        queryClient.invalidateQueries(["posts"]);
      }
    },
  });

  const lastFailureCount = useRef(0);

  lastFailureCount.current =
    !isFetching && isSuccess ? lastFailureCount.current : failureCount;

  console.log({
    failureCount,
    lfc: lastFailureCount.current,
    isSuccess,
    isFetching,
  });

  const timeToClock = (time) => {
    const date = new Date(time);

    return date.toLocaleTimeString();
  };

  return (
    <>
      <div className="flex items-center gap-4 mb-5">
        <img
          className={`w-7 ${isFetching ? "animate-spin" : ""}`}
          src={ReactIcon}
          alt="react icon"
        />
        <div>
          <div>
            {isFetching
              ? "React Query Is Fetching . . ."
              : "React Query Is Not Fetching."}
          </div>
          <div className="text-sm text-gray-700">
            {isFetching
              ? `Failed ${failureCount} ${
                  failureCount === 1 ? "Time" : "Times"
                }.`
              : `Failed ${lastFailureCount.current} ${
                  lastFailureCount.current === 1 ? "Time" : "Times"
                }. (On The Last Try)`}
          </div>
        </div>
      </div>

      {isSuccess && (
        <div className="bg-green-500 text-green-950 text-sm py-3 px-5 mb-5 rounded-sm">
          React Query successfully fetched the data on the last attempt!
        </div>
      )}

      {error && (
        <div className="bg-red-500 text-red-950 text-sm py-3 px-5 mb-5 rounded-sm">
          React Query couldn’t fetch the data on the last 3 attempts.
        </div>
      )}

      {isPending && (
        <div className="text-2xl font-extralight leading-10">Pending . . .</div>
      )}

      {isLoading && (
        <div className="text-2xl font-extralight leading-10">Loading . . .</div>
      )}

      {data && (
        <div>
          <div className="border border-gray-500 rounded-sm mb-7 py-3 px-5 text-center">
            <div className="text-gray-700">Last Successful Attempt</div>
            <div className="text-2xl">{timeToClock(data.time)}</div>
          </div>
          <ul className="relative text-lg flex flex-col gap-4 p-5 pt-6 border border-gray-500 rounded-sm">
            <div className="text-xs text-gray-800 bg-slate-300 absolute -top-2 px-2">
              latest posts
            </div>
            {data.posts.map((post) => (
              <li
                key={post.id}
                onClick={() => onClick(post.title)}
                className="text-blue-700 cursor-pointer text-sm rounded-sm py-2 px-5 bg-opacity-10 border border-gray-500"
              >
                {post.title}
              </li>
            ))}
            <div>
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  checked={invalidate}
                  onChange={() => setInvalidate((p) => !p)}
                />
                <div
                  className="text-sm cursor-pointer"
                  onClick={() => setInvalidate((p) => !p)}
                >
                  Refetch (Invalidate) After Success.
                </div>
              </div>
              <div className="flex gap-2 items-center mt-1">
                <input
                  type="checkbox"
                  checked={localChange}
                  onChange={() => setLocalChange((p) => !p)}
                />
                <div
                  className="text-sm cursor-pointer"
                  onClick={() => setLocalChange((p) => !p)}
                >
                  Set Data Locally After Success.
                </div>
              </div>
            </div>
            <button
              disabled={newPostMutation.isPending}
              onClick={() => newPostMutation.mutate()}
              className="p-2 w-full border border-gray-700 rounded-sm font-light text-base bg-gray-800 disabled:bg-gray-500 disabled:border-gray-400 text-slate-300"
            >
              Add New Post
            </button>
            {newPostMutation.isPending && (
              <div className="bg-yellow-500 text-yellow-950 text-xs py-2 px-5 rounded-sm">
                Trying To Add. Failed {newPostMutation.failureCount} Time(s).
              </div>
            )}
            {newPostMutation.isSuccess && (
              <div className="bg-green-500 text-green-950 text-xs py-2 px-5 rounded-sm">
                React Query Added New Post.
              </div>
            )}
            {newPostMutation.isError && (
              <div className="bg-red-500 text-red-950 text-xs py-2 px-5 rounded-sm">
                React Query Failed To Add New Post.
              </div>
            )}
          </ul>
        </div>
      )}
    </>
  );
}
