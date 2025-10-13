import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { preloadQuery } from "convex/nextjs";
import EditProfilePage from "@/components/profile/EditProfilePage";
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
