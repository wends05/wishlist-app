import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { preloadQuery } from "convex/nextjs";
import ReservedWishesPage from "@/app/(protected)/(main)/reserved/ReservedWishesPage";
import { api } from "../../../../../convex/_generated/api";

export default async function Reserved() {
  const preloadedReservedWishes = await preloadQuery(
    api.wishes.getReservedWishes,
    {},
    {
      token: await convexAuthNextjsToken(),
    }
  );
  return (
    <ReservedWishesPage preloadedReservedWishes={preloadedReservedWishes} />
  );
}
