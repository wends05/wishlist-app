"use server";

import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { fetchMutation } from "convex/nextjs";
import type { CreateWishAction, EditWishAction } from "@/types/dto/wish";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";

export const createWish = async (data: CreateWishAction) => {
  await fetchMutation(
    api.wishes.createWish,
    {
      name: data.name,
      description: data.description,
      imageId: (data.imageId as Id<"_storage">) ?? undefined,
      category: data.category,
    },
    {
      token: await convexAuthNextjsToken(),
    }
  );
};

export const editWish = async (data: EditWishAction) => {
  await fetchMutation(
    api.wishes.editWish,
    {
      wish: {
        _id: data._id,
        name: data.name,
        description: data.description,
        imageId: (data.imageId as Id<"_storage">) ?? undefined,
        category: data.category,
        removeImage: data.removeImage,
      },
    },
    {
      token: await convexAuthNextjsToken(),
    }
  );
};

export const deleteWish = async (wishId: Id<"wishes">) => {
  await fetchMutation(
    api.wishes.deleteWish,
    {
      wishId,
    },
    {
      token: await convexAuthNextjsToken(),
    }
  );
};
