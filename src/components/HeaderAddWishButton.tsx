"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";

export default function HeaderAddWishButton() {
  const { open } = useSidebar();
  return (
    !open && (
      <Link href={"/wish/create"}>
        <Button variant={"outline"} className="hover:text-primary">
          Add a wish
        </Button>
      </Link>
    )
  );
}
