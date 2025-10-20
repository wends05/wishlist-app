"use client";
import { type Preloaded, usePreloadedQuery } from "convex/react";
import EditProfileModal from "@/app/(protected)/(main)/profile/edit/EditProfileDialog";
import type { api } from "../../../../../convex/_generated/api";

interface ProfileHeaderProps {
  preloadedProfileDetails: Preloaded<typeof api.users.getCurrentUserData>;
}

export default function ProfileHeader({
  preloadedProfileDetails,
}: ProfileHeaderProps) {
  const profileDetails = usePreloadedQuery(preloadedProfileDetails);
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
        <EditProfileModal profileDetails={profileDetails} />
      </div>
    </div>
  );
}
