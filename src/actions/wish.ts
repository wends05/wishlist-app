"use server";

import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { fetchMutation, fetchQuery } from "convex/nextjs";
import type { CreateWishAction } from "@/types/dto/wish";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";

export const createWish = async (data: CreateWishAction) => {
  const userData = await fetchQuery(
    api.users.getCurrentUserData,
    {},
    {
      token: await convexAuthNextjsToken(),
    }
  );
  if (!userData) {
    throw new Error("Unauthorized");
  }
  const categories = await fetchQuery(
    api.categories.getAllCategories,
    {},
    {
      token: await convexAuthNextjsToken(),
    }
  );

  if (!categories) {
    throw new Error("Categories not found");
  }

  const categoryId = categories.find((cat) => cat.name === data.category)?._id;

  if (!categoryId) {
    throw new Error("Category not found");
  }
  await fetchMutation(
    api.wishes.createWish,
    {
      name: data.name,
      description: data.description,
      imageId: data.imageId as Id<"_storage">,
      category: categoryId,
    },
    {
      token: await convexAuthNextjsToken(),
    }
  );
};
