"use client";

import HoverDropdown from "@/app/_components/hover-dropdown";
import { HeaderCatergories, HeaderCatergory } from "@/lib/types";
import Link from "next/link";
import { useState } from "react";

export default function CategoryMenu({
  categories,
}: {
  categories: HeaderCatergory[];
}) {
  const [selectedGender, setSelectedGender] = useState<HeaderCatergories>();

  const handleMouse = (category: HeaderCatergories) => {
    console.log(category);
    setSelectedGender(category);

    console.log("selectedGender: ", selectedGender);
  };

  const menuLinks = (
    <div className="relative z-50 flex gap-8 md:gap-16">
      {categories.map((c) => (
        <Link
          key={c.gender}
          className="hover:text-zinc-400 z-20"
          href={`/${c.gender}`}
          onMouseEnter={() => handleMouse(c.categories)}
        >
          {c.gender.toLocaleUpperCase()}
        </Link>
      ))}
    </div>
  );

  return (
    <div className="flex justify-center items-center h-8 w-full">
      <HoverDropdown
        trigger={menuLinks}
        dropdown={
          <div className="fixed">
            {/* Background for header */}
            <div className="fixed left-0 right-0 top-0 w-full h-24 dark:bg-black bg-white " />

            {/* Dropdown Menu */}
            <div className="fixed left-0 right-0 top-[6rem] w-full h-1/2 dark:bg-black bg-white flex justify-center">
              helo
            </div>
          </div>
        }
      />
    </div>
  );
}
