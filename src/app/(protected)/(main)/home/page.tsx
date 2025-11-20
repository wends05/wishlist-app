import { Suspense } from "react";
import HomePageStart from "@/app/(protected)/(main)/home/HomePageStart";
import { Spinner } from "@/components/ui/spinner";
import GetWishList from "./GetWishList";

export default async function HomePage() {
  return (
    <>
      <HomePageStart />

      <Suspense
        fallback={
          <div className="flex w-full items-center justify-center pt-10">
            <Spinner />
          </div>
        }
      >
        <GetWishList />
      </Suspense>
    </>
  );
}
