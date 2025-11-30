import { paginationOptsValidator } from "convex/server";
import { ConvexError, v } from "convex/values";
import type { Id } from "./_generated/dataModel";
import { type MutationCtx, mutation, query } from "./_generated/server";
import { getCurrentUserData } from "./users";

/**
 * Handlers
 */

interface SendSystemMessageArgs {
  chatId: Id<"chats">;
  content: string;
  senderId: Id<"users">;
}

export const sendSystemMessageHandler = async (
  ctx: MutationCtx,
  args: SendSystemMessageArgs
) => {
  await ctx.db.insert("messages", {
    chat: args.chatId,
    sender: args.senderId,
    content: args.content,
    createdAt: Date.now(),
    isSystemMessage: true,
  });
};

/**
 * Queries
 */
export const getChatMessages = query({
  args: { chatId: v.id("chats"), paginationOpts: paginationOptsValidator },
  handler: async (ctx, args) => {
    await getCurrentUserData(ctx);
    const messagesPaginationResults = await ctx.db
      .query("messages")
      .withIndex("by_chat_createdAt", (q) => q.eq("chat", args.chatId))
      .order("desc")
      .paginate(args.paginationOpts);

    return {
      ...messagesPaginationResults,
      page: await Promise.all(
        messagesPaginationResults.page.map(async (m) => {
          const sender = await ctx.db.get(m.sender);
          if (!sender) {
            throw new ConvexError(`Sender not found for chat ${m.chat}`);
          }

          return {
            _id: m._id,
            sender: {
              id: sender._id,
              name: sender.name,
              avatarUrl: sender.image,
            },
            content: m.content,
            isSystemMessage: m.isSystemMessage,
            timestamp: m.createdAt
          };
        })
      ),
    };
  },
});

/**
 * Mutations
 */
export const sendMessage = mutation({
  args: { chatId: v.id("chats"), content: v.string() },
  handler: async (ctx, args) => {
    const currentUser = await getCurrentUserData(ctx);

    await ctx.db.insert("messages", {
      chat: args.chatId,
      sender: currentUser._id,
      content: args.content,
      createdAt: Date.now(),
      isSystemMessage: false,
    });
  },
});

export const sendSystemMessage = mutation({
  args: { chatId: v.id("chats"), content: v.string(), senderId: v.id("users") },
  handler: (ctx, args) => sendSystemMessageHandler(ctx, args),
});
