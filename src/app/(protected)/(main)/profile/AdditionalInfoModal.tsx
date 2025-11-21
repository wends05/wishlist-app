import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Doc } from "../../../../../convex/_generated/dataModel";

interface EditProfileDialogProps {
  profileDetails: Doc<"users">;
}

export default function AdditionalInfoModal({
  profileDetails,
}: EditProfileDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-max">Additional Info</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Profile Information</DialogTitle>
        <DialogDescription>
          Address: {profileDetails.address || "Not provided"}
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"secondary"}>Close</Button>
          </DialogClose>
        </DialogFooter>
        <DialogClose />
      </DialogContent>
    </Dialog>
  );
}
