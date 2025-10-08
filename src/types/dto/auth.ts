import z from "zod";

export type AuthFormMeta = {
  eventTarget: HTMLFormElement | null;
};

export const LoginFormSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type LoginFormType = z.infer<typeof LoginFormSchema>;

export const RegisterFormSchema = LoginFormSchema.extend({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  confirmPassword: z
    .string()
    .min(6, "Password must be at least 6 characters long"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type RegisterFormType = z.infer<typeof RegisterFormSchema>;
