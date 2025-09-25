import { v } from "convex/values";
import { mutation, query, QueryCtx } from "./_generated/server";
import { Id } from "./_generated/dataModel";
import { checkUserIdentity, getCurrentUserDataHandler } from "./users";

export const findWishes = query({
  args: {},
  handler: async (ctx, _args) => {
    await checkUserIdentity(ctx);
    const wish = await ctx.db.query("wishes").take(5);
    return wish;
  },
});

export const findWishById = query({
  args: {
    id: v.id("wishes"),
  },
  handler: async (ctx, args) => {
    await checkUserIdentity(ctx);
    const wish = await ctx.db.get(args.id);
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
    const user = await getCurrentUserDataHandler(ctx);
    if (!user) {
      throw new Error("Unauthorized");
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
      owner: user._id,
      updatedAt: Date.now(),
    });
    return wish;
  },
});

export const generateUploadURL = mutation({
  args: {},
  handler: async (ctx, _args) => {
    await checkUserIdentity(ctx);
    const url = await ctx.storage.generateUploadUrl();
    return url;
  },
});

const getImageURL = async (ctx: QueryCtx, imageId: Id<"_storage">) => {
  await checkUserIdentity(ctx);
  const url = await ctx.storage.getUrl(imageId);
  return url;
};
