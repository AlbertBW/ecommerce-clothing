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

      <div className="relative flex items-center">
        {/* Info Icon with unique group name */}
        <div className="group/info flex items-center justify-center cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
            />
          </svg>

          {/* Popup Content - now uses group/info */}
          <div className="absolute right-2 top-20 transform -translate-y-1/2 hidden group-hover/info:flex w-64 p-4 text-sm text-white bg-gray-800 rounded-xl shadow-lg">
            <p>
              You can search by product name, brand, description, colour or
              product number.
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={() => onSubmit()}
        className="group min-w-10 min-h-10 rounded-md flex justify-center items-center"
      >
        <MagnifyingGlassIcon className="size-8 hover:dark:opacity-70 hover:opacity-50 transition-all duration-300" />
      </button>
    </div>
  );
}
