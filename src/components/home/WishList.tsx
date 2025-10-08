"use client";
import { usePaginatedQuery } from "convex/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { api } from "../../../convex/_generated/api";
import { Item, ItemContent } from "../ui/item";
import { Spinner } from "../ui/spinner";
import HomeWishItem from "../ui/wish/HomeWishItem";
import Search from "./Search";

export default function WishList() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const debouncedQuery = searchParams.get("search") || "";

  const setSearchQuery = (query: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (query) {
      params.set("search", query);
    } else {
      params.delete("search");
    }
    router.push(`?${params.toString()}`);
  };

  const {
    results: wishes,
    loadMore,
    isLoading,
    status,
  } = usePaginatedQuery(
    api.wishes.getHomePageWishes,
    { searchQuery: debouncedQuery || "" },
    {
      initialNumItems: 5,
    },
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
    <div className="flex h-full flex-col items-center justify-center gap-20">
      <Search searchQuery={debouncedQuery} setSearchQuery={setSearchQuery} />
      {isLoading && <Spinner className="size-20" />}
      <div className="grid w-max grid-cols-1 place-items-center gap-12 lg:grid-cols-2">
        {wishes.map((wish) => (
          <HomeWishItem key={wish._id} wish={wish} />
        ))}
      </div>
      <div className="flex h-40 items-center justify-center text-center">
        {status === "LoadingMore" ? (
          <Spinner className="size-20" />
        ) : status === "CanLoadMore" ? (
          "Scroll to load more"
        ) : (
          status === "Exhausted" && (
            <Item variant={"outline"}>
              <ItemContent>
                {debouncedQuery && wishes.length === 0
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
