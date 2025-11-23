import { getAuthUserId } from "@convex-dev/auth/server";
import { faker } from "@faker-js/faker";
import { paginationOptsValidator } from "convex/server";
import { ConvexError, v } from "convex/values";
import Fuse from "fuse.js";
import type { Doc, Id } from "./_generated/dataModel";
import {
  internalMutation,
  mutation,
  type QueryCtx,
  query,
} from "./_generated/server";
import { getCurrentUserData } from "./users";

/**
 * Queries
 */

export const getWishById = query({
  args: {
    wishId: v.id("wishes"),
  },
  handler: async (ctx, args) => {
    await getCurrentUserData(ctx);
    const wish = await ctx.db.get(args.wishId);
    if (!wish) {
      throw new ConvexError("Wish not found");
    }
    return await getWishWithFullDetails(ctx, wish);
  },
});

export const getWishByIdWithCategory = query({
  args: {
    wishId: v.id("wishes"),
  },
  handler: async (ctx, args) => {
    await getCurrentUserData(ctx);
    const wish = await ctx.db.get(args.wishId);
    if (!wish) {
      throw new ConvexError("Wish not found");
    }
    return await getWishWithCategoryDetails(ctx, wish);
  },
});

export const getHomePageWishes = query({
  args: {
    paginationOpts: paginationOptsValidator,
    searchQuery: v.optional(v.string()),
    categoryId: v.optional(v.id("categories")),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new ConvexError("Unauthorized");
    }

    const wishResults = await ctx.db
      .query("wishes")
      .withIndex("home", (q) => q.eq("status", undefined))
      .order("desc")
      .filter((q) =>
        q.eq(q.field("category"), args.categoryId || q.field("category"))
      )
      .filter((q) => q.neq(q.field("owner"), userId))
      .paginate(args.paginationOpts);

    if (!args.searchQuery) {
      return {
        ...wishResults,
        page: await Promise.all(
          wishResults.page.map(async (wish) => {
            return await getWishWithFullDetails(ctx, wish);
          })
        ),
      };
    }

    const fuse = new Fuse(wishResults.page, {
      keys: ["name", "description"],
    });

    const searchResults = fuse.search(args.searchQuery || "");

    return {
      ...wishResults,
      page: await Promise.all(
        searchResults
          .map((res) => res.item)
          .filter(
            (wish) =>
              !args.categoryId || wish.category.toString() === args.categoryId
          )
          .map(async (wish) => {
            return await getWishWithFullDetails(ctx, wish);
          })
      ),
    };
  },
});

export const getWishesWithoutStatus = query({
  args: {},
  handler: async (ctx, _args) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const wishes = await getUserWishesByStatus(ctx);

    console.log("WISHES NO STATUS", wishes);

    return wishes.map((wish) => ({
      ...wish,
      grantor: undefined,
    }));
  },
});

export const getPendingWishes = query({
  args: {},
  handler: async (ctx, _args) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new Error("Unauthorized");
    }

    return await getUserWishesByStatus(ctx, "pending");
  },
});

export const getGrantedWishes = query({
  args: {},
  handler: async (ctx, _args) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const grantedWishes = await getUserWishesByStatus(ctx, "completed");

    return await Promise.all(
      grantedWishes.map(async (wish) => {
        if (!wish.grantor) {
          return {
            ...wish,
            grantor: null,
          };
        }

        const grantor = await ctx.db.get(wish.grantor);

        if (!grantor) {
          return {
            ...wish,
            grantor: null,
          };
        }

        return {
          ...wish,
          grantor: {
            id: grantor._id,
            name: grantor.name,
          },
        };
      })
    );
  },
});

export const getReservedWishes = query({
  args: {},
  async handler(ctx, _args) {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const wishes = await ctx.db
      .query("wishes")
      .withIndex("by_grantor_status", (q) =>
        q.eq("grantor", userId).eq("status", "pending")
      )
      .collect();

    return await Promise.all(
      wishes.map(async (wish) => getWishWithFullDetails(ctx, wish))
    );
  },
});

