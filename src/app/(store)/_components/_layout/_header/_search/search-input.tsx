import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Ref } from "react";

export default function SearchInput({
  ref,
  value,
  onChange,
  onSubmit,
  error,
}: {
  ref?: Ref<HTMLInputElement> | undefined;
  value: string;
  onChange: (input: string) => void;
  onSubmit: (key?: string) => void;
  error?: string | null;
}) {
  const errorStyle =
    "focus-within:ring-2 focus-within:ring-red-500 focus-within:border-red-500 dark:focus-within:bg-red-950/40  focus-within:bg-red-50/40";

  const regularStyle =
    "focus-within:ring-2 focus-within:ring-sky-500 focus-within:border-sky-500 dark:focus-within:bg-sky-950/80 focus-within:bg-sky-50/80";

  return (
    <div
      className={`group dark:bg-black/70 bg-white/70 flex justify-end w-full mx-auto max-w-screen-md border border-zinc-700 rounded-md ${
        error ? errorStyle : regularStyle
      } transition-all`}
    >
      <input
        ref={ref}
        className="flex w-full bg-transparent p-2 focus:outline-none"
        type="search"
        name="search"
        id="search"
        placeholder={error || `Search`}
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => onSubmit(e.key)}
        aria-required
      />

      <button
        onClick={() => onSubmit()}
        className="group min-w-10 min-h-10 rounded-md flex justify-center items-center"
      >
        <MagnifyingGlassIcon className="size-8 hover:dark:opacity-70 hover:opacity-50 transition-all duration-300" />
      </button>
    </div>
  );
}
