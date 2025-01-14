"use client";
import { useRouter } from "next/navigation";
import { useState, useRef, useCallback, useEffect, RefObject } from "react";
import useQueryString from "./use-query-string";

export default function useSearchBox(): [
  RefObject<HTMLInputElement | null>,
  boolean,
  () => void,
  (input: string) => void,
  (keyPressSubmit: string | undefined) => void,
  string | null,
  string
] {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState<string | null>(null);
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
    if (error) {
      setError(null);
    }
    setInputValue(input);
  }

  /**
   * Handles the submission of the search box input.
   *
   * @param keyPressSubmit - The key press event that triggers the submit.
   *                         If undefined or "Enter", the submit is triggered.
   *                         Submit can also be triggered by the keyPress "Enter".
   */
  function handleSubmit(keyPressSubmit: string | undefined) {
    if (!keyPressSubmit || keyPressSubmit === "Enter") {
      if (inputValue === "") {
        setError("Please enter a value");
        return;
      }
      toggleInput();

      const queryString = createQueryString({ product: inputValue });
      router.push(pathname + "?" + queryString);
    }
  }

  return [
    inputRef,
    inputOpen,
    toggleInput,
    handleSetInput,
    handleSubmit,
    error,
    inputValue,
  ];
}
