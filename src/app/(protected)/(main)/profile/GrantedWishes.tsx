"use client";
import { type Preloaded, usePreloadedQuery } from "convex/react";
import EmptyWishList from "@/components/ui/wish/EmptyWishList";
import GrantedWish from "@/components/ui/wish/GrantedWish";
import type { api } from "../../../../../convex/_generated/api";

interface GrantedWishesProps {
  preloadedGrantedWishes: Preloaded<typeof api.wishes.getGrantedWishes>;
}

export default function GrantedWishes({
  preloadedGrantedWishes,
}: GrantedWishesProps) {
  const grantedWishes = usePreloadedQuery(preloadedGrantedWishes);

  return (
    <>
      {grantedWishes.length === 0 && (
        <EmptyWishList
          title="No Granted Wishes"
          description="You have no wishes that are granted yet. Wait for someone to grant you one."
        />
      )}

      <div className="grid h-full w-full grid-cols-2 gap-4">
        {grantedWishes.map((wish) => (
          <GrantedWish key={wish._id} wish={wish} />
        ))}
      </div>
    </>
  );
}
