import Link from "next/link";
import type { Doc } from "../../../convex/_generated/dataModel";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

interface EditProfileModalProps {
  profileDetails: Doc<"users">;
}

export default function EditProfileModal({
  profileDetails,
}: EditProfileModalProps) {
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
          <Link href={"/profile/edit"}>
            <Button>Edit</Button>
          </Link>
        </DialogFooter>
        <DialogClose />
      </DialogContent>
    </Dialog>
  );
}
