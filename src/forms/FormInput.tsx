import React, { HTMLInputTypeAttribute } from "react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { useFieldContext } from "./CreateWishForm";

interface FormInputProps {
  label: string;
  type?: HTMLInputTypeAttribute;
}

export default function FormInput({ label, type = "text" }: FormInputProps) {
  const field = useFieldContext<number | string>();

  return (
    <div className="space-y-2">
      <Label htmlFor={label}>{label}</Label>
      <div className="space-y-1">
        <Input
          id={label}
          value={field.state.value}
          onChange={(e) => {
            if (!e.target.value) {
              field.handleChange("");
            }

            if (type == "number") {
              if (e.target.valueAsNumber.toString().includes("e")) {
                field.handleChange(
                  e.target.valueAsNumber.toString().split("e")[0],
                );
              } else {
                field.handleChange(e.target.valueAsNumber);
              }
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
