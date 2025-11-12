import { Trash } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { deleteWish } from "@/actions/wish";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Doc } from "../../../../../convex/_generated/dataModel";

interface DeleteWishDialogProps {
  wish: Pick<Doc<"wishes">, "_id" | "name">;
}
export default function DeleteWishDialog({ wish }: DeleteWishDialogProps) {
  const handleDelete = async () => {
    try {
      await deleteWish(wish._id);
      toast.success(`Wish "${wish.name}" deleted successfully.`);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      toast.error(errorMessage);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Trash />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Delete Wish</DialogTitle>
        <p className="my-4">
          Are you sure you want to delete the wish "{wish.name}"? This action
          cannot be undone.
        </p>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <Button onClick={handleDelete}>Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
