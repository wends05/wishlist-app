import { useAuthActions } from "@convex-dev/auth/react";
import { ConvexError } from "convex/values";
import { toast } from "sonner";
import {
  type AuthFormMeta,
  RegisterFormSchema,
  type RegisterFormType,
} from "@/types/dto/auth";
import { useAppForm } from "./FormHooks";

const defaultLoginData: RegisterFormType = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const defaultMeta: AuthFormMeta = {
  eventTarget: null,
};

export const useRegisterForm = () => {
  const { signIn } = useAuthActions();
  const form = useAppForm({
    defaultValues: defaultLoginData,
    validators: {
      onSubmit: RegisterFormSchema,
    },
    onSubmitMeta: defaultMeta,
    onSubmit: async ({ meta }) => {
      try {
        if (!meta.eventTarget) throw new Error("Form element not found");
        const formData = new FormData(meta.eventTarget);
        void (await signIn("password", formData));
      } catch (e) {
        if (e instanceof Error) {
          if (e.message.includes("already exists")) {
            return toast.error("User with that email already exists");
          }
          return toast.error(e.message);
        }
        if (e instanceof ConvexError) {
          return toast.error(e.message);
        }
        toast.error("Failed to sign up");
      }
    },
  });
  return {
    form,
  };
};
