import { getAuthUserId } from "@convex-dev/auth/server";
import { query } from "./_generated/server";

export const getUserIdentity = query({
  args: {},
  handler: async (ctx, _args) => {
    const identity = await ctx.auth.getUserIdentity();
    return identity;
  },
});

export const getCurrentUserData = query({
  args: {},
  handler: async (ctx, _args) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_id", (q) => q.eq("_id", userId))
      .unique();

    return user;
  },
});
