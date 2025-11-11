import { useId } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFieldContext } from "@/hooks/FormHooks";
import { Field, FieldError, FieldLabel } from "../field";

type FormSelectItem = {
  id:string;
  name: string;
};
interface FormSelectProps {
  label: string;
  items: FormSelectItem[];
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
    <Field className="space-y-2">
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <div className="space-y-1">
        <Select value={field.state.value} onValueChange={field.handleChange}>
          <SelectTrigger id={id} className="w-full">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {items.map((item) => (
              <SelectItem key={item.id} value={item.name}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FieldError errors={field.state.meta.errors} />
      </div>
    </Field>
  );
}
