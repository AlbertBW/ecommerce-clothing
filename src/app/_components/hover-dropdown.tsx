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
    <div ref={ref} className="relative group">
      {trigger}

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
