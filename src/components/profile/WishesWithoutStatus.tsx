"use client";
import { type Preloaded, usePreloadedQuery } from "convex/react";
import type { api } from "../../../convex/_generated/api";
import { CardHeader } from "../ui/card";
import EmptyWishList from "../wish/EmptyWishList";
import { WishComponent } from "../wish/WishComponent";

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
          <WishComponent key={wish._id} wish={wish}>
            <CardHeader>
              <WishComponent.Image />
            </CardHeader>
            <WishComponent.Content>
              {({ name, description }) => (
                <>
                  <h1>{name}</h1>
                  <p>{description}</p>
                </>
              )}
            </WishComponent.Content>
          </WishComponent>
        ))}
      </div>
    </>
  );
}
