import { query } from "./_generated/server";

export const getAllCategories = query({
  args: {},
  handler: async (ctx, _args) => {
    const categories = await ctx.db.query("categories").collect();
    return categories;
  },
});

export const getAllFilterCategories = query({
  args: {},
  handler: async (ctx, _args) => {
    const categories = await ctx.db.query("categories").collect();
    return categories.map((cat) => ({ name: cat.name, _id: cat._id }));
  },
});
