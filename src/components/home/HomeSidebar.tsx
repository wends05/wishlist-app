"use client";
import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";
import { homeLinks } from "@/utils/links";
import LogoutButton from "../LogoutButton";
import { Button } from "../ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "../ui/sidebar";

export default function HomeSidebar() {
  return (
    <Sidebar variant="inset">
      <SidebarContent>
        <SidebarHeader className="text-center">
          <h2>Wishlist App</h2>
        </SidebarHeader>
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
        <Link href="/create" className="flex items-center gap-2">
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
