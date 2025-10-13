import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";
import { mutation, type QueryCtx, query } from "./_generated/server";

/**
 * Utils
 */
export const getCurrentUserDataHandler = async (ctx: QueryCtx) => {
  const userId = await getAuthUserId(ctx);

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await ctx.db.get(userId);

  return user!;
};

export const checkUserIdentity = async (ctx: QueryCtx) => {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    throw new Error("Unauthorized");
  }
  return identity;
};

/**
 * Queries
 */
export const getCurrentUserData = query({
  args: {},
  handler: getCurrentUserDataHandler,
});

/**
 * Mutations
 */

export const updateProfile = mutation({
  args: {
    name: v.optional(v.string()),
    address: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUserDataHandler(ctx);

    await ctx.db.patch(user._id, {
      name: args.name ?? user.name,
      address: args.address ?? user.address,
    })
  },
});
