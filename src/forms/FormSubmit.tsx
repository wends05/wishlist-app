import React from "react";
import { useFormContext } from "./CreateWishForm";
import { Button } from "@/components/ui/button";

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
