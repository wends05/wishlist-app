import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import MyWishes from "./MyWishes";
import ProfileHeader from "./ProfileHeader";

export default async function ProfilePage() {
  const token = await convexAuthNextjsToken();
  return (
    <>
      <ProfileHeader token={token} />
      <MyWishes token={token} />
    </>
  );
}
