import { query } from "./_generated/server";

export const findWishes = query({
  args: {},
  handler: async (ctx, _args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new Error("Unauthorized");
    }
    
    const wish = await ctx.db.query("wish").take(5);
    return wish;
  },
});
