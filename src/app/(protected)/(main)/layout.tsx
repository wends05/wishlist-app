import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { preloadQuery } from "convex/nextjs";
import HomeSidebar from "@/app/(protected)/(main)/HomeSidebar";
import HomeHeader from "@/app/(protected)/(main)/home/HomeHeader";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { api } from "../../../../convex/_generated/api";

interface HomeLayoutProps {
  children: React.ReactNode;
}

export default async function HomeLayout({ children }: HomeLayoutProps) {
  const preloadedProfileDetails = await preloadQuery(
    api.users.getCurrentUserData,
    {},
    {
      token: await convexAuthNextjsToken(),
    }
  );

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
