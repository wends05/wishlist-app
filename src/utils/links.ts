import type NavLink from "@/types/NavLink";

export const rootLinks: NavLink[] = [
  {
    href: "/about",
    label: "About",
  },
  {
    href: "/auth",
    label: "Get Started",
  },
];

export const homeLinks: NavLink[] = [
  {
    href: "/home",
    label: "Home",
  },
  {
    href: "/reserved",
    label: "Reserved",
  },
  {
    href: "/chats",
    label: "Chats",
  },
];

/**
 * Returns the title of the route
 *
 * @param route - The route to get the title of
 * @returns The title of the route
 */
export function getRouteTitle(route: string, links: NavLink[]) {
  return links.find((link) => link.href === route)?.label || "";
}
