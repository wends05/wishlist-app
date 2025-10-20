import { useQuery } from "convex/react";
import { toast } from "sonner";
import { createWish } from "@/actions/wish";
import { type CreateWishForm, createWishSchema } from "@/types/dto/wish";
import { api } from "../../convex/_generated/api";
import { useAppForm } from "./FormHooks";

const defaultWish: CreateWishForm = {
  category: "",
  description: "",
  name: "",
};

export const useCreateWishForm = () => {
  const categories = useQuery(api.categories.getAllCategories);

  const user = useQuery(api.users.getCurrentUserData);

  return useAppForm({
    defaultValues: defaultWish,
    validators: {
      onSubmit: createWishSchema,
    },
    onSubmit: async ({ value, formApi }) => {
      try {
        if (!user) {
          throw new Error("Unauthorized");
        }

        if (!categories) {
          throw new Error("Categories not found");
        }

        await createWish(value);
        toast.success("Wish created successfully");
        formApi.reset();
      } catch (err) {
        toast.error(
          err instanceof Error ? err.message : "Something went wrong",
        );
      }
    },
  });
};
