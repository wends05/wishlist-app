"use client";

import { usePathname } from "next/navigation";
import { SidebarTrigger } from "../ui/sidebar";
import { getRouteTitle, homeLinks } from "@/utils/links";

const HomeHeader = () => {
  const pathName = usePathname();
  return (
    <main className="flex items-center gap-4 py-2">
      <SidebarTrigger /> <h3>{getRouteTitle(pathName, homeLinks)}</h3>
    </main>
  );
};

export default HomeHeader;
