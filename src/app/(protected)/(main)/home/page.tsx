import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { preloadQuery } from "convex/nextjs";
import HomePageStart from "@/components/home/HomePageStart";
import WishList from "@/components/home/WishList";
import { api } from "../../../../../convex/_generated/api";

export default async function HomePage() {
  const preloadedCategories = await preloadQuery(
    api.categories.getAllFilterCategories,
    {},
    { token: await convexAuthNextjsToken() },
  );

  return (
    <>
      <HomePageStart />
      <WishList preloadedCategories={preloadedCategories} />
    </>
  );
}
