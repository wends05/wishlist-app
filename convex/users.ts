import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query, QueryCtx } from "./_generated/server";
import { v } from "convex/values";

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
    name: v.string(),

  },
  handler: async (ctx, args) => {
    const user = await  getCurrentUserDataHandler(ctx)
    

  },
})
