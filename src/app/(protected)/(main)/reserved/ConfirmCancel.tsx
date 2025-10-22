"use client";
import { useMutation } from "convex/react";
import { Ban } from "lucide-react";
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
  const handleCancel = useMutation(api.wishes.cancelReservedWish);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"destructive"} className="w-full">
          <Ban />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>Cancel Reservation</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to cancel your reservation for this wish? This
          action cannot be undone.
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={() =>
              handleCancel({
                wishId,
              })
            }
          >
            Continue
          </AlertDialogAction>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
