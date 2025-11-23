import { v } from "convex/values";
import type { Id } from "./_generated/dataModel";
import { type MutationCtx, mutation, query } from "./_generated/server";
import { getCurrentUserData } from "./users";

/**
 * Handlers
 */
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

/**
 * Queries
 */
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
      .withIndex("by_recipient_isRead", (q) => q.eq("recipient", userId._id))
      .order("asc")
      .collect();

    return userNotifications;
  },
});

/**
 * Mutations
 */

export const createNotification = mutation({
  args: {
    recipient: v.id("users"),
    content: v.string(),
    link: v.optional(v.string()),
  },
  handler: createNotificationHandler,
});

export const markNotificationAsRead = mutation({
  args: {
    notificationId: v.id("notifications"),
  },
  handler: async (ctx, args) => {
    const notification = await ctx.db.get(args.notificationId);
    if (!notification) {
      throw new Error("Notification not found");
    }

    await ctx.db.patch(args.notificationId, { isRead: true });
  },
});

export const deleteNotifications = mutation({
  args: {

    notificationIds: v.array(v.id("notifications")),  
  },
  handler: async (ctx, args) => {
    for (const id of args.notificationIds) {
      await ctx.db.delete(id);
    }
  }
})
