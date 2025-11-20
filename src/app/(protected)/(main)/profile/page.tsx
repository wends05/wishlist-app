import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { preloadQuery } from "convex/nextjs";
import { cacheLife } from "next/cache";
import { Suspense } from "react";
import MyWishes from "@/app/(protected)/(main)/profile/MyWishes";
import ProfileHeader from "@/app/(protected)/(main)/profile/ProfileHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "../../../../../convex/_generated/api";

async function getCurrentUser(token: string | undefined) {
  "use cache";
  cacheLife("minutes");
  const preloadedProfileDetails = await preloadQuery(
    api.users.getCurrentUserDataHandler,
    {},
    { token }
  );
  return preloadedProfileDetails;
}

export default async function ProfilePage() {
  const token = await convexAuthNextjsToken();
  const preloadedProfileDetails = await getCurrentUser(token);
  return (
    <div className="flex h-full flex-col pt-14 pb-20 md:px-20">
      <Suspense
        fallback={
          <div className="flex h-72 items-center py-20">
            <div className="flex h-full items-center justify-center">
              <Skeleton className="size-40 rounded-full bg-slate-900" />
            </div>
            <div className="flex flex-col justify-center pl-8">
              <Skeleton className="mb-2 h-8 w-48 rounded bg-slate-900" />
              <Skeleton className="h-6 w-64 rounded bg-slate-900" />
            </div>
          </div>
        }
      >
        <ProfileHeader preloadedProfileDetails={preloadedProfileDetails} />
      </Suspense>
      <Suspense
        fallback={<Skeleton className="h-full rounded-xl bg-slate-900 pb-20" />}
      >
        <MyWishes />
      </Suspense>
    </div>
  );
}
