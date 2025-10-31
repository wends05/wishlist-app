import { useAuthActions } from "@convex-dev/auth/react";
import { toast } from "sonner";
import {
  type AuthFormMeta,
  LoginFormSchema,
  type LoginFormType,
} from "@/types/dto/auth";
import { useAppForm } from "./FormHooks";

const defaultLoginData: LoginFormType = {
  email: "",
  password: "",
};

const defaultMeta: AuthFormMeta = {
  eventTarget: null,
};

export const useLoginForm = () => {
  const { signIn } = useAuthActions();

  const form = useAppForm({
    defaultValues: defaultLoginData,
    validators: {
      onSubmit: LoginFormSchema,
    },
    onSubmitMeta: defaultMeta,
    onSubmit: async ({ meta }) => {
      try {
        if (!meta.eventTarget) throw new Error("Form element not found");
        const formData = new FormData(meta.eventTarget);
        await signIn("password", formData);
      } catch (e) {
        console.log(e);
        toast.error("User not found or invalid password");
      }
    },
  });

  return {
    form,
  };
};
