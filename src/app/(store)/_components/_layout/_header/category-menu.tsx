"use client";

import HoverDropdown from "@/app/_components/hover-dropdown";
import { HeaderCatergory, NavigationGroup } from "@/lib/types";
import Link from "next/link";
import { Fragment, useState } from "react";

export default function CategoryMenu({
  categories,
}: {
  categories: NavigationGroup[];
}) {
  const [selectedGender, setSelectedGender] = useState<HeaderCatergory[]>();

  const handleMouse = (category: HeaderCatergory[]) => {
    setSelectedGender(category);
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
            <div className="fixed left-0 right-0 top-0 w-full h-24 dark:bg-black/90 bg-white " />

            {/* Dropdown Menu */}
            <div className="fixed left-0 right-0 top-[6rem] w-full dark:bg-black/90 bg-white flex justify-center items-center">
              <div className="flex flex-col items-center flex-wrap gap-4 md:w-1/2 mt-4 mx-8 h-96">
                {selectedGender &&
                  selectedGender.map((c) => (
                    <CategoryBox category={c} key={c.id} />
                  ))}
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
}

export function CategoryBox({ category }: { category: HeaderCatergory }) {
  return (
    <Fragment>
      <div className="flex flex-col w-48">
        <Link
          className="underline"
          href={`/${category.name.toLocaleLowerCase()}`}
        >
          {category.name}
        </Link>

        {category.subcategories.map((sub) => (
          <Link
            key={sub.id}
            href={`/${category.name.toLocaleLowerCase()}/${sub.name.toLocaleLowerCase()}`}
          >
            {sub.name}
          </Link>
        ))}
      </div>
    </Fragment>
  );
}
