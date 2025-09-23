import Link from "next/link";
import { Button } from "./ui/button";
import NavLink from "@/types/NavLink";

const links: NavLink[] = [
  {
    href: "/about",
    label: "About",
  },
  {
    href: "/auth",
    label: "Get Started",
  },
];

const Navbar = () => {
  return (
    <ul className="p-4 sticky flex justify-between">
      <li>
        <Button variant={"ghost"}>
          <Link href="/">Wishlist App</Link>
        </Button>
      </li>
      <div className="flex gap-4">
        {links.map((link) => (
          <li key={link.href}>
            <Button variant={"ghost"}>
              <Link href={link.href}>{link.label}</Link>
            </Button>
          </li>
        ))}
      </div>
    </ul>
  );
};

export default Navbar;
