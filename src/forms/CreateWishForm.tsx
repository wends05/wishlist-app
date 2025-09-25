import { CreateWishForm, createWishSchema } from "@/types/dto/wish";
import { Id } from "../../convex/_generated/dataModel";
import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormSubmit from "./FormSubmit";
import FormTextArea from "./FormTextArea";

const defaultWish: CreateWishForm = {
  category: undefined as any,
  description: "",
  name: "",
  quantity: 1,
  localImageURL: undefined,
};
export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    FormInput,
    FormSelect,
    FormTextArea,
  },
  formComponents: {
    FormSubmit,
  },
});

export const useCreateWishForm = () => {
  const categories = useQuery(api.categories.getAllCategories);

  const user = useQuery(api.users.getCurrentUserData);

  const generateUploadURL = useMutation(api.wishes.generateUploadURL);
  const createWish = useMutation(api.wishes.createWish);

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

        // handle image upload
        let imageId: Id<"_storage"> | undefined = undefined;

        if (value.localImageURL) {
          // handle image upload
          const sendURL = await generateUploadURL();

          const imageFile = await fetch(value.localImageURL).then((res) =>
            res.blob(),
          );

          const response = await fetch(sendURL, {
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
          const { storageId } = responseData;
          imageId = storageId;
        }
        // handle category finding
        const categoryId = categories.find(
          (category) => category.name === value.category,
        )?._id;

        if (!categoryId) {
          throw new Error("Category not found");
        }

        await createWish({
          name: value.name,
          description: value.description,
          quantity: Number(value.quantity),
          imageId,
          category: categoryId,
        });
        toast.success("Wish created successfully");
        formApi.reset();
      } catch (error) {
        toast.error("Failed to create wish");
      }
    },
  });
};
