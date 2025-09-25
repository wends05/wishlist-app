import React from "react";
import { useFieldContext } from "./CreateWishForm";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface FormTextBoxProps {
  label: string;
  placeholder?: string;
}

export default function FormTextArea({ label, placeholder }: FormTextBoxProps) {
  const value = useFieldContext<string>();
  return (
    <div className="space-y-2">
      <Label htmlFor={label}>{label}</Label>
      <div className="space-y-1">
        <Textarea
          id={label}
          value={value.state.value}
          onChange={(e) => {
            value.handleChange(e.target.value);
          }}
          placeholder={placeholder}
        />
        {value.state.meta.isValid ? null : (
          <span className="text-destructive text-sm">
            {value.state.meta.errors.map((err) => err.message).join(", ")}
          </span>
        )}
      </div>
    </div>
  );
}
