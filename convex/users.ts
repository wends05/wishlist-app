import { getAuthUserId } from "@convex-dev/auth/server";
import { type QueryCtx, query } from "./_generated/server";

export const getCurrentUserDataHandler = async (ctx: QueryCtx) => {
  const userId = await getAuthUserId(ctx);

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await ctx.db.get(userId);

  return user!;
};

export const getCurrentUserData = query({
  args: {},
  handler: getCurrentUserDataHandler,
});

export const checkUserIdentity = async (ctx: QueryCtx) => {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    throw new Error("Unauthorized");
  }
  return identity;
};
