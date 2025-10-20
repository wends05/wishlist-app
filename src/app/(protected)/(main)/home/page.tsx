import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { preloadQuery } from "convex/nextjs";
import HomePageStart from "@/app/(protected)/(main)/home/HomePageStart";
import WishList from "@/app/(protected)/(main)/home/WishList";
import { api } from "../../../../../convex/_generated/api";

export default async function HomePage() {
  const preloadedCategories = await preloadQuery(
    api.categories.getAllFilterCategories,
    {},
    { token: await convexAuthNextjsToken() }
  );

  return (
    <>
      <HomePageStart />
      <WishList preloadedCategories={preloadedCategories} />
    </>
  );
}
