import { preloadQuery } from "convex/nextjs";
import { api } from "@/../convex/_generated/api";
import WishList from "@/components/home/WishList";
import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";

export default async function HomePage() {
  const wishes = await preloadQuery(
    api.wish.findWishes,
    {},
    {
      token: await convexAuthNextjsToken(),
    },
  );

  return (
    <div>
      <WishList preloadedWishes={wishes} />
    </div>
  );
}
