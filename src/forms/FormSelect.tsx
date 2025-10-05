import { useId } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../components/ui/label";
import { useFieldContext } from "./CreateWishForm";

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
  const id = useId();

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="space-y-1">
        <Select value={field.state.value} onValueChange={field.handleChange}>
          <SelectTrigger id={id} className="w-full">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {items.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {field.state.meta.isValid ? null : (
          <span className="text-destructive text-sm">
            {field.state.meta.errors.map((err) => err.message).join(", ")}
          </span>
        )}
      </div>
    </div>
  );
}
