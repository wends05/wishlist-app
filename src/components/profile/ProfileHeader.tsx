"use client";
import { type Preloaded, usePreloadedQuery } from "convex/react";
import type { api } from "../../../convex/_generated/api";

interface ProfileHeaderProps {
  preloadedProfileDetails: Preloaded<typeof api.users.getCurrentUserData>;
}

export default function ProfileHeader({
  preloadedProfileDetails,
}: ProfileHeaderProps) {
  const profileDetails = usePreloadedQuery(preloadedProfileDetails);
  return (
    <div className="flex h-50 py-20">
      <div className="flex h-full items-center justify-center">
        <div className="h-40 w-40 rounded-full bg-slate-900" />
      </div>
      <div className="flex flex-col justify-center pl-8">
        <h2>{profileDetails.name}</h2>
        <h3>{profileDetails.email}</h3>
      </div>
    </div>
  );
}
