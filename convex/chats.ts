import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getCurrentUserData } from "./users";

/**
 * Queries
 */
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

    const enriched = await Promise.all(
      chats.map(async (chat) => {
        const wish = await ctx.db.get(chat.wish);
        if (!wish || wish.status === "completed") {
          return null;
        }

        const owner = await ctx.db.get(wish.owner);
        if (!owner) {
          throw new Error("Owner not found");
        }

        return {
          ...chat,
          owner: {
            _id: owner._id,
            name: owner.name,
          },
          wish: {
            _id: wish._id,
            name: wish.name,
            status: wish.status,
          },
        };
      })
    );

    return enriched.filter((c): c is NonNullable<typeof c> => c !== null);
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

    const enriched = await Promise.all(
      chats.map(async (chat) => {
        const potentialGrantor = await ctx.db.get(chat.potentialGrantor);
        if (!potentialGrantor) {
          throw new Error("Potential grantor not found");
        }
        const wish = await ctx.db
          .query("wishes")
          .withIndex("by_status")
          .filter((q) => q.neq(q.field("status"), "completed"))
          .first();
        if (!wish) {
          return null;
        }
        return {
          ...chat,
          potentialGrantor: {
            _id: potentialGrantor._id,
            name: potentialGrantor.name,
          },
          wish: {
            _id: wish._id,
            name: wish.name,
            owner: wish.owner,
            status: wish.status,
          },
        };
      })
    );
    return enriched.filter((c): c is NonNullable<typeof c> => c !== null);
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

    const wish = await ctx.db.get(chat.wish);
    if (!wish) {
      throw new ConvexError("Wish not found");
    }

    const owner = await ctx.db.get(wish.owner);
    const potentialGrantor = await ctx.db.get(chat.potentialGrantor);

    if (!owner || !potentialGrantor) {
      throw new ConvexError("Participants not found");
    }

    return {
      ...chat,
      owner: {
        _id: owner._id,
        name: owner.name,
      },
      potentialGrantor: {
        _id: potentialGrantor._id,
        name: potentialGrantor.name,
      },
      wish: {
        _id: wish._id,
        owner: wish.owner,
        status: wish.status,
      },
    };
  },
});

/**
 * Mutations
 */
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
      .withIndex("by_wish_and_potentialGrantor", (q) =>
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
      wish: args.wishId,
      owner: wish.owner,
      createdAt: Date.now(),
    });

    return { chatSessionId: newChatId, created: true };
  },
});
