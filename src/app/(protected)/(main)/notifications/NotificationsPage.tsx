"use client";
import { type Preloaded, usePreloadedQuery } from "convex/react";
import { Item, ItemContent } from "@/components/ui/item";
import type { api } from "../../../../../convex/_generated/api";

interface NotificationsPageProps {
  preloadedNotifications: Preloaded<typeof api.notifications.getNotifications>;
}

export default function NotificationsPage({
  preloadedNotifications,
}: NotificationsPageProps) {
  const notifications = usePreloadedQuery(preloadedNotifications);
  return (
    <div>
      {notifications.map((n) => (
        <Item key={n._id}>
          <ItemContent>{n.content}</ItemContent>
        </Item>
      ))}
    </div>
  );
}
