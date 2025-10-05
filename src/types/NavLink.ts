import type { Route } from "next";

interface NavLink {
  href: Route;
  label: string;
}

export default NavLink;
