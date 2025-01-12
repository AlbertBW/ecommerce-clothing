"use client";

import useHover from "@/hooks/useHover";
import { useEffect, useState } from "react";

export default function HoverDropdown({
  trigger,
  dropdown,
}: Readonly<{
  trigger: React.ReactNode;
  dropdown: React.ReactNode;
}>) {
  const [ref, hovering] = useHover();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    setDropdownOpen(hovering);
  }, [hovering]);

  return (
    <div data-testid={"hover-trigger"} ref={ref} className="relative group">
      <div className="group flex justify-center items-center">
        <div className="relative group-hover:z-10">{trigger}</div>
      </div>
      <div
        className={`transition-opacity duration-300 ${
          dropdownOpen ? "opacity-100" : "opacity-0"
        }`}
      >
        {dropdownOpen && dropdown}
      </div>
    </div>
  );
}
