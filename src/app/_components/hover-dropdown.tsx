"use client";

import { useState } from "react";

export default function HoverDropdown({
  trigger,
  dropdown,
}: Readonly<{
  trigger: React.ReactNode;
  dropdown: React.ReactNode;
}>) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div
      data-testid={"hover-trigger"}
      className="relative group z-10"
      onMouseEnter={() => setDropdownOpen(true)}
      onMouseLeave={() => setDropdownOpen(false)}
      onClick={() => setDropdownOpen(false)}
    >
      <div className="group flex justify-center items-center">
        <div className="relative group-hover:z-20">{trigger}</div>
      </div>
      <div
        className={`transition-opacity ${
          dropdownOpen ? "opacity-100" : "opacity-0"
        }`}
      >
        {dropdownOpen && dropdown}
      </div>
    </div>
  );
}
