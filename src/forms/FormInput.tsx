import React, { HTMLInputTypeAttribute, useId } from "react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { useFieldContext } from "./CreateWishForm";

interface FormInputProps {
  label: string;
  type?: HTMLInputTypeAttribute;
}

export default function FormInput({ label, type = "text" }: FormInputProps) {
  const field = useFieldContext<number | string>();
  const id = useId();

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="space-y-1">
        <Input
          id={id}
          value={field.state.value}
          onChange={(e) => {
            if (!e.target.value) {
              field.handleChange("");
              return;
            }

            if (type == "number") {
              const numValue = e.target.valueAsNumber;
              if (isNaN(numValue)) {
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
        {field.state.meta.isValid ? null : (
          <span className="text-destructive text-sm">
            {field.state.meta.errors.map((err) => err.message).join(", ")}
          </span>
        )}
      </div>
    </div>
  );
}
