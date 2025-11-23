import type { FormEvent } from "react";
import { useLoginForm } from "@/hooks/useLoginForm";

export default function LoginForm() {
  const { form: f } = useLoginForm();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    f.handleSubmit({ eventTarget: e.currentTarget });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <input hidden name="flow" value="signIn" readOnly />
        <f.AppField name="email">
          {(field) => <field.FormInput label="Email"  />}
        </f.AppField>
        <f.AppField name="password">
          {(field) => (
            <field.FormInput label="Password" type="password" />
          )}
        </f.AppField>
        <f.AppForm>
          <f.FormSubmit label="Log In" isSubmittingLabel="Logging In" />
        </f.AppForm>
      </div>
    </form>
  );
}
