import HomeHeader from "@/components/home/HomeHeader";
import HomeSidebar from "@/components/home/HomeSidebar";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import React, { PropsWithChildren } from "react";

export default async function HomeLayout({ children }: PropsWithChildren) {
  return (
    <SidebarProvider>
      <HomeSidebar />
      <SidebarInset className="p-2">
        <HomeHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
