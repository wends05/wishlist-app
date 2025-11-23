import { v } from "convex/values";
import type { Id } from "./_generated/dataModel";
import { type MutationCtx, mutation, query } from "./_generated/server";
import { getCurrentUserData } from "./users";

interface CreateNotificationArgs {
  recipient: Id<"users">;
  content: string;
  link?: string;
}

export const createNotificationHandler = async (
  ctx: MutationCtx,
  args: CreateNotificationArgs
) => {
  const notificationId = await ctx.db.insert("notifications", {
    recipient: args.recipient,
    content: args.content,
    link: args.link || "",
    isRead: false,
  });
  return notificationId;
};

export const getNotificationsCount = query({
  handler: async (ctx) => {
    const userId = await getCurrentUserData(ctx);

    const userNotifications = await ctx.db
      .query("notifications")
      .withIndex("by_recipient_isRead", (q) =>
        q.eq("recipient", userId._id).eq("isRead", false)
      )
      .collect();

    return userNotifications.length;
  },
});

export const getNotifications = query({
  handler: async (ctx) => {
    const userId = await getCurrentUserData(ctx);

    const userNotifications = await ctx.db
      .query("notifications")
      .withIndex("by_recipient_isRead", (q) =>
        q.eq("recipient", userId._id).eq("isRead", false)
      )
      .collect();

    return userNotifications;
  },
});
export const createNotification = mutation({
  args: {
    recipient: v.id("users"),
    content: v.string(),
    link: v.optional(v.string()),
  },
  handler: createNotificationHandler,
});
