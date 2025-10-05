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
        <div className="flex flex-col gap-3">
          {homeLinks.map((link) => (
            <Button key={link.href} className="mx-4">
              <Link href={link.href}>
                <h4>{link.label}</h4>
              </Link>
            </Button>
          ))}
        </div>
      </SidebarContent>
      <SidebarFooter>
        <Button variant="outline" className="hover:text-primary mx-4">
          <Link href="/create" className="flex items-center gap-2">
            <PlusCircleIcon />
            Create A New Wish
          </Link>
        </Button>
        <LogoutButton />
      </SidebarFooter>
    </Sidebar>
  );
}
