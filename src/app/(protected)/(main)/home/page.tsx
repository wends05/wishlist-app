import { preloadQuery } from "convex/nextjs";
import { api } from "../../../../../convex/_generated/api";
import WishList from "@/components/home/WishList";

export default async function HomePage() {
  const wishes = await preloadQuery(api.wish.findWishes);

  return (
    <div>
      <WishList preloadedWishes={wishes} />
    </div>
  );
}
