import { ChevronRight } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import type { Doc } from "../../../../../convex/_generated/dataModel";
import { NotificationComponent } from "./NotificationComponent";

interface ReadNotificationItemProps {
  notification: Doc<"notifications">;
}

export default function ReadNotificationItem({
  notification,
}: ReadNotificationItemProps) {
  return (
    <NotificationComponent notification={notification}>
      <NotificationComponent.Content />
      <NotificationComponent.Actions>
        <Link href={notification.link as Route}>
          <ChevronRight />
        </Link>
      </NotificationComponent.Actions>
    </NotificationComponent>
  );
}
