import { fetchQuery } from "convex/nextjs";
import EditProfileDialog from "@/app/(protected)/(main)/profile/edit/EditProfileDialog";
import { api } from "../../../../../convex/_generated/api";

export default async function ProfileHeader({ token }: { token?: string }) {
  const profileDetails = await fetchQuery(
    api.users.getCurrentUserDataHandler,
    {},
    { token }
  );
  return (
    <div className="flex h-72 items-center py-20">
      <div className="flex h-full items-center justify-center">
        <div className="size-40 rounded-full bg-slate-900" />
      </div>
      <div className="flex flex-col justify-center pl-8">
        <div className="pb-4">
          <h2>{profileDetails.name}</h2>
          <h3>{profileDetails.email}</h3>
        </div>
        <EditProfileDialog profileDetails={profileDetails} />
      </div>
    </div>
  );
}
