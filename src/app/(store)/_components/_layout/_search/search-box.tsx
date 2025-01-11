"use client";

import Modal from "@/app/_components/modal";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useCallback, useEffect, useRef, useState } from "react";
import SearchInput from "./search-input";
import { useRouter } from "next/navigation";
import useQueryString from "@/hooks/useQueryString";

export default function SearchBox() {
  const router = useRouter();
  const [input, setInput] = useState("");
  const createQueryString = useQueryString();
  const [inputOpen, setInputOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const pathname = "/result";

  const toggleInput = useCallback(() => {
    document.startViewTransition(() => {
      setInputOpen((prev) => !prev);
    });
  }, []);

  useEffect(() => {
    if (inputOpen) {
      if (inputRef.current) {
        inputRef.current.focus();
      }
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          toggleInput();
        }
      };

      document.addEventListener("keydown", handleKeyDown);

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [inputOpen, toggleInput]);

  function handleSetInput(input: string) {
    setInput(input);
  }

  function handleSubmit() {
    toggleInput();

    const queryString = createQueryString({ product: input });
    router.push(pathname + "?" + queryString);
  }

  function handleSubmitOnKeyPress(value: string) {
    if (value === "Enter") {
      handleSubmit();
    }
  }

  return (
    <>
      {/* Larger than mobile */}
      <div className="hidden sm:flex flex-grow px-2 md:px-8">
        <SearchInput
          onChange={handleSetInput}
          onSubmit={handleSubmit}
          onKeyDown={handleSubmitOnKeyPress}
        />
      </div>

      {/* Mobile view */}
      <div className="block sm:hidden ml-auto mr-2">
        <button
          onClick={toggleInput}
          className="dark:hover:text-zinc-200/70 hover:text-zinc-600/70 transition-colors min-w-10 min-h-10 rounded-md flex justify-center items-center"
        >
          <MagnifyingGlassIcon className="size-8" />
        </button>

        {inputOpen && (
          <Modal close={toggleInput}>
            <div className="absolute w-3/4 top-1/4 left-1/2 transform -translate-x-1/2 dark:bg-black bg-white">
              <SearchInput
                ref={inputRef}
                onChange={handleSetInput}
                onSubmit={handleSubmit}
                onKeyDown={handleSubmitOnKeyPress}
              />
            </div>
          </Modal>
        )}
      </div>
    </>
  );
}
