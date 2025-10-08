import { useId } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useFieldContext } from "@/hooks/FormHooks";
import { Field, FieldError, FieldLabel } from "../field";

interface FormTextBoxProps {
  label: string;
  placeholder?: string;
}

export default function FormTextArea({ label, placeholder }: FormTextBoxProps) {
  const field = useFieldContext<string>();
  const id = useId();

  return (
    <Field className="space-y-2">
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <div className="space-y-1">
        <Textarea
          id={id}
          value={field.state.value}
          onChange={(e) => {
            field.handleChange(e.target.value);
          }}
          placeholder={placeholder}
        />
        <FieldError errors={field.state.meta.errors} />
      </div>
    </Field>
  );
}
