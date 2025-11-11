import { useMutation } from "convex/react";
import { ConvexError } from "convex/values";
import { useQuery } from "convex-helpers/react/cache/hooks";
import { toast } from "sonner";
import { editWish } from "@/actions/wish";
import { type EditWishForm, EditWishSchema } from "@/types/dto/wish";
import { api } from "../../convex/_generated/api";
import { useAppForm } from "./FormHooks";

export const useEditWishForm = (defaultWishValues: EditWishForm) => {
  const user = useQuery(api.users.getCurrentUserDataHandler);
  const categories = useQuery(api.categories.getAllCategories);

  const generateUploadURL = useMutation(api.wishes.generateUploadURL);

  const defaultValues: EditWishForm = {
    _id: defaultWishValues._id,
    name: defaultWishValues.name,
    description: defaultWishValues.description,
    category: defaultWishValues.category,
    localImageURL: defaultWishValues.localImageURL,
    removeImage: false,
  };

  const f = useAppForm({
    defaultValues,
    validators: {
      onSubmit: EditWishSchema,
    },

    onSubmit: async ({ value }) => {
      if (!user) {
        throw new Error("Unauthorized");
      }

      if (!categories) {
        throw new Error("Categories not found");
      }

      const imageChanged = value.localImageURL !== defaultValues.localImageURL;

      console.log("Image changed:", imageChanged);
      console.log("Old Image URL:", defaultValues.localImageURL);
      console.log("New Image URL:", value.localImageURL);

      let imageId: string | null = null;

      // Handle image changes
      if (imageChanged) {
        if (value.removeImage) {
          // Case 1: Remove image
          imageId = null;
        } else if (value.localImageURL) {
          // Case 2: Upload new image
          const uploadURL = await generateUploadURL();
          const imageFile = await fetch(value.localImageURL).then((res) =>
            res.blob()
          );

          const response = await fetch(uploadURL, {
            method: "POST",
            headers: { "Content-Type": imageFile.type },
            body: imageFile,
          });

          if (!response.ok) {
            throw new Error("Failed to upload image");
          }

          const { storageId } = await response.json();

          if (!storageId) {
            throw new Error("Invalid upload response");
          }

          imageId = storageId;
        }
      }

      try {
        if (imageChanged) {
          await editWish({
            _id: defaultWishValues._id,
            name: value.name,
            description: value.description,
            category: value.category,
            removeImage: value.removeImage,
            imageId,
          });
        } else {
          // If image didn't change, update other fields only
          await editWish({
            _id: defaultWishValues._id,
            name: value.name,
            description: value.description,
            category: value.category,
            removeImage: value.removeImage,
            imageId: null, // Keep existing image
          });
        }
        toast.success("Wish edited successfully!");
      } catch (error) {
        if (error instanceof ConvexError) {
          const { data } = error;
          toast.error(`Failed to edit wish: ${data}`);
        }
      }

      // Only pass imageId if image changed
    },
  });

  return f;
};
