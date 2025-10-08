import { type HTMLInputTypeAttribute, useId } from "react";
import { useFieldContext } from "@/hooks/FormHooks";
import { Field, FieldError, FieldLabel } from "../field";
import { Input } from "../input";

interface FormInputProps {
  name?: string;
  label: string;
  type?: HTMLInputTypeAttribute;
}

export default function FormInput({
  label,
  type = "text",
  name,
}: FormInputProps) {
  const field = useFieldContext<number | string>();
  const id = useId();

  return (
    <Field className="space-y-2">
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <div className="space-y-1">
        <Input
          name={name ?? label.toLowerCase()}
          id={id}
          value={field.state.value}
          onChange={(e) => {
            if (!e.target.value) {
              field.handleChange("");
              return;
            }

            if (type === "number") {
              const numValue = e.target.valueAsNumber;
              if (Number.isNaN(numValue)) {
                field.handleChange("");
                return;
              }
              field.handleChange(numValue);
            } else {
              field.handleChange(e.target.value);
            }
          }}
          type={type}
        />
        <FieldError errors={field.state.meta.errors} />
      </div>
    </Field>
  );
}
