import { useMutation, useQuery } from "convex/react";
import { toast } from "sonner";
import { createWish } from "@/actions/wish";
import { type CreateWishForm, createWishSchema } from "@/types/dto/wish";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import { useAppForm } from "./FormHooks";

const defaultWish: CreateWishForm = {
  category: "",
  description: "",
  name: "",
};

export const useCreateWishForm = () => {
  const categories = useQuery(api.categories.getAllCategories);

  const user = useQuery(api.users.getCurrentUserData);
  const generateUploadURL = useMutation(api.wishes.generateUploadURL);

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

        let imageId: Id<"_storage"> | undefined;

        if (value.localImageURL) {
          const generatedUploadURL = await generateUploadURL();

          const imageFile = await fetch(value.localImageURL).then((res) =>
            res.blob()
          );

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

        await createWish({
          ...value,
          imageId: imageId || null,
        });
        toast.success("Wish created successfully");
        formApi.reset();
      } catch (err) {
        toast.error(
          err instanceof Error ? err.message : "Something went wrong"
        );
      }
    },
  });
};
