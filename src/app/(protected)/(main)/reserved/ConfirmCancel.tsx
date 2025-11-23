"use client";
import { useMutation } from "convex/react";
import { Ban } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { api } from "../../../../../convex/_generated/api";
import type { Id } from "../../../../../convex/_generated/dataModel";

interface ConfirmCancelProps {
  wishId: Id<"wishes">;
}
export default function ConfirmCancel({ wishId }: ConfirmCancelProps) {
  const cancelReservedWish = useMutation(api.wishes.cancelReservedWish);

  const handleCancel = async () => {
    try {
      await cancelReservedWish({ wishId });
      toast.success("Reservation cancelled successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to cancel reservation. Please try again.");
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"destructive"}>
          <Ban />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>Cancel Granting this wish</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to cancel your reservation for this wish? This
          action cannot be undone. This will also remove the conversation with
          the other person about this wish.
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogAction onClick={handleCancel}>Continue</AlertDialogAction>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
