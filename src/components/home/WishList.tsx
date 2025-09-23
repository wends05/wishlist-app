"use client";
import { Preloaded, usePreloadedQuery } from "convex/react";
import React from "react";
import { api } from "../../../convex/_generated/api";
import WishItem from "../wish/WishItem";

interface WishListProps {
  preloadedWishes: Preloaded<typeof api.wish.findWishes>;
}

export default function WishList({ preloadedWishes }: WishListProps) {
  const wishes = usePreloadedQuery(preloadedWishes);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {wishes.map((wish) => (
        <WishItem key={wish._id} wish={wish} />
      ))}
    </div>
  );
}
