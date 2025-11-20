"use client";

import { type Preloaded, usePreloadedQuery } from "convex/react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import EditProfileForm from "@/forms/EditProfileForm";
import type { api } from "../../../../../../convex/_generated/api";

interface EditProfilePageProps {
  preloadedProfileDetails: Preloaded<
    typeof api.users.getCurrentUserDataHandler
  >;
}
export default function EditProfilePage({
  preloadedProfileDetails,
}: EditProfilePageProps) {
  const profileDetails = usePreloadedQuery(preloadedProfileDetails);
  return (
    <main className="flex h-full w-full flex-col px-4 pt-12">
      <div className="flex items-center gap-2">
        <Link href={"/profile"}>
          <ArrowLeft />
        </Link>
        <h2>Edit Profile Page</h2>
      </div>
      <EditProfileForm
        defaultValues={{
          name: profileDetails.name,
          address: profileDetails.address || "",
        }}
      />
    </main>
  );
}
