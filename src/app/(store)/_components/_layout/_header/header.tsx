import { COMPANY_NAME } from "@/config";
import Link from "next/link";
import SearchBox from "./_search/search-box";
import ShoppingCart from "./shopping-cart";
import UserAccount from "./user-account";
import { Suspense } from "react";
import { SessionProvider } from "next-auth/react";
import { getHeaderMenuCollectionsWithCategories } from "@/use-cases/categories";
import CollectionsMenu from "./category-menu";
import MobileNav from "./mobile-nav";
import MobileCollectionsMenu from "./mobile-collection-menu";

export default async function Header() {
  const collectionsWithCategories =
    await getHeaderMenuCollectionsWithCategories();

  return (
    <header className="flex flex-col w-full bg-gradient-to-b dark:from-black/90 from-white/90 dark:via-black/60 via-white-60 to-transparent">
      <div className="flex w-full pt-2 px-4 md:px-12 lg:px-18 mx-auto justify-between items-center h-14 gap-2 z-50">
        <div className="flex justify-center items-center sm:hidden">
          <MobileNav>
            <MobileCollectionsMenu collections={collectionsWithCategories} />
          </MobileNav>
        </div>
        <Link href={"/"}>
          <h1 className="ml-4 font-bold lg:text-2xl">{COMPANY_NAME}</h1>
        </Link>
        <Suspense>
          <SearchBox />
        </Suspense>
        <div className="flex gap-4 md:gap-8 h-full items-center min-w-24">
          <ShoppingCart />
          <SessionProvider>
            <UserAccount />
          </SessionProvider>
        </div>
      </div>

      <div className="hidden sm:block">
        <CollectionsMenu collections={collectionsWithCategories} />
      </div>
    </header>
  );
}
