import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import HomePageStart from "@/app/(protected)/(main)/home/HomePageStart";
import GetWishList from "./GetWishList";

export default async function HomePage() {
  const token = await convexAuthNextjsToken();
  return (
    <>
      <HomePageStart />
      <GetWishList token={token} />
    </>
  );
}
