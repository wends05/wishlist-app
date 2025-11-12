"use client";
import { type Preloaded, usePreloadedQuery } from "convex/react";
import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { homeLinks } from "@/utils/links";
import type { api } from "../../../../convex/_generated/api";
import LogoutButton from "./LogoutButton";
import ProfileButton from "./ProfileButton";

interface HomeSidebarProps {
  preloadedProfileDetails: Preloaded<typeof api.users.getCurrentUserDataHandler>;
}

export default function HomeSidebar({
  preloadedProfileDetails,
}: HomeSidebarProps) {
  const profileDetails = usePreloadedQuery(preloadedProfileDetails);
  return (
    <Sidebar variant="inset">
      <SidebarHeader className="pt-4 text-center">
        <ProfileButton
          name={profileDetails?.name || ""}
          imageUrl={profileDetails?.image || ""}
        />
      </SidebarHeader>
      <SidebarContent className="pt-4">
        <div className="flex flex-col gap-3 px-4">
          {homeLinks.map((link) => (
            <Link href={link.href} key={link.href} className="flex w-full">
              <Button className="w-full px-4">
                <h4>{link.label}</h4>
              </Button>
            </Link>
          ))}
        </div>
      </SidebarContent>
      <SidebarFooter>
        <Link href="/wish/create" className="flex items-center gap-2">
          <Button variant="outline" className="mx-4 hover:text-primary">
            <PlusCircleIcon />
            Create A New Wish
          </Button>
        </Link>
        <LogoutButton />
      </SidebarFooter>
    </Sidebar>
  );
}
