import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { preloadQuery } from "convex/nextjs";
import ReservedWishesPage from "@/app/(protected)/(main)/reserved/ReservedWishesPage";
import { api } from "../../../../../convex/_generated/api";

async function getReservedWishes(token?: string) {
  const preloadedReservedWishes = await preloadQuery(
    api.wishes.getReservedWishes,
    {},
    { token }
  );
  return preloadedReservedWishes;
}

export default async function Page() {
  const token = await convexAuthNextjsToken();
  const preloadedReservedWishes = await getReservedWishes(token);
  return (
    <ReservedWishesPage preloadedReservedWishes={preloadedReservedWishes} />
  );
}
