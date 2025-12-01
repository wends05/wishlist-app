import { Gift } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <Gift className="h-6 w-6 text-primary" />
            <span className="font-semibold text-lg">Wishlist</span>
          </div>

          <nav className="flex gap-6 text-muted-foreground text-sm">
            <Link href="/" className="transition-colors hover:text-foreground">
              Home
            </Link>
          </nav>

          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Wishlist. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
