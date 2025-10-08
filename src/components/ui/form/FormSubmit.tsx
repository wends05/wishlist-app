import { Button } from "@/components/ui/button";
import { useFormContext } from "@/hooks/FormHooks";

interface FormSubmitProps {
  label?: string;
  isSubmittingLabel?: string;
}

export default function FormSubmit({
  label,
  isSubmittingLabel,
}: FormSubmitProps) {
  const form = useFormContext();
  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button disabled={isSubmitting}>
          {isSubmitting
            ? (isSubmittingLabel ?? "Submitting...")
            : (label ?? "Submit")}
        </Button>
      )}
    </form.Subscribe>
  );
}
