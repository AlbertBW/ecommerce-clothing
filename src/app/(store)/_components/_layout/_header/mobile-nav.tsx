"use client";

import Bars3Icon from "@heroicons/react/24/outline/Bars3Icon";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import React from "react";

export default function MobileNav({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen((prev) => !prev);

  return (
    <>
      <button className="w-8" onClick={toggleOpen}>
        <Bars3Icon />
      </button>

      {/* Semi-transparent overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={toggleOpen}
        ></div>
      )}

      <div
        className={`fixed inset-y-0 left-0 w-[80%] dark:bg-black bg-zinc-200 shadow-lg transform transition-transform duration-300 ease-in-out z-50 overflow-y-scroll ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 z-50">{children}</div>
      </div>

      {/* Overlay button outside the menu */}
      {open && (
        <button
          className="fixed top-4 left-[calc(80%+1rem)] w-10 dark:bg-black bg-white shadow-lg z-50 border rounded border-zinc-700"
          onClick={toggleOpen}
        >
          <XMarkIcon />
        </button>
      )}
    </>
  );
}
