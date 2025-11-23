"use client";
import { type Preloaded, usePreloadedQuery } from "convex/react";
import { useRouter } from "next/navigation";
import ReturnButton from "@/components/ReturnButton";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { api } from "../../../../../convex/_generated/api";

interface WishPageProps {
  preloadedWish: Preloaded<typeof api.wishes.getWishById>;
}

export default function WishPage({ preloadedWish }: WishPageProps) {
  const wish = usePreloadedQuery(preloadedWish);
  return (
    <>
      <CardHeader className="flex flex-col gap-2">
        <ReturnButton>Back</ReturnButton>
        <div>
          <CardTitle>{wish.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>Hello'ed mhie'ed</CardContent>
    </>
  );
}
