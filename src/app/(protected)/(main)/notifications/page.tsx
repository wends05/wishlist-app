import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { preloadQuery } from "convex/nextjs";
import { api } from "../../../../../convex/_generated/api";
import NotificationsPage from "./NotificationsPage";

export default async function Page() {
  const preloadedNotifications = await preloadQuery(
    api.notifications.getNotifications,
    {},
    { token: await convexAuthNextjsToken() }
  );

  return <NotificationsPage preloadedNotifications={preloadedNotifications} />;
}
