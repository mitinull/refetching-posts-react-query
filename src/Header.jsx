import { useQuery } from "@tanstack/react-query";
import ReactLogo from "./assets/react.svg";

export function Header() {
  const { refetch } = useQuery({ queryKey: ["posts"], retry: 2 });

  return (
    <div className="border-b border-gray-400 p-5">
      <h1 className="text-3xl font-light leading-10">Hello, React Query!</h1>
      <h2 className="text-2xl font-extralight text-gray-700 mt-2">
        Let’s fetch like there’s no tomorrow! 🚀
      </h2>
      <div className="mt-4 flex gap-2">
        <button
          className="p-2 w-full border border-gray-700 rounded-sm font-light text-lg bg-gray-800 text-slate-300"
          onClick={() => {
            refetch();
          }}
        >
          REFETCH 🛜
        </button>
        <button
          className="p-2 w-full border border-gray-700 rounded-sm font-light text-lg bg-gray-800 text-slate-300"
          onClick={() => {
            location.reload();
          }}
        >
          REFRESH 🔄️
        </button>
      </div>
      <p></p>
    </div>
  );
}
