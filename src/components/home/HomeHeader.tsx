"use client";

import { usePathname } from "next/navigation";
import { getRouteTitle, homeLinks } from "@/utils/links";
import { SidebarTrigger } from "../ui/sidebar";

const HomeHeader = () => {
  const pathName = usePathname();
  return (
    <main className="fixed flex items-center gap-4 px-3 py-2">
      <SidebarTrigger /> <h3>{getRouteTitle(pathName, homeLinks)}</h3>
    </main>
  );
};

export default HomeHeader;
