import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { preloadQuery } from "convex/nextjs";
import MyWishes from "@/app/(protected)/(main)/profile/MyWishes";
import ProfileHeader from "@/app/(protected)/(main)/profile/ProfileHeader";
import { api } from "../../../../../convex/_generated/api";

export default async function ProfilePage() {
  const preloadedProfileDetails = await preloadQuery(
    api.users.getCurrentUserData,
    {},
    {
      token: await convexAuthNextjsToken(),
    },
  );

  return (
    <div className="flex h-full flex-col pt-14 pb-20 md:px-20">
      <ProfileHeader preloadedProfileDetails={preloadedProfileDetails} />
      <MyWishes />
    </div>
  );
}
