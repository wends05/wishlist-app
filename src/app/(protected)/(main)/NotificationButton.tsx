import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { fetchQuery } from "convex/nextjs";
import { Bell } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { api } from "../../../../convex/_generated/api";

export default async function NotificationButton() {
  const notifications = await fetchQuery(
    api.notifications.getNotificationsCount,
    {},
    { token: await convexAuthNextjsToken() }
  );
  return (
    <Link className="relative z-1" href={"/notifications"}>
      <Button variant={"ghost"} size={"sm"}>
        {notifications > 0 && (
          <div className="-top-1 -right-1 absolute flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-white text-xs">
            {notifications}
          </div>
        )}
        <Bell />
      </Button>
    </Link>
  );
}
