import { useQuery } from "@tanstack/react-query";
import { getPosts } from "./posts";
import { useRef } from "react";
import ReactIcon from "./assets/react.svg";

export function PostList() {
  const {
    isLoading,
    isPending,
    isFetching,
    isSuccess,
    isFetched,
    failureReason,
    error,
    data,
    failureCount,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    retry: 2,
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
                className="text-sm rounded-sm py-2 px-5 bg-opacity-10 border border-gray-500"
              >
                {post.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
