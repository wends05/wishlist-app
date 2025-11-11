import * as z from "zod";
import type { Doc, Id } from "../../../convex/_generated/dataModel";

export const CreateWishSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  description: z.string().max(1000, "Description is too long"),
  category: z.string().min(1, "Category is required"),
  localImageURL: z.optional(z.string()),
});

export type CreateWishForm = Pick<Doc<"wishes">, "name" | "description"> & {
  category: string;
  localImageURL?: string | undefined;
};

export type CreateWishAction = Omit<CreateWishForm, "localImageURL"> & {
  imageId: string | null;
};

export const EditWishSchema = CreateWishSchema.extend({
  _id: z.any(),
  removeImage: z.boolean(),
});

export type EditWishForm = CreateWishForm & {
  _id: Id<"wishes">;
  removeImage: boolean;
};

export type EditWishAction = EditWishForm & {
  _id: Id<"wishes">;
  imageId: string | null
};
