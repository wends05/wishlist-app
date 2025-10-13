import { useEditProfileForm } from "@/hooks/useEditProfileForm";
import type { EditProfileType } from "@/types/dto/user";

interface EditProfileFormProps {
  defaultValues: EditProfileType;
}
export default function EditProfileForm({
  defaultValues,
}: EditProfileFormProps) {
  const { form: f } = useEditProfileForm(defaultValues);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    f.handleSubmit();
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex h-full w-full flex-col items-center justify-center gap-4"
    >
      <div className="w-full max-w-md justify-center space-y-4">
        <f.AppField name="name">
          {(form) => <form.FormInput label="Name" />}
        </f.AppField>
        <f.AppField name="address">
          {(form) => <form.FormInput label="Address" />}
        </f.AppField>
        <f.AppForm>
          <f.FormSubmit label="Edit Profile Details" isSubmittingLabel="Editing Profile..." />
        </f.AppForm>
      </div>
    </form>
  );
}
