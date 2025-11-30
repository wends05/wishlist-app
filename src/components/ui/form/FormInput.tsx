import { type HTMLInputTypeAttribute, useId } from "react";
import { useFieldContext } from "@/hooks/FormHooks";
import { Field, FieldError, FieldLabel } from "../field";
import { Input } from "../input";

interface FormInputProps {
  label?: string;
  type?: HTMLInputTypeAttribute;
  disabled?: boolean;
}

export default function FormInput({
  label,
  type = "text",
  disabled = false,
}: FormInputProps) {
  const field = useFieldContext<number | string>();
  const id = useId();

  return (
    <Field className="space-y-2">
      {label && <FieldLabel htmlFor={id}>{label}</FieldLabel>}
      <div className="space-y-1">
        <Input
          disabled={disabled}
          name={field.name}
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
