"use client";
import { type Preloaded, usePreloadedQuery } from "convex/react";
import type { api } from "../../../convex/_generated/api";
import { Card, CardContent } from "../ui/card";

type PendingWishesProps = {
  pendingWishes: Preloaded<typeof api.wishes.getPendingWishes>;
};

export default function PendingWishes({ pendingWishes }: PendingWishesProps) {
  const preloadedPendingWishes = usePreloadedQuery(pendingWishes);

  return (
    <Card>
      <CardContent>test</CardContent>
    </Card>
  );
}
