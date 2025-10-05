import * as z from "zod";
import type { Doc } from "../../../convex/_generated/dataModel";

export const createWishSchema = z
  .object({
    name: z.string().min(1, "Name is required").max(100, "Name is too long"),
    description: z.string().max(1000, "Description is too long"),
    quantity: z.number(),
    category: z.string().min(1, "Category is required"),
    localImageURL: z.string().optional(),
  })
  .refine((d) => {
    return d.quantity > 0;
  }, "Quantity must be a positive number");

export type CreateWishForm = Pick<
  Doc<"wishes">,
  "name" | "description"
> & {
  category: string;
  localImageURL?: string;
};
