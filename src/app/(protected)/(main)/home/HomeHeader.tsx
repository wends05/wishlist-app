"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { getRouteTitle, homeLinks } from "@/utils/links";

const HomeHeader = () => {
  const { open } = useSidebar();
  const pathName = usePathname();
  return (
    <main className="pt-2">
      <div className="fixed flex items-center gap-4">
        <SidebarTrigger /> <h3>{getRouteTitle(pathName, homeLinks)}</h3>
      </div>
      {!open && (
        <Link href={"/create"}>
          <Button
            variant={"outline"}
            className="fixed right-8 hover:text-primary"
          >
            Add a wish
          </Button>
        </Link>
      )}
    </main>
  );
};

export default HomeHeader;
