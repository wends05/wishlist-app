import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getCurrentUserData } from "./users";

export const getChatSessionId = mutation({
  args: { wishId: v.id("wishes") },
  handler: async (ctx, args) => {
    const user = await getCurrentUserData(ctx);

    const wish = await ctx.db.get(args.wishId);
    if (!wish) {
      throw new Error("Wish not found");
    }

    // check if session between these users for this wish already exists
    const existingChat = await ctx.db
      .query("chats")
      .withIndex("by_wish_and_users", (q) =>
        q.eq("wish", args.wishId).eq("potentialGrantor", user._id)
      )
      .unique();

    if (existingChat) {
      return {
        chatSessionId: existingChat._id,
        created: false,
      };
    }

    // create a new chat session
    const newChatId = await ctx.db.insert("chats", {
      potentialGrantor: user._id,
      owner: wish.owner,
      wish: args.wishId,
      createdAt: Date.now(),
    });

    return { chatSessionId: newChatId, created: true };
  },
});

export const getGrantingWishChats = query({
  args: {},
  handler: async (ctx) => {
    const user = await getCurrentUserData(ctx);

    const chats = await ctx.db
      .query("chats")
      .withIndex("by_potentialGrantor", (q) =>
        q.eq("potentialGrantor", user._id)
      )
      .collect();

    return await Promise.all(
      chats.map(async (chat) => {
        const owner = await ctx.db.get(chat.owner);
        if (!owner) {
          throw new Error("Owner not found");
        }

        const wish = await ctx.db.get(chat.wish);
        if (!wish) {
          throw new Error("Wish not found");
        }

        return {
          ...chat,
          owner: owner.name,
          wish: {
            _id: wish._id,
            name: wish.name,
          },
        };
      })
    );
  },
});

export const getOwnedWishChats = query({
  args: {},
  handler: async (ctx) => {
    const user = await getCurrentUserData(ctx);

    const chats = await ctx.db
      .query("chats")
      .withIndex("by_owner", (q) => q.eq("owner", user._id))
      .collect();

    return await Promise.all(
      chats.map(async (chat) => {
        const potentialGrantor = await ctx.db.get(chat.potentialGrantor);
        if (!potentialGrantor) {
          throw new Error("Potential grantor not found");
        }
        const wish = await ctx.db.get(chat.wish);
        if (!wish) {
          throw new Error("Wish not found");
        }
        return {
          ...chat,
          potentialGrantor: potentialGrantor.name,
          wish: {
            _id: wish._id,
            name: wish.name,
          },
        };
      })
    );
  },
});

export const getChatPageDetails = query({
  args: { chatId: v.id("chats") },
  handler: async (ctx, { chatId }) => {
    await getCurrentUserData(ctx);
    const chat = await ctx.db.get(chatId);
    if (!chat) {
      throw new ConvexError("Chat not found");
    }

    const owner = await ctx.db.get(chat.owner);
    const potentialGrantor = await ctx.db.get(chat.potentialGrantor);

    if (!owner || !potentialGrantor) {
      throw new ConvexError("Participants not found");
    }

    return {
      ...chat,
      ownerName: owner.name,
      potentialGrantorName: potentialGrantor.name,
    };
  },
});
