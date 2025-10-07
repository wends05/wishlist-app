"use client";
import { type Preloaded, usePreloadedQuery } from "convex/react";
import type { api } from "../../../convex/_generated/api";
import EmptyGrants from "./EmptyReservedWishList";
import ReservedWish from "./ReservedWish";

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
      <div className="grid h-full w-full grid-cols-1 place-items-center gap-12 lg:grid-cols-2">
        {reservedWishes.map((wish) => (
          <ReservedWish wish={wish} key={wish._id} />
        ))}
      </div>
    </main>
  );
}
