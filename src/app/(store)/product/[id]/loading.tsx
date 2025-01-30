import BackButton from "@/app/_components/back-button";
import LoadingSpinner from "@/app/_components/loading-spinner";

export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="max-w-screen-xl mt-8 ml-4 md:mx-auto">
        <BackButton />
      </div>
      <div className="min-h-[calc(100vh-197px)] max-w-screen-xl flex text-center mx-auto">
        <div className="flex md:flex-row flex-col mb-24 items-center w-full justify-between">
          <div className="my-8 md:my-0 dark:bg-zinc-900 bg-zinc-400 w-[700px] max-w-full aspect-[1/1]" />

          <div className="flex flex-col justify-between gap-2 md:w-2/5 w-full text-xl mx-auto items-center uppercase">
            <div className="w-1/4 h-8 dark:bg-zinc-800 bg-zinc-400 mb-1 rounded-md"></div>
            <div className="w-2/5 h-8 dark:bg-zinc-800 bg-zinc-400 mb-1 rounded-md"></div>
            <div className="w-1/5 h-8 dark:bg-zinc-800 bg-zinc-400 mb-1 rounded-md"></div>
            <div className="w-4/6 h-8 dark:bg-zinc-800 bg-zinc-400 mb-1 rounded-md"></div>
            <div className="w-1/4 h-8 dark:bg-zinc-800 bg-zinc-400 mb-1 rounded-md"></div>
            <button
              disabled
              className="dark:bg-zinc-800 bg-zinc-400 w-1/2 self-center flex justify-center gap-4 text-white font-bold py-2 px-4 rounded"
            >
              <LoadingSpinner />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
