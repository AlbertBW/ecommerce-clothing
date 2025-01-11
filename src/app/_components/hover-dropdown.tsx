"use client";

import useHover from "@/hooks/useHover";
import { useEffect, useState } from "react";

export default function HoverDropdown({
  children,
  dropdown,
}: Readonly<{
  children: React.ReactNode;
  dropdown: React.ReactNode;
}>) {
  const [ref, hovering] = useHover();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    setDropdownOpen(hovering);
  }, [hovering]);

  return (
    <div ref={ref} className="relative">
      <div className="relative z-50">{children}</div>
      <div
        className={`absolute transition-opacity z-40 duration-300 ${
          dropdownOpen ? "opacity-100" : "opacity-0"
        } -top-2 -right-2`}
      >
        {dropdownOpen && dropdown}
      </div>
    </div>
  );
}
