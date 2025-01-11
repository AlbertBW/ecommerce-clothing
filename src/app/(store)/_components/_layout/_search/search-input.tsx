import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Ref } from "react";

export default function SearchInput({
  ref,
  onChange,
  onSubmit,
  onKeyDown,
}: {
  ref?: Ref<HTMLInputElement> | undefined;
  onChange: (input: string) => void;
  onSubmit: () => void;
  onKeyDown: (key: string) => void;
}) {
  return (
    <div className="group flex justify-end w-full mx-auto max-w-screen-md border border-zinc-700 rounded-md focus-within:ring-2 focus-within:ring-sky-500 focus-within:border-sky-500 dark:focus-within:bg-sky-950/40  focus-within:bg-sky-50/40 transition-all">
      <input
        ref={ref}
        className="flex w-full bg-transparent p-2 focus:outline-none"
        type="search"
        name="search"
        id="search"
        placeholder="Search"
        autoComplete="off"
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => onKeyDown(e.key)}
      />

      <button
        onSubmit={onSubmit}
        className="group min-w-10 min-h-10 rounded-md flex justify-center items-center"
      >
        <MagnifyingGlassIcon className="size-8 hover:dark:opacity-70 hover:opacity-50 transition-all duration-300" />
      </button>
    </div>
  );
}
