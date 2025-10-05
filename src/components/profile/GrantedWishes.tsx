"use client";
import { type Preloaded, usePreloadedQuery } from "convex/react";
import type { api } from "../../../convex/_generated/api";
import { CardHeader } from "../ui/card";
import { WishItem } from "../wish/Wish";

interface GrantedWishesProps {
  preloadedGrantedWishes: Preloaded<typeof api.wishes.getGrantedWishes>;
}

export default function GrantedWishes({
  preloadedGrantedWishes,
}: GrantedWishesProps) {
  const grantedWishes = usePreloadedQuery(preloadedGrantedWishes);

  return (
    <div className="grid h-fit grid-cols-2 gap-4">
      {grantedWishes.map((wish) => (
        <WishItem key={wish._id} wish={wish}>
          <WishItem.Header>
            <WishItem.Image />
          </WishItem.Header>
          <WishItem.Content>
            {({ name, description }) => (
              <div>
                <h1>{name}</h1>
                <p>{description}</p>
                <WishItem.GrantedBy className={"pt-5 text-secondary"} />
              </div>
            )}
          </WishItem.Content>
        </WishItem>
      ))}
    </div>
  );
}
