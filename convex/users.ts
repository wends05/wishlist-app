import { getAuthUserId } from "@convex-dev/auth/server";
import { ConvexError, v } from "convex/values";
import { mutation, type QueryCtx, query } from "./_generated/server";

/**
 * Utils
 */
export const getCurrentUserData = async (ctx: QueryCtx) => {
  const userId = await getAuthUserId(ctx);

  console.log('USERID, getCurrentUserData', userId);

  if (!userId) {
    throw new ConvexError("Unauthorized");
  }

  const user = await ctx.db.get(userId);

  return user!;
};

/**
 * Queries
 */
export const getCurrentUserDataHandler = query({
  args: {},
  handler: getCurrentUserData,
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
    const user = await getCurrentUserData(ctx);

    await ctx.db.patch(user._id, {
      name: args.name ?? user.name,
      address: args.address ?? user.address,
    });
  },
});
