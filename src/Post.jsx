import { useQuery } from "@tanstack/react-query";
import { getPostDetail, getUser } from "./posts";

export function Post({ title, onBack }) {
  const {
    data,
    isPending,
    isLoading,
    isError,
    isFetching,
    failureCount,
    refetch,
  } = useQuery({
    queryKey: ["post", title],
    queryFn: getPostDetail,
    retry: 2,
  });

  const {
    data: userData,
    isPending: userIsPending,
    isLoading: userIsLoading,
    isError: userIsError,
    isFetching: userIsFetching,
    refetch: refetchUser,
    failureCount: userFailureCount,
  } = useQuery({
    enabled: !!data?.user,
    queryKey: ["user", data?.user],
    queryFn: () => getUser(data?.user),
    retry: 2,
  });

  const bToT = (b) => {
    return b ? (
      <span className="text-green-800">true</span>
    ) : (
      <span className="text-red-800">false</span>
    );
  };

  return (
    <div className="p-5">
      <button
        onClick={onBack}
        className="p-2 w-full border border-gray-700 rounded-sm font-light text-lg bg-gray-800 text-slate-300"
      >
        BACK TO HOMEPAGE
      </button>
      <div className="mt-2 flex gap-2">
        <button
          className="p-2 w-full border border-gray-700 rounded-sm font-light text-lg bg-gray-800 text-slate-300"
          onClick={() => {
            refetch();
          }}
        >
          REFETCH DETAIL
        </button>
        <button
          className="p-2 w-full border border-gray-700 rounded-sm font-light text-lg bg-gray-800 text-slate-300"
          onClick={() => {
            refetchUser();
          }}
        >
          REFRESH USER
        </button>
      </div>
      <h1 className="text-3xl font-light mt-6">{title}</h1>
      <div className="border border-gray-500 p-5 rounded-sm flex gap-2">
        <div className="flex-1">
          <div>detail is pending: {bToT(isPending)}</div>
          <div>detail is loading: {bToT(isLoading)}</div>
          <div>detail is fetching: {bToT(isFetching)}</div>
          <div>detail failure count: {failureCount}</div>
          <div>detail is error: {bToT(isError)}</div>
        </div>
        <div className="flex-1">
          <div>user is pending: {bToT(userIsPending)}</div>
          <div>user is loading: {bToT(userIsLoading)}</div>
          <div>user is fetching: {bToT(userIsFetching)}</div>
          <div>user failure count: {userFailureCount}</div>
          <div>user is error: {bToT(userIsError)}</div>
        </div>
      </div>
      <div>
        <span>post detail: </span>
        {data && (
          <span>
            {data.detail} (user of this post: {data.user})
          </span>
        )}
      </div>
      <div>
        <span>user detail: </span>
        {userData && <span>{userData.user}</span>}
      </div>
    </div>
  );
}
