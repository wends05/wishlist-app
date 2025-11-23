"use client";
import { type Preloaded, usePreloadedQuery } from "convex/react";
import { useMemo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { api } from "../../../../../convex/_generated/api";
import DeleteNotificationsDialog from "./DeleteNotificationsDialog";
import ReadNotificationItem from "./ReadNotificationItem";
import UnreadNotificationItem from "./UnreadNotificationItem";

interface NotificationsPageProps {
  preloadedNotifications: Preloaded<typeof api.notifications.getNotifications>;
}

export default function NotificationsPage({
  preloadedNotifications,
}: NotificationsPageProps) {
  const notifications = usePreloadedQuery(preloadedNotifications);

  const [selectedTab, setSelectedTab] = useState<string>("Unread");

  const readNotifications = useMemo(
    () => notifications.filter((n) => n.isRead),
    [notifications]
  );

  const unreadNotifications = useMemo(
    () => notifications.filter((n) => !n.isRead),
    [notifications]
  );

  return (
    <div className="gap-3 px-4">
      <Tabs onValueChange={(v) => setSelectedTab(v)} value={selectedTab}>
        <TabsList className="space-x-2">
          <TabsTrigger value="Unread">Unread</TabsTrigger>
          <TabsTrigger value="Read">Read</TabsTrigger>
          <TabsTrigger value="All">All</TabsTrigger>
        </TabsList>

        <div className="flex w-full justify-between">
          <h3>{selectedTab}</h3>
          <DeleteNotificationsDialog
            type={selectedTab.toLowerCase()}
            notificationIds={
              selectedTab === "Unread"
                ? unreadNotifications.map((n) => n._id)
                : selectedTab === "Read"
                  ? readNotifications.map((n) => n._id)
                  : notifications.map((n) => n._id)
            }
          />
        </div>

        <TabsContent value="Unread">
          <div className="flex flex-col gap-2">
            {unreadNotifications.map((n) => (
              <UnreadNotificationItem key={n._id} notification={n} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="Read">
          <div className="flex flex-col gap-2">
            {readNotifications.map((n) => (
              <ReadNotificationItem key={n._id} notification={n} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="All">
          <div className="flex flex-col gap-2">
            {notifications.map((n) =>
              n.isRead ? (
                <ReadNotificationItem key={n._id} notification={n} />
              ) : (
                <UnreadNotificationItem key={n._id} notification={n} />
              )
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
