import Link from "next/link";
import { Button } from "./ui/button";
import NavLink from "@/types/NavLink";
import { rootLinks } from "@/utils/links";

const Navbar = () => {
  return (
    <ul className="sticky flex justify-between p-4">
      <li>
        <Button variant={"ghost"}>
          <Link href="/">Wishlist App</Link>
        </Button>
      </li>
      <div className="flex gap-4">
        {rootLinks.map((link) => (
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
