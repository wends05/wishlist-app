"use client";
import { type Preloaded, usePreloadedQuery } from "convex/react";
import type { api } from "../../../convex/_generated/api";
import { CardHeader } from "../ui/card";
import { WishItem } from "../wish/Wish";

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
    <div className="grid h-full grid-cols-2 gap-4">
      {wishesWithoutStatus.map((wish) => (
        <WishItem key={wish._id} wish={wish}>
          <CardHeader>
            <WishItem.Image />
          </CardHeader>
          <WishItem.Content>
            {({ name, description }) => (
              <>
                <h1>{name}</h1>
                <p>{description}</p>
              </>
            )}
          </WishItem.Content>
        </WishItem>
      ))}
    </div>
  );
}
