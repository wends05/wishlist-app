import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { preloadQuery } from "convex/nextjs";
import { api } from "../../../../../convex/_generated/api";
import MyWishes from "./MyWishes";
import ProfileHeader from "./ProfileHeader";

export default async function ProfilePage() {
  const token = await convexAuthNextjsToken();
  const preloadedProfileDetails = await preloadQuery(
    api.users.getCurrentUserDataHandler,
    {},
    { token }
  );
  return (
    <>
      <ProfileHeader preloadedProfileDetails={preloadedProfileDetails} />
      <MyWishes token={token} />
    </>
  );
}
