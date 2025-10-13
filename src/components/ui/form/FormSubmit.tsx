import { Button } from "@/components/ui/button";
import { useFormContext } from "@/hooks/FormHooks";

interface FormSubmitProps {
  label?: string;
  isSubmittingLabel?: string;
  className?: string;
}

export default function FormSubmit({
  label,
  isSubmittingLabel,
  className,
}: FormSubmitProps) {
  const form = useFormContext();
  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button disabled={isSubmitting} type="submit" className={className}>
          {isSubmitting
            ? (isSubmittingLabel ?? "Submitting...")
            : (label ?? "Submit")}
        </Button>
      )}
    </form.Subscribe>
  );
}
