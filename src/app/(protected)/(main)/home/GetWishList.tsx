import { preloadQuery } from "convex/nextjs";
import { api } from "../../../../../convex/_generated/api";
import WishList from "./WishList";

async function getPreloadedCategories(token: string | undefined) {
  const preloadedCategories = await preloadQuery(
    api.categories.getAllFilterCategories,
    {},
    { token }
  );
  return preloadedCategories;
}

interface GetWishListProps {
  token?: string;
}

export default async function GetWishList({ token }: GetWishListProps) {
  const preloadedCategories = await getPreloadedCategories(token);

  return <WishList preloadedCategories={preloadedCategories} />;
}
