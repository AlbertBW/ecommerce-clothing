"use client";

import Modal from "@/app/_components/modal";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import SearchInput from "./search-input";
import useSearchBox from "@/hooks/use-search-box";
import React from "react";

export default function SearchBox() {
  const [
    inputRef,
    inputOpen,
    toggleInput,
    handleSetInput,
    handleSubmit,
    error,
    inputValue,
  ] = useSearchBox();

  const searchInput = (
    <SearchInput
      ref={inputRef}
      value={inputValue}
      onChange={handleSetInput}
      onSubmit={handleSubmit}
      error={error}
    />
  );

  return (
    <>
      {/* Larger than mobile */}
      <div
        data-testid={"desktop-search"}
        className="hidden sm:flex flex-grow px-2 md:px-8"
      >
        {searchInput}
      </div>

      {/* Mobile view */}
      <div
        data-testid={"mobile-search"}
        className="block sm:hidden ml-auto mr-2"
      >
        <button
          onClick={toggleInput}
          data-testid="open-search-modal"
          className="dark:hover:text-zinc-200/70 hover:text-zinc-600/70 transition-colors min-w-10 min-h-10 rounded-md flex justify-center items-center"
        >
          <MagnifyingGlassIcon className="size-8" />
        </button>

        {inputOpen && (
          <Modal close={toggleInput}>
            <div className="absolute w-3/4 top-1/4 left-1/2 transform -translate-x-1/2 dark:bg-black bg-white">
              {searchInput}
            </div>
          </Modal>
        )}
      </div>
    </>
  );
}
