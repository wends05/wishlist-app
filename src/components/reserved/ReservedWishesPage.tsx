"use client";
import { type Preloaded, usePreloadedQuery } from "convex/react";
import type { api } from "../../../convex/_generated/api";
import { WishComponent } from "../wish/WishComponent";
import EmptyGrants from "./EmptyReservedWishList";

interface ReservedWishesPageProps {
  preloadedReservedWishes: Preloaded<typeof api.wishes.getReservedWishes>;
}
export default function ReservedWishesPage({
  preloadedReservedWishes,
}: ReservedWishesPageProps) {
  const reservedWishes = usePreloadedQuery(preloadedReservedWishes);

  return (
    <main className="px-20 pt-14">
      {reservedWishes.length === 0 && <EmptyGrants />}
      <div className="grid h-full w-full grid-cols-1 place-items-center gap-12 md:grid-cols-2">
        {reservedWishes.map((wish) => (
          <WishComponent wish={wish} key={wish._id} className="h-full">
            <WishComponent.Header>
              <WishComponent.Image />
            </WishComponent.Header>
            <WishComponent.Content>
              {({ name, description }) => (
                <>
                  <h1>{name}</h1>
                  <p>{description}</p>
                  <WishComponent.Owner />
                </>
              )}
            </WishComponent.Content>
          </WishComponent>
        ))}
      </div>
    </main>
  );
}
