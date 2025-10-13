"use client";

import { type Preloaded, usePreloadedQuery } from "convex/react";
import EditProfileForm from "@/forms/EditProfileForm";
import type { api } from "../../../convex/_generated/api";

interface EditProfilePageProps {
  preloadedProfileDetails: Preloaded<typeof api.users.getCurrentUserData>;
}
export default function EditProfilePage({
  preloadedProfileDetails,
}: EditProfilePageProps) {
  const profileDetails = usePreloadedQuery(preloadedProfileDetails);
  return (
    <main className="flex h-full w-full flex-col px-4 pt-12">
      <h2>Edit Profile Page</h2>
      <EditProfileForm
        defaultValues={{
          name: profileDetails.name,
          address: profileDetails.address || "",
        }}
      />
    </main>
  );
}
