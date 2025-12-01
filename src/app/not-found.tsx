import { Gift } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="space-y-6 text-center">
        <div className="flex justify-center">
          <div className="rounded-full bg-muted p-6">
            <Gift className="h-16 w-16 text-muted-foreground" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="font-bold text-6xl">404</h1>
          <h2 className="font-semibold text-2xl">Page Not Found</h2>
          <p className="mx-auto max-w-md text-muted-foreground">
            Oops! The page you're looking for doesn't exist. It might have been
            moved or deleted.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/">
            <Button size="lg">Go Home</Button>
          </Link>
          <Link href="/home">
            <Button variant="outline" size="lg">
              Browse Wishes
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
