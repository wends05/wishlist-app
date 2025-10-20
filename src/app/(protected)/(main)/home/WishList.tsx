"use client";
import {
  type Preloaded,
  usePaginatedQuery,
  usePreloadedQuery,
} from "convex/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Item, ItemContent } from "@/components/ui/item";
import { Spinner } from "@/components/ui/spinner";
import HomeWishItem from "@/components/ui/wish/HomeWishItem";
import { api } from "../../../../../convex/_generated/api";
import type { Id } from "../../../../../convex/_generated/dataModel";
import FilterButton from "./FilterButton";
import Search from "./Search";

interface WishListProps {
  preloadedCategories: Preloaded<typeof api.categories.getAllFilterCategories>;
}

export default function WishList({ preloadedCategories }: WishListProps) {
  const filterCategories = usePreloadedQuery(preloadedCategories);

  const [categoryId, setCategoryId] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  const searchQuery = searchParams.get("search");

  const setSearchQuery = (query: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (query) {
      params.set("search", query);
    } else {
      params.delete("search");
    }
    router.push(`?${params.toString()}`);
  };

  const setFilterCategory = (categoryId: string | undefined) => {
    setCategoryId(categoryId || null);
  };

  const {
    results: wishes,
    loadMore,
    isLoading,
    status,
  } = usePaginatedQuery(
    api.wishes.getHomePageWishes,
    {
      searchQuery: searchQuery || undefined,
      categoryId: (categoryId as Id<"categories">) || undefined,
    },
    {
      initialNumItems: 5,
    }
  );
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight &&
        !isLoading
      ) {
        loadMore(5);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading, loadMore]);

  return (
    <div className="flex flex-col items-center justify-center gap-20">
      <div className="flex h-20 w-full items-center justify-center gap-2">
        <Search
          searchQuery={searchQuery || ""}
          setSearchQuery={setSearchQuery}
        />
        <FilterButton
          category={categoryId}
          filterCategories={filterCategories}
          setSelectedCategoryId={setFilterCategory}
        />
      </div>
      {isLoading && <Spinner className="size-20" />}
      <div className="grid h-full w-max grid-cols-1 place-items-center gap-12 lg:grid-cols-2">
        {wishes.map((wish) => (
          <HomeWishItem key={wish._id} wish={wish} />
        ))}
      </div>
      <div className="flex h-full min-h-40 items-center justify-center text-center">
        {status === "LoadingMore" ? (
          <Spinner className="size-20" />
        ) : status === "CanLoadMore" ? (
          "Scroll to load more"
        ) : (
          status === "Exhausted" && (
            <Item variant={"outline"}>
              <ItemContent>
                {searchQuery && wishes.length === 0
                  ? "No wishes found matching your search"
                  : "No more wishes"}
              </ItemContent>
            </Item>
          )
        )}
      </div>
    </div>
  );
}
