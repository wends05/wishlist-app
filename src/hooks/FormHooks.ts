import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import FormInput from "@/components/ui/form/FormInput";
import FormSelect from "@/components/ui/form/FormSelect";
import FormSubmit from "@/components/ui/form/FormSubmit";
import FormTextArea from "@/components/ui/form/FormTextArea";

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm } = createFormHook({
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
