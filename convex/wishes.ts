import { v } from "convex/values";
import { mutation, query, QueryCtx } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { api } from "./_generated/api";
import { Id } from "./_generated/dataModel";

export const findWishes = query({
  args: {},
  handler: async (ctx, _args) => {
    const wish = await ctx.db.query("wishes").take(5);
    return wish;
  },
});

export const createWish = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    quantity: v.number(),
    imageId: v.optional(v.id("_storage")),
    category: v.id("categories"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }

    if (!args.category) {
      args.category = "" as Id<"categories">;
    }

    let receivedStorageUrl: string | null = null;
    if (args.imageId) {
      receivedStorageUrl = await getImageURL(ctx, args.imageId);
      if (!receivedStorageUrl) {
        throw new Error("Failed to get image URL");
      }
    }

    const wish = await ctx.db.insert("wishes", {
      name: args.name,
      description: args.description,
      quantity: args.quantity,
      category: args.category,
      imageUrl: receivedStorageUrl ?? "",
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
