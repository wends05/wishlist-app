"use client";
import { type Preloaded, usePreloadedQuery } from "convex/react";
import type { api } from "../../../convex/_generated/api";
import EmptyWishList from "../ui/wish/EmptyWishList";
import WishWithoutStatus from "../ui/wish/WishWithoutStatus";

interface WishesWithoutStatusProps {
  preloadedWishesWithoutStatus: Preloaded<
    typeof api.wishes.getWishesWithoutStatus
  >;
}

export default function WishesWithoutStatus({
  preloadedWishesWithoutStatus,
}: WishesWithoutStatusProps) {
  const wishesWithoutStatus = usePreloadedQuery(preloadedWishesWithoutStatus);
  return (
    <>
      {wishesWithoutStatus.length === 0 && <EmptyWishList />}
      <div className="grid h-full grid-cols-2 gap-4">
        {wishesWithoutStatus.map((wish) => (
          <WishWithoutStatus wish={wish} key={wish._id} />
        ))}
      </div>
    </>
  );
}
