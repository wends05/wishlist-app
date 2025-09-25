import React, { HTMLInputTypeAttribute } from "react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { useFieldContext } from "./CreateWishForm";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FormSelectProps {
  label: string;
  items: string[];
  placeholder: string;
}

export default function FormSelect({
  label,
  items,
  placeholder,
}: FormSelectProps) {
  const field = useFieldContext<string>();

  return (
    <div className="space-y-2">
      <Label htmlFor={label}>{label}</Label>
      <div className="space-y-1">
        <Select value={field.state.value} onValueChange={field.handleChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {items.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
          {field.state.meta.isValid ? null : (
            <span className="text-destructive text-sm">
              {field.state.meta.errors.map((err) => err.message).join(", ")}
            </span>
          )}
        </Select>
      </div>
    </div>
  );
}
