import { query } from "./_generated/server";

export const getAllCategories = query({
  args: {},
  handler: async (ctx, _args) => {
    const categories = await ctx.db.query("categories").collect();
    return categories;
  },
});
