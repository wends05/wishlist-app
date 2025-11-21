import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { preloadQuery } from "convex/nextjs";
import type React from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { api } from "../../../../convex/_generated/api";
import HomeSidebar from "./HomeSidebar";
import HomeHeader from "./home/HomeHeader";

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
          <HomeHeader />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
