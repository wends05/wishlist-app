import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { preloadQuery } from "convex/nextjs";
import { api } from "../../../../../../convex/_generated/api";
import EditProfilePage from "./EditProfilePage";

async function getCurrentUser(token?: string) {
  const preloadedProfileDetails = await preloadQuery(
    api.users.getCurrentUserDataHandler,
    {},
    { token }
  );
  return preloadedProfileDetails;
}

export default async function EditProfile() {
  const token = await convexAuthNextjsToken();
  const preloadedProfileDetails = await getCurrentUser(token);
  return <EditProfilePage preloadedProfileDetails={preloadedProfileDetails} />;
}
