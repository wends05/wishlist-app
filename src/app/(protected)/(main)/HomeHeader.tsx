"use client";
import { Bell } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { useHomeHeader } from "@/providers/HomeHeaderProvider";

const HomeHeader = () => {
  const { content } = useHomeHeader();
  const { open } = useSidebar();

  return (
    <div className="p-2 py-4">
      <div className="fixed flex items-center gap-2 px-2">
        <SidebarTrigger />
        {content}
      </div>
      <div className="fixed right-6 flex items-center gap-3">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        {!open && (
          <Link href={"/wish/create"}>
            <Button variant={"outline"} className="hover:text-primary">
              Add a wish
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default HomeHeader;
