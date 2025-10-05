"use client";
import { usePaginatedQuery } from "convex/react";
import { useEffect } from "react";
import { api } from "../../../convex/_generated/api";
import WishItem from "../wish/WishItem";

export default function WishList() {
  const {
    results: wishes,
    loadMore,
    isLoading,
    status,
  } = usePaginatedQuery(
    api.wishes.findWishesOnHomePage,
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
      <div className="grid w-max grid-cols-1 place-items-center gap-12 lg:grid-cols-2">
        {wishes.map((wish) => (
          <WishItem key={wish._id} wish={wish} />
        ))}
      </div>
      <div className="flex h-40 items-center justify-center text-center">
        {status === "LoadingMore"
          ? "Loading..."
          : status === "CanLoadMore"
            ? "Scroll to load more"
            : status === "Exhausted"
              ? "All wishes have been loaded."
              : ""}
      </div>
    </div>
  );
}
