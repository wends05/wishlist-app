import { toast } from "sonner";
import { editProfile } from "@/actions/editProfile";
import { EditProfileSchema, type EditProfileType } from "@/types/dto/user";
import { useAppForm } from "./FormHooks";

export const useEditProfileForm = (defaultValues: EditProfileType) => {
  const form = useAppForm({
    defaultValues,
    validators: {
      onSubmit: EditProfileSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await editProfile(value);
        toast.success("Profile updated successfully!");
      } catch (error) {
        toast.error(`Failed to update profile: ${error}`);
      }
    },
  });
  return {
    form,
  };
};
