import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { preloadQuery } from "convex/nextjs";
import EditProfilePage from "@/app/(protected)/(main)/profile/edit/EditProfilePage";
import { api } from "../../../../../../convex/_generated/api";

export default async function Edit() {
  const preloadedProfileDetails = await preloadQuery(
    api.users.getCurrentUserData,
    {},
    {
      token: await convexAuthNextjsToken(),
    }
  );
  return <EditProfilePage preloadedProfileDetails={preloadedProfileDetails} />;
}
