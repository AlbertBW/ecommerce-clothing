"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

export default function SearchBox() {
  return (
    <div className="flex flex-grow px-2 md:px-8">
      <div className="flex justify-end w-full mx-auto max-w-screen-md sm:focus-within:border-none sm:border-0 border-black rounded-md sm:focus-within:ring-2 sm:focus-within:ring-sky-500 sm:focus-within:border-sky-500 sm:dark:focus-within:bg-sky-950/40  sm:focus-within:bg-sky-50/40 transition-all">
        <input
          className="hidden sm:flex sm:border-l sm:border-y border-zinc-700 w-full bg-transparent rounded-l-md p-2 focus:outline-none"
          type="search"
          name="search"
          id="search"
          placeholder="Search"
          autoComplete="off"
          onChange={(e) => console.log(e.target.value)}
          onKeyDown={(e) => console.log(e.key)}
        />
        <button className="sm:border-r sm:border-y border-zinc-700 hover:bg-zinc-800 hover:text-white transition-colors min-w-10 min-h-10 rounded-md sm:rounded-l-none sm:rounded-r-md flex justify-center items-center">
          <MagnifyingGlassIcon className="size-8" />
        </button>
      </div>
    </div>
  );
}
