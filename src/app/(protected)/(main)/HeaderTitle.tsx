"use client";

import { usePathname } from "next/navigation";
import { getRouteTitle, homeLinks } from "@/utils/links";

export default function HeaderTitle() {
  const path = usePathname();

  return <h3>{getRouteTitle(path, homeLinks)}</h3>;
}
