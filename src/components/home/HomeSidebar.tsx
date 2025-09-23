"use client";
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "../ui/sidebar";
import NavLink from "@/types/NavLink";
import { Button } from "../ui/button";
import Link from "next/link";
import { homeLinks } from "@/utils/links";
import { useAuthActions } from "@convex-dev/auth/react";
import LogoutButton from "../LogoutButton";

export default function HomeSidebar() {
  const { signOut } = useAuthActions();

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
        <LogoutButton />
      </SidebarFooter>
    </Sidebar>
  );
}
