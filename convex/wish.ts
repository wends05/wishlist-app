import { v } from "convex/values";
import { mutation, query, QueryCtx } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { api } from "./_generated/api";
import { Id } from "./_generated/dataModel";

export const findWishes = query({
  args: {},
  handler: async (ctx, _args) => {
    const wish = await ctx.db.query("wish").take(5);
    return wish;
  },
});

export const createWish = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    amount: v.number(),
    imageUrl: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    if (args.imageUrl.startsWith("http://localhost:3000/")) {
      throw new Error("Invalid image URL");
    }
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const receivedStorageUrl = await getImageURL(ctx, args.imageUrl);

    if (!receivedStorageUrl) {
      throw new Error("Failed to get image URL");
    }

    const wish = await ctx.db.insert("wish", {
      name: args.name,
      description: args.description,
      amount: args.amount,
      imageUrl: receivedStorageUrl,
      owner: userId,
      updatedAt: Date.now(),
    });
    return wish;
  },
});

export const generateUploadURL = mutation({
  args: {},
  handler: async (ctx, _args) => {
    const url = await ctx.storage.generateUploadUrl();
    return url;
  },
});

const getImageURL = async (ctx: QueryCtx, imageId: Id<"_storage">) => {
  const url = await ctx.storage.getUrl(imageId);
  return url;
};
