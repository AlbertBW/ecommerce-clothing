"use client";

import { RefObject, useEffect, useRef, useState } from "react";

export default function useHover(): [
  RefObject<HTMLDivElement | null>,
  boolean
] {
  const [hovering, setHover] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  function handleMouseEnter() {
    setHover(true);
  }

  function handleMouseLeave() {
    setHover(false);
  }

  useEffect(() => {
    const node = ref.current;

    if (node) {
      node.addEventListener("mouseenter", handleMouseEnter);
      node.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        node.removeEventListener("mouseenter", handleMouseEnter);
        node.removeEventListener("mouseleave", handleMouseLeave);
        console.log("RETURNED");
      };
    }
  }, []);

  return [ref, hovering];
}
