import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";
import ProfilePage from "./ProfilePage";

export default function Page() {
  return (
    <div className="flex h-full flex-col pt-14 pb-20 md:px-20">
      <Suspense
        fallback={
          <div className="flex h-full w-full items-center justify-center">
            <Spinner />
          </div>
        }
      >
        <ProfilePage />
      </Suspense>
    </div>
  );
}