/**
 * Mutations
 */
export const createWish = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    imageId: v.optional(v.id("_storage")),
    category: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUserData(ctx);

    let receivedStorageUrl: string | null = null;
    if (args.imageId) {
      receivedStorageUrl = await getImageURL(ctx, args.imageId);
      if (!receivedStorageUrl) {
        throw new Error("Failed to get image URL");
      }
    }

    const category = await ctx.db
      .query("categories")
      .withIndex("by_name", (q) => q.eq("name", args.category))
      .first();

    if (!category) {
      throw new Error("Category not found");
    }

    const wish = await ctx.db.insert("wishes", {
      name: args.name,
      description: args.description,
      category: category._id,
      imageUrl: receivedStorageUrl ?? "",
      imageId: args.imageId,
      owner: user._id,
      updatedAt: Date.now(),
    });
    return wish;
  },
});

export const generateUploadURL = mutation({
  args: {},
  handler: async (ctx, _args) => {
    await getCurrentUserData(ctx);
    const url = await ctx.storage.generateUploadUrl();
    return url;
  },
});

export const cancelReservedWish = mutation({
  args: {
    wishId: v.id("wishes"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const wish = await ctx.db.get(args.wishId);

    if (!wish) {
      throw new Error("Wish not found");
    }
    if (wish.grantor?.toString() !== userId) {
      throw new Error("You are not the grantor of this wish");
    }

    // check if wish is already completed
    if (wish.status === "completed") {
      throw new Error("Cannot cancel a completed wish");
    }

    // check if there is a chat associated with this wish that is completed
    const chat = await ctx.db
      .query("chats")
      .withIndex("by_wish", (q) => q.eq("wish", args.wishId))
      .first();

    if (chat) {
      // remove messages
      const messages = await ctx.db
        .query("messages")
        .withIndex("by_chat_createdAt", (q) => q.eq("chat", chat._id))
        .collect();

      for (const message of messages) {
        await ctx.db.delete(message._id);
      }

      // remove chat
      await ctx.db.delete(chat._id);
    }

    const updatedWish = await ctx.db.patch(args.wishId, {
      grantor: undefined,
      status: undefined,
      updatedAt: Date.now(),
    });

    return updatedWish;
  },
});

export const reserveWish = mutation({
  args: {
    wishId: v.id("wishes"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new ConvexError("Unauthorized");
    }

    const wish = await ctx.db.get(args.wishId);

    if (!wish) {
      throw new ConvexError("Wish not found");
    }
    if (wish.owner.toString() === userId) {
      throw new ConvexError("You cannot reserve your own wish");
    }
    if (wish.grantor) {
      throw new ConvexError(`Wish for ${wish.name} is already reserved`);
    }
    const updatedWish = await ctx.db.patch(args.wishId, {
      grantor: userId,
      status: "pending",
      updatedAt: Date.now(),
    });
    return updatedWish;
  },
});

export const editWish = mutation({
  args: {
    wish: v.object({
      _id: v.id("wishes"),
      name: v.string(),
      description: v.string(),
      imageId: v.optional(v.id("_storage")),
      removeImage: v.boolean(),
      category: v.string(),
    }),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUserData(ctx);

    const originalWish = await ctx.db.get(args.wish._id);
    if (!originalWish) {
      throw new Error("Wish not found");
    }

    // Check if the user is the owner of the wish
    if (originalWish.owner.toString() !== user._id.toString()) {
      throw new Error("You are not the owner of this wish");
    }

    let receivedStorageUrl: string | null = null;
    if (args.wish.removeImage) {
      if (originalWish.imageId) {
        await ctx.storage.delete(originalWish.imageId);
      }
      receivedStorageUrl = null;
    } else if (args.wish.imageId) {
      receivedStorageUrl = await getImageURL(ctx, args.wish.imageId);
      if (!receivedStorageUrl) {
        throw new ConvexError("Failed to get image URL");
      }

      if (originalWish.imageId && originalWish.imageId !== args.wish.imageId) {
        await ctx.storage.delete(originalWish.imageId);
      }
    }
    // Get category ID
    const category = await ctx.db
      .query("categories")
      .withIndex("by_name", (q) => q.eq("name", args.wish.category))
      .first();

    if (!category) {
      throw new Error("Category not found");
    }

    // Update the wish with the new values
    const updatedWish = await ctx.db.patch(args.wish._id, {
      name: args.wish.name,
      description: args.wish.description,
      imageUrl: receivedStorageUrl ?? "",
      category: category._id,
      imageId: args.wish.imageId,
    });

    return updatedWish;
  },
});

export const deleteWish = mutation({
  args: {
    wishId: v.id("wishes"),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUserData(ctx);

    const wish = await ctx.db.get(args.wishId);
    if (!wish) {
      throw new Error("Wish not found");
    }

    // Check if the user is the owner of the wish
    if (wish.owner.toString() !== user._id) {
      throw new Error("You are not the owner of this wish");
    }

    // Delete associated image from storage if exists
    if (wish.imageId) {
      await ctx.storage.delete(wish.imageId);
    }

    // Delete the wish from the database
    await ctx.db.delete(args.wishId);

    return;
  },
});

/**
 * Utils
 */
const getImageURL = async (ctx: QueryCtx, imageId: Id<"_storage">) => {
  await getCurrentUserData(ctx);
  const url = await ctx.storage.getUrl(imageId);
  return url;
};

const getUserWishes = async (ctx: QueryCtx) => {
  const userId = await getAuthUserId(ctx);

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const userWishes = ctx.db
    .query("wishes")
    .withIndex("by_owner", (q) => q.eq("owner", userId))
    .collect();

  return userWishes;
};

const getUserWishesByStatus = async (
  ctx: QueryCtx,
  status?: Doc<"wishes">["status"]
) => {
  const userWishes = await getUserWishes(ctx);

  const filteredWishes = userWishes.filter((w) => w.status === status);

  return await Promise.all(
    filteredWishes.map(async (wish) => getWishWithCategoryDetails(ctx, wish))
  );
};

const getWishWithFullDetails = async (ctx: QueryCtx, wish: Doc<"wishes">) => {
  const owner = await ctx.db.get(wish.owner);
  const category = await ctx.db.get(wish.category);
  const grantor = wish.grantor ? await ctx.db.get(wish.grantor) : null;

  const finalWish = {
    ...wish,
    owner: {
      name: owner!.name,
      _id: owner!._id,
    },
    category: {
      name: category!.name || "Unknown Category",
      _id: category!._id,
    },
    grantor: grantor
      ? {
          name: grantor.name,
          _id: grantor._id,
        }
      : wish.grantor,
  };
  return finalWish;
};
const getWishWithCategoryDetails = async (
  ctx: QueryCtx,
  wish: Doc<"wishes">
) => {
  const category = await ctx.db.get(wish.category);

  const finalWish = {
    ...wish,
    category: {
      name: category!.name || "Unknown Category",
      _id: category!._id,
    },
  };
  return finalWish;
};

/**
 * Seeding
 */

export const seedWishes = internalMutation({
  args: {
    amount: v.number(),
  },
  handler: async (ctx, args) => {
    for (let i = 0; i < args.amount; i++) {
      ctx.db.insert("wishes", {
        name: faker.commerce.product(),
        category: "k9722ksm8g7p4997gq4g5yy47h7r9ast" as Id<"categories">,
        imageUrl: faker.image.urlPicsumPhotos(),
        owner: "j57fn8303afyyzgydhw9v8vpnd7r4cs3" as Id<"users">,
        updatedAt: Date.now(),
        description: faker.lorem.sentences(3),
      });
    }
  },
});
