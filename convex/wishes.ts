import { getAuthUserId } from "@convex-dev/auth/server";
import { faker } from "@faker-js/faker";
import { paginationOptsValidator } from "convex/server";
import { v } from "convex/values";
import Fuse from "fuse.js";
import type { Doc, Id } from "./_generated/dataModel";
import {
  internalMutation,
  mutation,
  type QueryCtx,
  query,
} from "./_generated/server";
import { checkUserIdentity, getCurrentUserDataHandler } from "./users";

/**
 * Queries
 */
export const findWishes = query({
  args: {},
  handler: async (ctx, _args) => {
    await checkUserIdentity(ctx);
    const wish = await ctx.db.query("wishes").take(5);
    return wish;
  },
});

export const getHomePageWishes = query({
  args: {
    paginationOpts: paginationOptsValidator,
    searchQuery: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await checkUserIdentity(ctx);

    const wishResults = await ctx.db
      .query("wishes")
      .withIndex("by_creation_time")
      .order("desc")
      .paginate(args.paginationOpts);

    if (!args.searchQuery) {
      return {
        ...wishResults,
        page: await Promise.all(
          wishResults.page.map(async (wish) => {
            return await getWishWithFullDetails(ctx, wish);
          }),
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
          .map(async (wish) => {
            return await getWishWithFullDetails(ctx, wish);
          }),
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
      }),
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
        q.eq("grantor", userId).eq("status", "pending"),
      )
      .collect();

    return await Promise.all(
      wishes.map(async (wish) => getWishWithFullDetails(ctx, wish)),
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

/**
 * Utils
 */
const getImageURL = async (ctx: QueryCtx, imageId: Id<"_storage">) => {
  await checkUserIdentity(ctx);
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
  status?: Doc<"wishes">["status"],
) => {
  const userWishes = await getUserWishes(ctx);

  const filteredWishes = userWishes.filter((w) => w.status === status);

  return await Promise.all(
    filteredWishes.map(async (wish) => getWishWithCategoryDetails(ctx, wish)),
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
  wish: Doc<"wishes">,
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
