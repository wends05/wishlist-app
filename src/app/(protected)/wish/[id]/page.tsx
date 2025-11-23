import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { preloadQuery } from "convex/nextjs";
import { api } from "../../../../../convex/_generated/api";
import type { Id } from "../../../../../convex/_generated/dataModel";
import WishPage from "./WishPage";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const preloadedWish = await preloadQuery(
    api.wishes.getWishById,
    {
      wishId: id as Id<"wishes">,
    },
    {
      token: await convexAuthNextjsToken(),
    }
  );
  return <WishPage preloadedWish={preloadedWish} />;
}
