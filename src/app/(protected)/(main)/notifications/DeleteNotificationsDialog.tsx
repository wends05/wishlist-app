import { useMutation } from "convex/react";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { api } from "../../../../../convex/_generated/api";
import type { Id } from "../../../../../convex/_generated/dataModel";

interface DeleteNotificationsDialogProps {
  notificationIds: Id<"notifications">[];
  type: string;
}
export default function DeleteNotificationsDialog({
  notificationIds,
  type,
}: DeleteNotificationsDialogProps) {
  const deleteNotifications = useMutation(
    api.notifications.deleteNotifications
  );
  const handleDeleteNotifications = async () => {
    try {
      if (notificationIds.length === 0) {
        toast.error("No notifications to delete.");
        return;
      }
      await deleteNotifications({
        notificationIds,
      });
    } catch (error) {
      console.error("Error deleting notifications:", error);
      toast.error("Failed to delete notifications.");
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"destructive"} disabled={notificationIds.length === 0}>
          <Trash />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>
          Delete {type.charAt(0).toUpperCase() + type.slice(1)} Notifications
        </AlertDialogTitle>
        <div className="flex flex-col gap-4">
          <p>
            Are you sure you want to delete {type} notifications? This action
            cannot be undone.
          </p>
          <div className="flex justify-end gap-2">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteNotifications}>
              Delete
            </AlertDialogAction>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
