"use client";

import SearchIcon from "../_icons/search";

export default function SearchBox() {
  return (
    <div className="flex border dark:border-0 border-black rounded-md focus-within:ring-2 focus-within:ring-sky-500 focus-within:border-sky-500">
      <input
        className="dark:bg-zinc-900 rounded-l-md p-2 focus:outline-none"
        type="search"
        name="search"
        id="search"
        placeholder="Search"
        autoComplete="off"
        onChange={(e) => console.log(e.target.value)}
        onKeyDown={(e) => console.log(e.key)}
      />
      <button className="dark:bg-zinc-500 w-12 rounded-r-md flex justify-center items-center">
        <SearchIcon />
      </button>
    </div>
  );
}
