import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { preloadQuery } from "convex/nextjs";
import { cacheLife } from "next/cache";
import { api } from "../../../../../convex/_generated/api";
import WishList from "./WishList";

async function getPreloadedCategories(token: string | undefined) {
  "use cache";
  cacheLife("minutes");
  const preloadedCategories = await preloadQuery(
    api.categories.getAllFilterCategories,
    {},
    { token }
  );
  return preloadedCategories;
}

export default async function GetWishList() {
  const token = await convexAuthNextjsToken();
  const preloadedCategories = await getPreloadedCategories(token);

  return <WishList preloadedCategories={preloadedCategories} />;
}
