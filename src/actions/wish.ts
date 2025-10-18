"use server";

import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { fetchMutation, fetchQuery } from "convex/nextjs";
import type { CreateWishForm } from "@/types/dto/wish";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";

export const createWish = async (data: CreateWishForm) => {
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

  let imageId: Id<"_storage"> | undefined;

  if (data.localImageURL) {
    const generatedUploadURL = await fetchMutation(
      api.wishes.generateUploadURL,
      {},
      {
        token: await convexAuthNextjsToken(),
      }
    );

    const imageFile = await fetch(data.localImageURL).then((res) => res.blob());
    const response = await fetch(generatedUploadURL, {
      method: "POST",
      headers: { "Content-Type": imageFile.type },
      body: imageFile,
    });

    if (!response.ok) {
      throw new Error("Failed to send image");
    }
    const responseData = await response.json();
    if (!responseData.storageId) {
      throw new Error("Invalid upload response");
    }
    imageId = responseData.storageId;
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
      imageId,
      category: categoryId,
    },
    {
      token: await convexAuthNextjsToken(),
    }
  );
};
