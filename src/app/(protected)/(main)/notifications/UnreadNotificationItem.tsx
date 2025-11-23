import { Check, ChevronRight } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Doc } from "../../../../../convex/_generated/dataModel";
import { NotificationComponent } from "./NotificationComponent";

interface UnreadNotificationItemProps {
  notification: Doc<"notifications">;
}

export default function UnreadNotificationItem({
  notification,
}: UnreadNotificationItemProps) {
  return (
    <NotificationComponent notification={notification}>
      <NotificationComponent.Content />
      <NotificationComponent.Actions>
        {(handleRead) => (
          <>
            <Link href={notification.link as Route}>
              <ChevronRight />
            </Link>
            <Button onClick={handleRead}>
              <Check />
            </Button>
          </>
        )}
      </NotificationComponent.Actions>
    </NotificationComponent>
  );
}
