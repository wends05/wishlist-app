"use client";
import { usePaginatedQuery } from "convex/react";
import { useEffect } from "react";
import { api } from "../../../convex/_generated/api";
import { Item, ItemContent } from "../ui/item";
import { Spinner } from "../ui/spinner";
import WishItem from "../wish/WishItem";

export default function WishList() {
  const {
    results: wishes,
    loadMore,
    isLoading,
    status,
  } = usePaginatedQuery(
    api.wishes.getHomePageWishes,
    {},
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
    <div className="flex h-full flex-col items-center justify-center">
      {isLoading && <Spinner className="size-20" />}
      <div className="grid w-max grid-cols-1 place-items-center gap-12 lg:grid-cols-2">
        {wishes.map((wish) => (
          <WishItem key={wish._id} wish={wish} />
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
              <ItemContent>No more wishes</ItemContent>
            </Item>
          )
        )}
      </div>
    </div>
  );
}
