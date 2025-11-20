import type React from "react";
import { useRegisterForm } from "@/hooks/useRegisterForm";

export default function RegisterForm() {
  const { form: f } = useRegisterForm();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    f.handleSubmit({ eventTarget: e.currentTarget });
  };
  return (
    <form
      className="mb-3 flex flex-col items-center gap-3"
      onSubmit={handleSubmit}
    >
      <input name="flow" value="signUp" type="hidden" readOnly />
      <f.AppField name="name">
        {(form) => <form.FormInput label="Name" />}
      </f.AppField>
      <f.AppField name="email">
        {(form) => <form.FormInput label="Email" />}
      </f.AppField>
      <f.AppField name="password">
        {(form) => <form.FormInput label="Password" type="password" />}
      </f.AppField>
      <f.AppField name="confirmPassword">
        {(form) => <form.FormInput label="Confirm Password" type="password" />}
      </f.AppField>
      <f.AppForm>
        <f.FormSubmit label="Sign Up" isSubmittingLabel="Signing Up" />
      </f.AppForm>
    </form>
  );
}
