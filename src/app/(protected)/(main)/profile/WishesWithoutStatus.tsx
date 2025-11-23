"use client";
import { type Preloaded, usePreloadedQuery } from "convex/react";
import WishWithoutStatus from "@/app/(protected)/(main)/home/WishWithoutStatus";
import EmptyWishList from "@/components/wish/EmptyWishList";
import type { api } from "../../../../../convex/_generated/api";

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
