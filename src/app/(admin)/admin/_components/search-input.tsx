"use client";

import { useState } from "react";
import SidebarButton from "./_sidebar/sidebar-button";

export default function SearchInput({ popupText }: { popupText: string }) {
  const [value, setValue] = useState("");

  return (
    <div className="mt-6 flex flex-col items-start gap-2 max-w-fit z-50">
      <div className="flex gao-4 items-center">
        <h4 className="font-bold">Search</h4>
        <div className="relative flex items-center">
          {/* Info Icon with unique group name */}
          <div className="group/info flex items-center justify-center cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
              />
            </svg>

            {/* Popup Content - now uses group/info */}
            <div className="fixed left-24 top-20 transform -translate-y-1/2 hidden group-hover/info:flex w-64 p-4 text-sm text-white bg-gray-800 rounded-xl shadow-lg z-50">
              <p>{popupText}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-sm font-light">
        <SidebarButton
          filter={"search"}
          value={""}
          text="Clear"
          paramType="clear"
        />
      </div>
      <input
        type="text"
        className="w-full px-2 py-1 text-sm border border-zinc-500 rounded-md dark:bg-black max-w-40"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
      />
      <div className="w-full text-center">
        <SidebarButton
          filter={"search"}
          value={value}
          text="Submit"
          disabled={value === ""}
          disableColour={true}
        />
      </div>
    </div>
  );
}
