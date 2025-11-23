import { useMutation } from "convex/react";
import React from "react";
import { toast } from "sonner";
import { Item, ItemActions, ItemContent } from "@/components/ui/item";
import { cn } from "@/lib/utils";
import { api } from "../../../../../convex/_generated/api";
import type { Doc } from "../../../../../convex/_generated/dataModel";

interface NotificationItemContextValue {
  notification: Doc<"notifications">;
}

const NotificationItemContext =
  React.createContext<NotificationItemContextValue | null>(null);

const useNotificationItem = () => {
  const context = React.useContext(NotificationItemContext);
  if (!context) {
    throw new Error(
      "NotificationItem compound components must be used within NotificationItem"
    );
  }
  return context;
};

interface NotificationItemRootProps {
  notification: Doc<"notifications">;
  children: React.ReactNode;
  className?: string;
}

function NotificationComponentRoot({
  notification,
  children,
  className,
}: NotificationItemRootProps) {
  return (
    <NotificationItemContext.Provider value={{ notification }}>
      <Item className={className}>{children}</Item>
    </NotificationItemContext.Provider>
  );
}

interface NotificationContentProps {
  children?: React.ReactNode;
}

function NotificationContent({ children }: NotificationContentProps) {
  const { notification } = useNotificationItem();

  return (
    <ItemContent className="h-full w-full">
      {children || notification.content}
    </ItemContent>
  );
}

interface NotificationActionsProps {
  children?:
    | React.ReactNode
    | ((handleRead: () => Promise<void>) => React.ReactNode);
}

function NotificationActions({ children }: NotificationActionsProps) {
  const { notification } = useNotificationItem();
  const markNotificationAsRead = useMutation(
    api.notifications.markNotificationAsRead
  );

  const handleRead = async () => {
    try {
      await markNotificationAsRead({ notificationId: notification._id });
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
      toast.error("Failed to mark notification as read.");
    }
  };

  return (
    <ItemActions className="w-full items-center justify-between gap-2">
      <NotificationTimestamp />
      <div className="flex items-center gap-2">
        {typeof children === "function" ? children(handleRead) : children}
      </div>
    </ItemActions>
  );
}

function NotificationTimestamp() {
  const { notification } = useNotificationItem();
  const date = new Date(notification._creationTime);
  return (
    <span
      className={cn(
        "w-full text-muted-foreground text-sm",
        notification.isRead ? "italic" : "font-medium"
      )}
    >
      {date.toLocaleDateString()} {date.toLocaleTimeString()}
    </span>
  );
}

export const NotificationComponent = Object.assign(NotificationComponentRoot, {
  Content: NotificationContent,
  Actions: NotificationActions,
});
