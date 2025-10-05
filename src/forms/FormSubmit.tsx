import { Button } from "@/components/ui/button";
import { useFormContext } from "./CreateWishForm";

export default function FormSubmit() {
  const form = useFormContext();
  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create"}
        </Button>
      )}
    </form.Subscribe>
  );
}
