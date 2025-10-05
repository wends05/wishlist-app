import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { preloadQuery } from "convex/nextjs";
import { api } from "../../../convex/_generated/api";
import MyWishes from "./MyWishes";
import ProfileHeader from "./ProfileHeader";

export default async function ProfilePage() {
  const preloadedProfileDetails = await preloadQuery(
    api.users.getCurrentUserData,
    {},
    {
      token: await convexAuthNextjsToken(),
    },
  );
  return (
    <div className="flex h-full flex-col pt-14 md:px-20">
      <ProfileHeader preloadedProfileDetails={preloadedProfileDetails} />
      <MyWishes />
    </div>
  );
}
