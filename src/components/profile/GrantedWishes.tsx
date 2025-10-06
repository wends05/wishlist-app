"use client";
import { type Preloaded, usePreloadedQuery } from "convex/react";
import type { api } from "../../../convex/_generated/api";
import EmptyWishList from "../wish/EmptyWishList";
import { WishComponent } from "../wish/WishComponent";

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
          <WishComponent key={wish._id} wish={wish}>
            <WishComponent.Header>
              <WishComponent.Image />
            </WishComponent.Header>
            <WishComponent.Content>
              {({ name, description }) => (
                <div>
                  <h1>{name}</h1>
                  <p>{description}</p>
                  <WishComponent.GrantedBy className="pt-5 text-secondary" />
                </div>
              )}
            </WishComponent.Content>
          </WishComponent>
        ))}
      </div>
    </>
  );
}
