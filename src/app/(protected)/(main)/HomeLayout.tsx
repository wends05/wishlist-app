import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { preloadQuery } from "convex/nextjs";
import type React from "react";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { api } from "../../../../convex/_generated/api";
import HeaderAddWishButton from "./HeaderAddWishButton";
import HeaderTitle from "./HeaderTitle";
import HomeSidebar from "./HomeSidebar";
import NotificationButton from "./NotificationButton";

async function getCurrentUser(token?: string) {
  const preloadedProfileDetails = await preloadQuery(
    api.users.getCurrentUserDataHandler,
    {},
    {
      token,
    }
  );
  return preloadedProfileDetails;
}

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = await convexAuthNextjsToken();
  const preloadedProfileDetails = await getCurrentUser(token);

  return (
    <div>
      <SidebarProvider>
        <HomeSidebar preloadedProfileDetails={preloadedProfileDetails} />
        <SidebarInset className="p-2">
          <div className="flex w-full justify-between p-2">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <HeaderTitle />
            </div>
            <div className="flex items-center gap-4">
              <NotificationButton />
              <HeaderAddWishButton />
            </div>
          </div>
          {children}
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
